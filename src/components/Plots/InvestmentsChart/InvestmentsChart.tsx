import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ChartProps } from '../types/chart';

export default function InvestmentsChart({
  labels,
  datasets,
}: ChartProps) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current;
    const chart = new Chart(ctx, {
      type: 'bar',
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
      data: {
        labels,
        datasets,
      },
    });
    return () => chart.destroy();
  }, [labels, datasets]);
  return <canvas ref={canvasRef} id="investments-chart"></canvas>;
}
