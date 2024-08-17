import { Grid, Slider, Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';
import InvestmentsChart from './InvestmentsChart/InvestmentsChart';
import { MAX_MONTHS } from '../../utils/initCalculator';
import { useAppSelector } from '../../redux/hooks';
import investmentsDatasets from './utils/investmentsDatasets';
import InvestedPieChart from './PieCharts/InvestedPieChart';
import GrowthChart from './GrowthChart/GrowthChart';
// import GrowthChart from './GrowthChart/GrowthChart';

export default function PlotsWrapper() {
  const [drawMonths, setDrawMonths] = useState([0, 240]);
  console.log(drawMonths);
  const calculator = useAppSelector((store) => store.calculator);
  const [start, end] = drawMonths;
  const duration = end - start;
  const labels = useMemo(() => {
    return new Array(duration)
      .fill(null)
      .map((_, i) => `${start + i}`);
  }, [duration, start]);

  const datasets = useMemo(
    () => investmentsDatasets(calculator),
    [calculator],
  ).map((ds) => ({ ...ds, data: ds.data.slice(start, end) }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          spacing={2}
          direction="row"
          sx={{ m: 5 }}
          alignItems="center"
        >
          <Slider
            aria-label="Volume"
            value={drawMonths}
            onChange={(_, value) => {
              if (typeof value === 'number')
                setDrawMonths([0, value]);
              else setDrawMonths(value);
            }}
            max={MAX_MONTHS / 2}
            marks={[
              // { value: 0, label: '0' },
              // { value: MAX_MONTHS, label: `${MAX_MONTHS}` },
              { value: drawMonths[0], label: `${drawMonths[0]}` },
              { value: drawMonths[1], label: `${drawMonths[1]}` },
            ]}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InvestmentsChart
              labels={labels}
              datasets={datasets.slice(0, 3)}
            />
          </Grid>
          <Grid item xs={12}>
            <GrowthChart
              labels={labels}
              datasets={datasets.slice(5)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InvestedPieChart
              labels={datasets.slice(0, 3).map((ds) => ds.label)}
              datasets={datasets
                .slice(0, 3)
                .map((ds) => ds.data.at(1))}
              title="Распределение в начале"
            />
          </Grid>
          <Grid item xs={6}>
            <InvestedPieChart
              labels={datasets.slice(0, 3).map((ds) => ds.label)}
              datasets={datasets
                .slice(0, 3)
                .map((ds) => ds.data.at(-1))}
              title="Распределение в конце"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
