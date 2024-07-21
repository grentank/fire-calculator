import React from 'react';
import { useAppDispatch, useAppSelector } from '../../providers/rtk/hooks';
import { Grid, Slider, Typography } from '@mui/material';

import InvestmentGrowthChart from './InvestmentGrowthChart/InvestmentGrowthChart';
import ChartToFIRE from './ChartToFIRE/ChartToFIRE';
import { setNumerical } from '../../providers/rtk/slices/calculator';

export default function InvestmentsChart() {
  const dispatch = useAppDispatch();
  const { months } = useAppSelector((state) => state.calculator);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <InvestmentGrowthChart />
      </Grid>
      <Grid item xs={6} md={6}>
        <ChartToFIRE />
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom>Длительность плана в месяцах: {months}</Typography>
        <Slider
          max={360}
          value={months}
          onChange={(e, value) => {
            const numValue = Array.isArray(value) ? value[0] : value;
            if (Number.isNaN(numValue)) return;
            dispatch(setNumerical({ value: Math.floor(numValue), key: 'months' }));
          }}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
}
