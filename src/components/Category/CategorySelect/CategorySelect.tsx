import React, { useState } from 'react';
import { Grid, MenuItem, Select } from '@mui/material';
import {
  FINANCIAL_CATEGORIES,
  FinCategoryT,
} from '../../../types/categories';
import CategoryItemsList from '../CategoryItemsList/CategoryItemsList';
import isFinCategory from '../../../types/guards';
import AddEntryButton from '../../Entry/AddEntryButton';



export default function CategorySelect() {
  const [selectedCategory, setSelectedCategory] =
    useState<FinCategoryT>(FINANCIAL_CATEGORIES[0].name);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Select
          value={selectedCategory}
          onChange={(e) =>
            isFinCategory(e.target.value) &&
            setSelectedCategory(e.target.value)
          }
        >
          {FINANCIAL_CATEGORIES.map((category) => (
            <MenuItem value={category.name} key={category.name}>
              {category.text}
            </MenuItem>
          ))}
        </Select>
        <CategoryItemsList category={selectedCategory} />
        <Grid alignItems="center" item xs={12} textAlign="center">
          <AddEntryButton category={selectedCategory} />
        </Grid>
      </Grid>
    </Grid>
  );
}
