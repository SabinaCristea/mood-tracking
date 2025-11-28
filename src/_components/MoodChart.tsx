import React from "react";
import Chart from "chart.js";

import { ReactComponent as SleepSVG } from "./../../public/assets/images/icon-sleep.svg";

export default function CardBarChart() {
  React.useEffect(() => {
    // Generate last 15 days
    const labels = Array.from({ length: 11 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (10 - i)); // oldest → newest
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    const colorForHour = (h) => {
      if (h <= 2) return "#FF9E9E"; // red
      if (h <= 4) return "#FFB87A"; // orange
      if (h <= 6) return "#FFD47B"; // yellow
      if (h <= 8) return "#8EF2A0"; // green
      return "#8DD3FF"; // blue (9+)
    };

    const emojiForHour = (h) => {
      if (h <= 2) return "😴";
      if (h <= 4) return "😐";
      if (h <= 6) return "🙂";
      if (h <= 8) return "😃";
      return "🚀";
    };

    const hours = [8, 7, 6, 10, 6, 5, 7, 7, 8, 8, 9];
    const backgroundColors = hours.map(colorForHour);

    const config = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            // label: new Date().getFullYear(),
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            //data: hours,
            data: [],
            fill: false,
            barThickness: 40,
            categoryPercentage: 0.6, // ADD GAP BETWEEN CATEGORIES
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        responsive: false, // ⭐ REQUIRED so custom width works
        // responsive: true,
        layout: {
          padding: { top: 20, bottom: 50 },
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
                autoSkip: false, // 👈 REQUIRED

                callback: function (value) {
                  const [month, day] = value.split(" ");
                  return [month, day];
                },
                fontColor: "#333",
                padding: 10,
                fontFamily: "Inter, Arial, sans-serif",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                min: 0,
                max: 8, // needed to align the labels
                stepSize: 2, // generates values: 0,2,4,6,8,10
                fontFamily: "Inter, Arial, sans-serif",
                callback: function (value) {
                  const map = {
                    0: "💤 0–2 hours",
                    2: "💤 3–4 hours",
                    4: "💤 5–6 hours",
                    6: "💤 7–8 hours",
                    8: "💤 9+ hours",
                  };
                  return map[value] || "";
                },
                fontColor: "rgba(76, 84, 92, 0.6)",
                padding: 10,
              },
              gridLines: {
                borderDash: [1],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(76, 84, 92, 0.2)",
              },
            },
          ],
        },
      },
      plugins: {
        afterDatasetsDraw: function (chart) {
          const ctx = chart.ctx;
          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((bar, index) => {
              const x = bar._model.x;
              const y = bar._model.y;

              // Draw emoji inside bar near top
              ctx.font = "18px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom"; // aligns text to top of bar
              ctx.fillStyle = "#000"; // contrast color
              ctx.fillText(emojiForHour(dataset.data[index]), x, y + 25);
              // +5 to move slightly down inside bar
            });
          });
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

    const canvas = document.getElementById("bar-chart");

    // ⭐ SET CANVAS WIDTH so scrolling is possible
    canvas.width = 900; // adjust if you want more/less scroll

    const ctx = canvas.getContext("2d");

    if (window.myBar) window.myBar.destroy();
    window.myBar = new Chart(ctx, config);
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words h-[42rem] lg:h-[40rem]">
      {/* <div className="relative h-full"> */}
      <div className="overflow-x-auto overflow-y-hidden h-[100%]">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  );
}
