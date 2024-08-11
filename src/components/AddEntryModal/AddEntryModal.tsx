import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeModal } from '../../redux/slices/modal';
import { addEntry } from '../../redux/slices/calculator';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function AddEntryModal() {
  const { open, category } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  const [value, setValue] = useState('');

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addEntry({ category, type: value }));
            dispatch(closeModal());
            setValue('');
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Добавить в категорию {category}
          </Typography>
          <TextField
            id="outlined-basic"
            label="Укажи название"
            variant="outlined"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            autoFocus
          />
          <Button type="submit" variant="outlined">
            Добавить
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
