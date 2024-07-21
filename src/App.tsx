import React from 'react';
import uuidv4 from './utils/helpers/uuidGen';
import { Container, Grid, Typography } from '@mui/material';
import AddEntryModal from './components/AddEntryModal.tsx/AddEntryModal';
import CategoryColumn from './components/CategoryColumn/CategoryColumn';
import { CATEGORIES } from './utils/types/calculator';
import InvestmentsChart from './components/charts/InvestmentsChart';
import { useAppSelector } from './providers/rtk/hooks';
import Entry from './components/Entry/Entry';

function App() {
  const remaining = useAppSelector((store) => store.calculator.remaining);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InvestmentsChart />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {CATEGORIES.map((category) => (
          <Grid key={uuidv4()} item xs={4}>
            <CategoryColumn category={category} />
          </Grid>
        ))}
        <Grid key={remaining.id} item xs={4}>
          <Grid container>
            <Grid key="label remaining" item xs={12}>
              <Typography variant="h5">Оставшиеся деньги</Typography>
            </Grid>
            <Grid item xs={12}>
              <Entry entry={remaining} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddEntryModal />
    </Container>
  );
}

export default App;
