import React from "react";
import Chart from "chart.js";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CustomTooltip } from "./CustomTooltip";
import NextImage from "next/image";

const getTintedCanvas = (img, color) => {
  const buffer = document.createElement("canvas");
  buffer.width = img.width || 30;
  buffer.height = img.height || 30;
  const bctx = buffer.getContext("2d");

  // Draw the original SVG icon
  bctx.drawImage(img, 0, 0, buffer.width, buffer.height);

  // Use 'source-in' to only keep the color where the icon pixels exist
  bctx.globalCompositeOperation = "source-in";
  bctx.fillStyle = color;
  bctx.fillRect(0, 0, buffer.width, buffer.height);

  return buffer;
};

const DAYS = 11;

const ICON_PATHS = {
  "-2": "/assets/images/icon-very-sad-white.svg",
  "-1": "/assets/images/icon-sad-white.svg",
  "0": "/assets/images/icon-neutral-white.svg",
  "1": "/assets/images/icon-happy-white.svg",
  "2": "/assets/images/icon-very-happy-white.svg",
};

const sleepPath = "/assets/images/icon-sleep.svg";

export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
  });

export default function CardBarChart() {
  const [tooltip, setTooltip] = React.useState<{
    visible: boolean;
    x: number;
    y: number;
    data?: any;
    alignRight?: boolean;
  } | null>(null);

  const recentMoods = useQuery(api.moods.getRecentMoods.getRecentMoods);

  const chartRef = React.useRef<Chart | null>(null);

  React.useEffect(() => {
    if (!recentMoods) return;

    // 1. Load all images first
    const loadAllIcons = async () => {
      try {
        const loadedIcons: Record<string, HTMLImageElement> = {};
        await Promise.all(
          Object.entries(ICON_PATHS).map(async ([key, path]) => {
            loadedIcons[key] = await loadImage(path);
          })
        );

        // 2. Once images are ready, initialize chart
        initChart(loadedIcons);
      } catch (error) {
        console.error("Error loading icons:", error);
      }
    };

    const initChart = (moodIcons: Record<string, HTMLImageElement>) => {
      const days = Array.from({ length: DAYS }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (DAYS - 1 - i));
        d.setHours(0, 0, 0, 0);
        return d;
      });

      const moodByDay = new Map<string, (typeof recentMoods)[0]>();

      recentMoods.forEach((mood) => {
        const d = new Date(mood.createdAt);
        d.setHours(0, 0, 0, 0);
        moodByDay.set(d.toISOString(), mood);
      });

      const labels = days.map((d) =>
        d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );

      const sleepHoursForOrder = (order?: number) => {
        switch (order) {
          case 1:
            return 10; // 9h +
          case 2:
            return 8; // 7-8
          case 3:
            return 6; // 5-6
          case 4:
            return 4; //3-4
          case 5:
            return 2; // 0-2
          default:
            return null;
        }
      };

      const sleepHeights = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        if (!mood) return null;
        return sleepHoursForOrder(mood.sleep?.order);
      });

      const moodValues = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        return mood?.mood?.order ?? null;
      });

      const reflection = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        return mood?.note ?? "";
      });

      const tags = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        return mood?.feelings ?? [];
      });

      const colorForMoodOption = (mood: number) => {
        switch (mood) {
          case -2:
            return "#FF9B99";
          case -1:
            return "#B8B1FF";
          case 0:
            return "#89CAFF";
          case 1:
            return "#89E780";
          case 2:
            return "#FFC97C";
          default:
            return "transparent";
        }
      };

      const backgroundColors = moodValues.map(colorForMoodOption);

      const sleepImg = moodIcons["sleep"];
      const neutral600 = "#525252"; // Hex for neutral-600
      const tintedSleepIcon = sleepImg
        ? getTintedCanvas(sleepImg, neutral600)
        : null;

      const config = {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              data: sleepHeights,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,

              fill: false,
              barThickness: 40,
              categoryPercentage: 0.6, // ADD GAP BETWEEN CATEGORIES
              barPercentage: 0.7,
              base: -2,
            },
          ],
        },
        options: {
          indexAxis: "y",
          maintainAspectRatio: false,
          responsive: false, // REQUIRED so custom width works
          // responsive: true,
          layout: {
            padding: { top: 20, bottom: 90, left: 55 },
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                  autoSkip: false, // 👈 REQUIRED

                  callback: function (value) {
                    const [month, day] = value.split(" ");
                    return [month, day];
                  },
                  fontColor: "#333",

                  padding: 10,
                  fontFamily: "'Reddit Sans', sans-serif",
                },
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  min: 0,
                  max: 10, // needed to align the labels
                  stepSize: 2, // generates values: 0,2,4,6,8,10
                  fontFamily: "'Reddit Sans', sans-serif",
                  fontSize: 12,
                  padding: 50,
                  mirror: true,
                  // labelOffset: -120,
                  textAlign: "left",

                  callback: function (value) {
                    const map = {
                      2: " 0–2 hours",
                      4: " 3–4 hours",
                      6: " 5–6 hours",
                      8: " 7–8 hours",
                      10: " 9+ hours",
                    };
                    return map[value] || "";
                  },
                  fontColor: "#525252",
                },
                gridLines: {
                  display: false,
                  borderDash: [1],
                  drawBorder: false,
                  borderDashOffset: [2],
                  color: "rgba(76, 84, 92, 0.2)",
                },
              },
            ],
          },
          tooltips: {
            enabled: false, //  Turn off the default canvas tooltip
            custom: function (tooltipModel) {
              // Use 'this' to get the chart instance
              const chartInstance = this._chart;
              // If the tooltip is hidden, update state and exit
              if (tooltipModel.opacity === 0) {
                setTooltip(null);
                return;
              }

              // 1. Get the scrollable container (the div wrapping the canvas)
              const container =
                chartInstance.canvas.closest(".overflow-x-auto");
              if (!container) return;

              // 2. Calculate the visible window
              const scrollLeft = container.scrollLeft;
              const viewportWidth = container.offsetWidth;
              const visibleRightEdge = scrollLeft + viewportWidth;

              // 3. Get the mouse position on the total canvas
              const mouseX = tooltipModel.caretX;

              // 4. Flip if the mouse is within 150px of the visible right edge
              // OR if it's generally past the middle of the visible area
              const alignRight = mouseX > visibleRightEdge - 180;

              const index = tooltipModel.dataPoints[0].index;

              setTooltip({
                visible: true,
                x: mouseX,
                y: tooltipModel.caretY,
                data: {
                  mood: moodValues[index],
                  sleep: sleepHeights[index],
                  reflection: reflection[index],
                  tags: tags[index],
                },
                alignRight, // Store this boolean
              });
            },
          },
        },
        plugins: {
          afterDatasetsDraw: function (chart) {
            const ctx = chart.ctx;
            const xAxis = chart.scales["x-axis-0"];
            const yAxis = chart.scales["y-axis-0"];

            // --- 1. Draw Mood Icons on Bars
            // chart.data.datasets.forEach((dataset, datasetIndex) => {
            // const meta = chart.getDatasetMeta(datasetIndex);
            const meta = chart.getDatasetMeta(0);

            meta.data.forEach((bar, index) => {
              const mood = moodValues[index];
              const img = moodIcons[mood?.toString()];
              if (img) {
                const x = bar._model.x;
                const y = bar._model.y;
                const size = 30;
                ctx.drawImage(img, x - size / 2, y + 5, size, size);
              }
            });

            // --- 2. Draw Sleep Icons on Y-Axis

            // const yScale = chart.scales["y-axis-0"];
            // if (tintedSleepIcon) {
            //   yScale.ticks.forEach((label, index) => {
            //     if (!label) return;
            //     const yPos = yScale.getPixelForTick(index);

            //     // Draw the TINTED canvas instead of the original image
            //     ctx.drawImage(
            //       tintedSleepIcon,
            //       yScale.left - 53,
            //       yPos - 6,
            //       12,
            //       12
            //     );
            //   });
            // }

            // --- DRAW X-AXIS (Bold Days) ---
            chart.data.labels.forEach((label, index) => {
              const [month, day] = label.split(" ");
              const meta = chart.getDatasetMeta(0);
              const xPos = meta.data[index]._model.x; // Get horizontal center of the bar
              const yPos = yAxis.bottom + 15; // Position just below the bottom of the chart

              ctx.textAlign = "center";
              ctx.textBaseline = "top";

              // 1. Draw the Month (Regular)
              ctx.font = "400 12px 'Reddit Sans', sans-serif";
              ctx.fillStyle = "#666";
              ctx.fillText(month, xPos, yPos);

              // 2. Draw the Day (Bold)
              ctx.font = "700 13px 'Reddit Sans', sans-serif"; // 700 is Bold
              ctx.fillStyle = "#333";
              ctx.fillText(day, xPos, yPos + 16); // Shift down slightly (16px) for the second line
            });

            // });
          },
        },
      };

      // ⭐ Full rounded bars for Chart.js v2
      Chart.elements.Rectangle.prototype.draw = function () {
        const ctx = this._chart.ctx;
        const vm = this._view;
        const x = vm.x;
        const y = vm.y;
        const width = vm.width;
        const height = vm.base - vm.y;

        const radius = 22; // 👈 adjust roundness

        let left = x - width / 2;
        let right = x + width / 2;
        let top = y;
        let bottom = vm.base;

        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;

        // Rounded rectangle
        ctx.moveTo(left + radius, top);
        ctx.lineTo(right - radius, top);
        ctx.quadraticCurveTo(right, top, right, top + radius);
        ctx.lineTo(right, bottom - radius);
        ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
        ctx.lineTo(left + radius, bottom);
        ctx.quadraticCurveTo(left, bottom, left, bottom - radius);
        ctx.lineTo(left, top + radius);
        ctx.quadraticCurveTo(left, top, left + radius, top);

        ctx.fill();
      };

      // const ctx = document.getElementById("bar-chart").getContext("2d");

      // const canvas = document.getElementById("bar-chart") as HTMLCanvasElement;
      // canvas.width = Math.max(600, DAYS * 80);
      // ⭐ SET CANVAS WIDTH so scrolling is possible
      // canvas.width = 900; // adjust if you want more/less scroll

      // const ctx = canvas.getContext("2d")!;

      //   if (window.myBar) window.myBar.destroy();
      //   window.myBar = new Chart(ctx, config);
      // }, [recentMoods]);

      // if ((window as any).sleepChart) {
      //   (window as any).sleepChart.destroy();
      // }

      // (window as any).sleepChart = new Chart(ctx, config);
      const canvas = document.getElementById("bar-chart") as HTMLCanvasElement;
      if (canvas) {
        canvas.width = Math.max(600, DAYS * 80);
        const ctx = canvas.getContext("2d")!;
        if (chartRef.current) chartRef.current.destroy();
        chartRef.current = new Chart(ctx, config as any);
      }
    };

    loadAllIcons();

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [recentMoods]);

  if (recentMoods === undefined) return null;

  if (recentMoods.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-neutral-500">
        No sleep data yet
      </div>
    );
  }

  // return (
  //   <div className="relative flex flex-col min-w-0 break-words h-[42rem] lg:h-[40rem] ">
  //     {/* <div className="relative h-full"> */}
  //     <div className="overflow-x-auto overflow-y-hidden h-[100%] outline-focus relative">
  //       <canvas id="bar-chart"></canvas>

  //       {/* Your External React Component */}
  //       {tooltip && tooltip.visible && (
  //         <div
  //           className="absolute z-50 pointer-events-none transition-all duration-75 rounded-2xl drop-shadow-[0_4px_7px_#21214D16]"
  //           style={{
  //             left: tooltip.x,
  //             top: tooltip.y - 20,
  //             transform: tooltip.alignRight
  //               ? "translate(-100%, -100%)"
  //               : "translate(0%, -100%)",
  //             marginLeft: tooltip.alignRight ? "-15px" : "15px",
  //           }}
  //         >
  //           <CustomTooltip
  //             mood={tooltip.data.mood}
  //             sleep={tooltip.data.sleep}
  //             reflection={tooltip.data.reflection}
  //             tags={tooltip.data.tags}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  //fix tooltip z index, y axis scroll, tooltip text
  return (
    <div className="flex h-[40rem] w-full bg-white rounded-3xl overflow-hidden">
      {/* 1. FIXED SIDEBAR */}
      <div className="relative z-0 w-[100px] flex-shrink-0 bg-white flex flex-col justify-between pb-[11rem] pt-[0.7rem]">
        {[10, 8, 6, 4, 2].map((value) => {
          const labels: any = {
            10: "9+ hours",
            8: "7–8 hours",
            6: "5–6 hours",
            4: "3–4 hours",
            2: "0–2 hours",
          };
          return (
            <div key={value} className="flex items-center gap-3 h-10">
              <NextImage
                src="/assets/images/icon-sleep.svg"
                className="w-[18px] opacity-60"
                style={{ filter: "grayscale(1) brightness(0.4)" }}
                alt="sleep icon"
                width={12}
                height={12}
              />
              <span className="text-[13px] font-reddit-sans text-neutral-500 whitespace-nowrap">
                {labels[value]}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. SCROLLABLE CHART AREA */}
      <div className=" z-100 grow overflow-x-auto relative scrollbar-hide">
        <div style={{ width: Math.max(800, DAYS * 80) }} className="relative">
          <canvas id="bar-chart"></canvas>

          {/* 3. FLOATING TOOLTIP */}
          {tooltip && tooltip.visible && (
            <div
              className="absolute z-1000 pointer-events-none transition-all duration-150"
              style={{
                left: tooltip.x,
                bottom: 100,
                transform: tooltip.alignRight
                  ? "translateX(-100%)"
                  : "translateX(0%)",
                marginLeft: tooltip.alignRight ? "-20px" : "20px",
              }}
            >
              <CustomTooltip {...tooltip.data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
