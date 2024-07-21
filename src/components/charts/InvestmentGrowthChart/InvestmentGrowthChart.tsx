import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../providers/rtk/hooks';
import { Chart } from 'chart.js/auto';
import generateInvestmentDatasets from './generateInvestmentDatasets';

export default function InvestmentGrowthChart() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const calculator = useAppSelector((store) => store.calculator);

  useEffect(() => {
    if (!canvasRef.current) return;
    const investCtx = canvasRef.current;
    const investmentsChart = new Chart(investCtx, {
      type: 'bar',
      data: {
        labels: new Array(calculator.months).fill(null).map((_, i) => i + 1),
        datasets: generateInvestmentDatasets(calculator),
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => investmentsChart.destroy();
  }, [calculator]);

  return <canvas ref={canvasRef} id="investmentsChart"></canvas>;
}
