import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ChartProps } from '../types/chart';

export default function InvestedPieChart({
  labels,
  datasets,
  title,
}: ChartProps) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current;
    const chart = new Chart(ctx, {
      type: 'pie',
      options: {
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
        responsive: true,
        animation: {
          duration: 0,
        },
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Датасет',
            data: datasets,
          },
        ],
      },
    });
    return () => chart.destroy();
  }, [labels, datasets]);
  return <canvas ref={canvasRef} id="investments-pie-chart"></canvas>;
}
