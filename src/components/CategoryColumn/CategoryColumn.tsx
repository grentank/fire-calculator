import React from 'react';
import { useAppSelector } from '../../providers/rtk/hooks';
import { Grid, Typography } from '@mui/material';
import Entry from '../Entry/Entry';
import NewEntry from '../NewEntry/NewEntry';
import { CategoryT } from '../../utils/types/calculator';

type CategoryColumnProps = {
  category: CategoryT;
};

function catName(cat: CategoryT) {
  switch (cat) {
    case 'income':
      return 'Доход';
    case 'fixed':
      return 'Фиксированные';
    case 'savings':
      return 'Сбережения';
    case 'investments':
      return 'Инвестиции';
    default:
      return '';
  }
}

export default function CategoryColumn({ category }: CategoryColumnProps) {
  const items = useAppSelector((store) =>
    category === 'income' ? store.calculator.income : store.calculator.expenses[category],
  );

  return (
    <Grid container>
      <Grid key={`label ${category}`} item xs={12}>
        <Typography>{catName(category)}</Typography>
      </Grid>
      {items.map((item) => (
        <Grid key={item.id} item xs={12}>
          <Entry entry={item} />
        </Grid>
      ))}
      <Grid key={`new ${category}`} item xs={12}>
        <NewEntry category={category} />
      </Grid>
    </Grid>
  );
}
