import React from 'react';
import { FinCategoryT } from '../../../types/categories';
import { useAppSelector } from '../../../redux/hooks';
import { Grid } from '@mui/material';
import Entry from '../../Entry/Entry';

type CategoryItemsListProps = {
  category: FinCategoryT;
};

export default function CategoryItemsList({
  category,
}: CategoryItemsListProps) {
  const items = useAppSelector((store) => store.calculator[category]);
  return (
    <>
      {items.map((item) => (
        <Grid item key={item.id} xs={12}>
          <Entry entry={item} />
        </Grid>
      ))}
    </>
  );
}
