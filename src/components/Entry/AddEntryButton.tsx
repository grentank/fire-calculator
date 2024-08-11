import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch } from '../../redux/hooks';
import { addEntry } from '../../redux/slices/calculator';
import { FinCategoryT } from '../../types/categories';

type AddEntryButtonProps = {
  category: FinCategoryT;
};

export default function AddEntryButton({
  category,
}: AddEntryButtonProps) {
  const [addingMode, setAddingMode] = useState(false);
  const [entryText, setEntryText] = useState('');
  const dispatch = useAppDispatch();
  const close = () => {
    setAddingMode(false);
    setEntryText('');
  };
  const createEntry = () => {
    if (entryText === '') return;
    dispatch(addEntry({ category, text: entryText }));
    close();
  };
  return addingMode ? (
    <form onSubmit={(e) => (e.preventDefault(), createEntry())}>
      <TextField
        margin="normal"
        label="Введи название"
        value={entryText}
        autoFocus
        //   name={entry.name}
        onChange={(e) => setEntryText(e.target.value)}
        //   disabled={!entry.editable}
        onBlur={createEntry}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="start">
                <IconButton onClick={createEntry} edge="end">
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
              <InputAdornment position="end">
                <IconButton onClick={close} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            </>
          ),
        }}
      />
    </form>
  ) : (
    <IconButton onClick={() => setAddingMode((p) => !p)}>
      <AddCircleOutlineIcon />
    </IconButton>
  );
}
