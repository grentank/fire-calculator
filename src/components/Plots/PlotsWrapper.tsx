import { Container, Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import InvestmentsChart from './InvestmentsChart/InvestmentsChart';
import { useAppSelector } from '../../redux/hooks';
import investmentsDatasets from './utils/investmentsDatasets';
import InvestedPieChart from './PieCharts/InvestedPieChart';
import GrowthChart from './GrowthChart/GrowthChart';
import Summary from '../Summary/Summary';
import { extractConstants } from '../../types/guards';
import MonthSlider from '../MonthSlider/MonthSlider';
import EditDrawer from '../EditDrawer/EditDrawer';
// import GrowthChart from './GrowthChart/GrowthChart';

export default function PlotsWrapper() {
  // const [drawMonths, setDrawMonths] = useState([0, 240]);
  // console.log(drawMonths);
  const calculator = useAppSelector((store) => store.calculator);
  const { startMonth: start, endMonth: end } = extractConstants(
    calculator.constants,
  );
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
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography component="h1">Калькулятор инвестиций</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <EditDrawer />
      </Grid>
      <Grid
        item
        xs={9}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container>
          <MonthSlider />
        </Container>
      </Grid>
      <Grid item xs={8}>
        <InvestmentsChart
          labels={labels}
          datasets={datasets.slice(0, 3)}
        />
      </Grid>
      <Grid item xs={4}>
        <InvestedPieChart
          labels={datasets.slice(0, 3).map((ds) => ds.label)}
          datasets={datasets.slice(0, 3).map((ds) => ds.data.at(1))}
          title="Распределение портфеля в начале"
        />
      </Grid>
      <Grid item xs={8}>
        <GrowthChart
          labels={labels}
          datasets={datasets.slice(5)}
          title="Пассивный доход с инвестиций"
        />
      </Grid>

      <Grid item xs={4}>
        <InvestedPieChart
          labels={datasets.slice(0, 3).map((ds) => ds.label)}
          datasets={datasets.slice(0, 3).map((ds) => ds.data.at(-1))}
          title="Распределение портфеля в конце"
        />
      </Grid>

      <Grid item xs={12}>
        <Summary />
      </Grid>
    </Grid>
  );
}
