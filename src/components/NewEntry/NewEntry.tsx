import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '../../providers/rtk/hooks';
import { openWithCategory } from '../../providers/rtk/slices/modal';
import { IconButton } from '@mui/material';

type NewEntryProps = {
  category: string;
  text: string;
};

export default function NewEntry({ category }: NewEntryProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      <IconButton
        aria-label="add category"
        onClick={() => {
          dispatch(openWithCategory(category));
        }}
        edge="end"
      >
        <AddCircleIcon />
      </IconButton>
    </>
  );
}
