import { Grid, Slider, Stack } from '@mui/material';
import React, { useState } from 'react';
import InvestmentsChart from './InvestmentsChart/InvestmentsChart';
import { MAX_MONTHS } from '../../utils/initCalculator';
// import GrowthChart from './GrowthChart/GrowthChart';

export default function PlotsWrapper() {
  const [drawMonths, setDrawMonths] = useState(240);
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
              const newValue = Array.isArray(value)
                ? value[0]
                : value;
              if (Number.isNaN(newValue)) return;
              setDrawMonths(newValue);
            }}
            max={MAX_MONTHS}
            marks={[
              { value: 0, label: '0' },
              { value: MAX_MONTHS, label: `${MAX_MONTHS}` },
              { value: drawMonths, label: `${drawMonths}` },
            ]}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <InvestmentsChart drawMonths={drawMonths} />
      </Grid>
      <Grid item xs={12}>
        321
        {/* <GrowthChart /> */}
      </Grid>
    </Grid>
  );
}
