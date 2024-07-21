import React from 'react';
import { useAppSelector } from '../../providers/rtk/hooks';
import { Grid, Typography } from '@mui/material';
import Entry from '../Entry/Entry';
import NewEntry from '../NewEntry/NewEntry';
import { CATEGORIES_WITH_LABELS, CategoryT } from '../../utils/types/calculator';

type CategoryColumnProps = {
  category: CategoryT;
};

export default function CategoryColumn({ category }: CategoryColumnProps) {
  const items = useAppSelector((store) => store.calculator[category]);
  const targetCategory = CATEGORIES_WITH_LABELS.find((cat) => cat.key === category);
  if (!targetCategory) throw new Error(`Category ${category} not found`);

  return (
    <Grid container>
      <Grid key={`label ${category}`} item xs={12}>
        <Typography variant="h5">{targetCategory.simpleText}</Typography>
      </Grid>
      {items.map((item) => (
        <Grid key={item.id} item xs={12}>
          <Entry entry={item} />
        </Grid>
      ))}
      <Grid key={`new ${category}`} item xs={12}>
        <NewEntry text={targetCategory.label} category={category} />
      </Grid>
    </Grid>
  );
}
