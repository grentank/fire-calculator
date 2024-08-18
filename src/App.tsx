import React from 'react';
import { Container, Grid } from '@mui/material';
import PlotsWrapper from './components/Plots/PlotsWrapper';

function App() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container>
            <PlotsWrapper />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
