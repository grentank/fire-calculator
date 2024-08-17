import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../redux/hooks';
import {
  changeEntryValue,
  deleteEntry,
} from '../../redux/slices/calculator';
import { EntryType } from '../../types/categories';

type EntryProps = {
  entry: EntryType;
};

export default function Entry({ entry }: EntryProps) {
  const dispatch = useAppDispatch();
  return (
    <TextField
      margin="normal"
      label={entry.text}
      value={entry.value}
      name={entry.name}
      onChange={(e) => {
        const newValue = Number(e.target.value);
        console.log({ newValue, val: e.target.value });
        if (Number.isNaN(newValue)) return;
        dispatch(changeEntryValue({ ...entry, value: newValue }));
      }}
      disabled={!entry.editable}
      InputProps={{
        endAdornment: entry.removable ? (
          <InputAdornment position="end">
            <IconButton
              onClick={() => dispatch(deleteEntry(entry.id))}
              edge="end"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
    />
  );
}
