import { Chart } from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../providers/rtk/hooks';
import { Grid, Slider } from '@mui/material';
import { setMonths } from '../../providers/rtk/slices/calculator';
import {
  genExpenses,
  genIncome,
  investmentsGrowth,
  simpleSavings,
} from '../../utils/helpers/generateDataset';

export default function InvestmentsChart() {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const plotRef = useRef<null | HTMLCanvasElement>(null);
  const { months, income, expenses } = useAppSelector((store) => store.calculator);
  const { fixed, investments, savings } = expenses;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!canvasRef.current || !plotRef.current) return;
    const investmentsArr = investmentsGrowth({ income, investments, months, fixed, savings });
    const investCtx = canvasRef.current;
    const investmentsChart = new Chart(investCtx, {
      type: 'bar',
      data: {
        labels: new Array(months).fill(null).map((_, i) => i + 1),
        datasets: [
          {
            label: 'Инвестиции',
            data: investmentsArr.totalInvestments,
            borderWidth: 1,
          },
          {
            label: 'Без инвестирования',
            data: simpleSavings({ income, investments, months, fixed, savings }),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const plotChart = new Chart(plotRef.current, {
      type: 'line',
      data: {
        labels: new Array(months).fill(null).map((_, i) => i + 1),
        datasets: [
          {
            label: 'Рост дохода',
            data: genIncome({ income, investments, months, fixed, savings }),
            borderWidth: 1,
          },
          {
            label: 'Доход с инвестиций',
            data: investmentsArr.monthlyGrowth,
            borderWidth: 1,
          },
          {
            label: 'Расходы',
            data: genExpenses({ income, investments, months, fixed, savings }),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      investmentsChart.destroy();
      plotChart.destroy();
    };
  }, [months, income, investments, fixed, savings]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <canvas ref={canvasRef} id="investmentsChart"></canvas>
      </Grid>
      <Grid item xs={6} md={6}>
        <canvas ref={plotRef} id="plotChart"></canvas>
      </Grid>
      <Grid item xs={12}>
        <Slider
          max={360}
          value={months}
          onChange={(e, value) => {
            const numValue = Array.isArray(value) ? value[0] : value;
            if (Number.isNaN(numValue)) return;
            dispatch(setMonths(Math.floor(numValue)));
          }}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
}
