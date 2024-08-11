import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useAppSelector } from '../../../redux/hooks';
import investmentsDatasets from './investmentsDatasets';

type InvestmentsChartProps = {
  drawMonths: number;
};

export default function InvestmentsChart({
  drawMonths,
}: InvestmentsChartProps) {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const calculator = useAppSelector((store) => store.calculator);

  const labels = useMemo(() => {
    return new Array(drawMonths).fill(null).map((_, i) => `${i}`);
  }, [drawMonths]);
  const datasets = useMemo(
    () => investmentsDatasets(calculator),
    [calculator],
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
    });
    return () => chart.destroy();
  }, [labels, datasets]);
  return <canvas ref={canvasRef} id="investments-chart"></canvas>;
}
