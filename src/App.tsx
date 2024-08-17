import React from 'react';
import { Container, Grid } from '@mui/material';
import PlotsWrapper from './components/Plots/PlotsWrapper';
import CategoryList from './components/Category/CategorySelect/CategorySelect';

function App() {
  return (
    // <Container>
    <Grid container>
      <Grid item xs={2}>
        <CategoryList />
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PlotsWrapper />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // </Container>
  );
}

export default App;
