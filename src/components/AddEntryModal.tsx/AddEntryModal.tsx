import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../providers/rtk/hooks';
import { close } from '../../providers/rtk/slices/modal';
import { addEntry } from '../../providers/rtk/slices/calculator';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddEntryModal() {
  const { open, category } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(close());
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
            handleClose();
            dispatch(addEntry({ category: category, type: value }));
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Добавить в категорию: {category}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                id="addInput"
                label="Название"
                placeholder="Зарплата, ипотека, моб. связь"
                variant="standard"
                value={value}
                fullWidth
                onChange={(e) => setValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" type="submit">
                Добавить
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
