import React, { useState } from 'react';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { EntryT } from '../../utils/types/calculator';
import { useAppDispatch } from '../../providers/rtk/hooks';
import { removeEntry, updateValue } from '../../providers/rtk/slices/calculator';

type EntryProps = {
  entry: EntryT;
};

export default function Entry({ entry }: EntryProps) {
  const dispatch = useAppDispatch();
  const [invalid, setInvalid] = useState(false);
  return (
    <>
      <InputLabel htmlFor={entry.id}>{entry.type}</InputLabel>
      <OutlinedInput
        sx={{
          marginTop: '5px',
          marginBottom: '5px',
        }}
        id={entry.id}
        name={entry.name}
        value={entry.value.toString()}
        onChange={(e) => {
          const { value } = e.target;
          const numValue = Number(value);
          if (Number.isNaN(numValue)) return setInvalid(true);
          setInvalid(false);
          dispatch(updateValue({ ...entry, value: numValue }));
        }}
        error={invalid}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => dispatch(removeEntry(entry.id))}
              edge="end"
            >
              <CancelIcon />
            </IconButton>
          </InputAdornment>
        }
        //   variant="outlined"
      />
    </>
  );
}
