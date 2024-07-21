import React from 'react';
import uuidv4 from './utils/helpers/uuidGen';
import { Container, Grid } from '@mui/material';
import AddEntryModal from './components/AddEntryModal.tsx/AddEntryModal';
import CategoryColumn from './components/CategoryColumn/CategoryColumn';
import { CategoryT } from './utils/types/calculator';
import InvestmentsChart from './components/charts/InvestmentsChart';

function App() {
  const categories: CategoryT[] = ['income', 'fixed', 'investments', 'savings'];
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InvestmentsChart />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid key={uuidv4()} item xs={3}>
            <CategoryColumn category={category} />
          </Grid>
        ))}
      </Grid>
      <AddEntryModal />
    </Container>
  );
}

export default App;
