import React from "react";
import Chart from "chart.js";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CustomTooltip } from "../UI/CustomTooltip";
import NextImage from "next/image";
import { createPortal } from "react-dom";

const DAYS = 11;

const ICON_PATHS = {
  "-2": "/assets/images/icon-very-sad-white.svg",
  "-1": "/assets/images/icon-sad-white.svg",
  "0": "/assets/images/icon-neutral-white.svg",
  "1": "/assets/images/icon-happy-white.svg",
  "2": "/assets/images/icon-very-happy-white.svg",
};

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

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const chartRef = React.useRef<Chart | null>(null);

  React.useEffect(() => {
    if (recentMoods && scrollContainerRef.current) {
      const container = scrollContainerRef.current;

      // We use a small timeout to ensure the browser has finished
      // calculating the layout of the inner canvas
      const timer = setTimeout(() => {
        container.scrollLeft = container.scrollWidth;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [recentMoods]);

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

      const sleepLabel = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        if (!mood) return null;
        return mood.sleep?.label ?? "";
      });

      const moodValues = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        return mood?.mood?.order ?? null;
      });

      const moodLabel = days.map((day) => {
        const mood = moodByDay.get(day.toISOString());
        return mood?.mood?.label ?? "";
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
              categoryPercentage: 1.6, // ADD GAP BETWEEN CATEGORIES
              barPercentage: 1.6,

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
            padding: { top: 20, bottom: 28, left: 55 },
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
                display: true,
                ticks: {
                  display: false,
                  min: 0,
                  max: 10, // needed to align the labels
                  stepSize: 2, // generates values: 0,2,4,6,8,10
                },
                gridLines: {
                  display: true,
                  drawBorder: false, // Remove the thick line on the left edge
                  color: "#dbeafeb7",
                  zeroLineColor: "transparent",
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
              const alignRight = mouseX > visibleRightEdge - 100;

              const index = tooltipModel.dataPoints[0].index;
              const meta = chartInstance.getDatasetMeta(0);
              const barModel = meta.data[index]._model;

              setTooltip({
                visible: true,
                x: barModel.x, // Use bar center X
                y: barModel.y, // Use bar top Y
                data: {
                  mood: moodLabel[index],
                  sleep: sleepLabel[index],
                  reflection: reflection[index],
                  tags: tags[index],
                },
                alignRight,
              });
            },
          },
        },
        plugins: {
          afterDatasetsDraw: function (chart) {
            const ctx = chart.ctx;
            // const xAxis = chart.scales["x-axis-0"];
            const yAxis = chart.scales["y-axis-0"];

            // --- 1. Draw Mood Icons on Bars
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

            // --- DRAW X-AXIS (Bold Days) ---
            chart.data.labels.forEach((label, index) => {
              const [month, day] = label.split(" ");
              const meta = chart.getDatasetMeta(0);
              const xPos = meta.data[index]._model.x; // Get horizontal center of the bar
              const yPos = yAxis.bottom + 10; // Position just below the bottom of the chart

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

      const canvas = document.getElementById("bar-chart") as HTMLCanvasElement;
      if (canvas) {
        canvas.width = Math.max(720, DAYS * 65);
        // canvas.height = 640; // 40rem is 640px
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

  // replace all icons with comp instead of imgs, responsiveness, averages
  return (
    <div className="relative flex  w-full  rounded-3xl ">
      {/* 1. FIXED SIDEBAR */}
      <div className="absolute w-[100px] h-[-webkit-fill-available]  flex flex-col justify-between pb-48 pt-[0.7rem]">
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
              <span className=" text-[13px] font-reddit-sans text-neutral-500 whitespace-nowrap">
                {labels[value]}
              </span>
            </div>
          );
        })}
      </div>

      {/* 2. SCROLLABLE CHART AREA */}
      <div
        ref={scrollContainerRef}
        className="z-10 ml-40 relative grow overflow-x-auto scrollbar-hide"
      >
        <div
          style={{
            width: Math.max(720, DAYS * 65),
            height: "38rem",
            overflowY: "hidden",
          }}
          className=" "
        >
          <canvas id="bar-chart"></canvas>
        </div>
        {/* 3. FLOATING TOOLTIP */}

        {tooltip &&
          tooltip.visible &&
          createPortal(
            <div
              className="fixed pointer-events-none transition-all duration-150"
              style={{
                zIndex: 9999,
                // Get the bounding box of the canvas to offset body-level portal
                left:
                  document.getElementById("bar-chart")?.getBoundingClientRect()
                    .left! + tooltip.x,
                top: document
                  .getElementById("bar-chart")
                  ?.getBoundingClientRect().top!,
                transform: tooltip.alignRight
                  ? "translate(-100%, 0%)"
                  : "translate(0%, 0%)",
                marginLeft: tooltip.alignRight ? "-20px" : "20px",
              }}
            >
              <CustomTooltip {...tooltip.data} />
            </div>,
            document.body
          )}
      </div>
    </div>
  );
}
