import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../providers/rtk/hooks';
import { Chart } from 'chart.js/auto';
import generateFIREdatasets from './generateFIREdatasets';

export default function ChartToFIRE() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const calculator = useAppSelector((store) => store.calculator);
  useEffect(() => {
    if (!canvasRef.current) return;
    const plotCtx = canvasRef.current;
    const plotChart = new Chart(plotCtx, {
      type: 'line',
      data: {
        labels: new Array(calculator.months).fill(null).map((_, i) => i + 1),
        datasets: generateFIREdatasets(calculator),
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => plotChart.destroy();
  }, [calculator]);
  return <canvas ref={canvasRef} id="plotChart"></canvas>;
}
