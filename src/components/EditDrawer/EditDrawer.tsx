import { Box, Button, Drawer } from '@mui/material';
import React, { useState } from 'react';
import CategorySelect from '../Category/CategorySelect/CategorySelect';

export default function EditDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Редактировать значения
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 300, margin: 3 }}>
          <CategorySelect />
        </Box>
      </Drawer>
    </>
  );
}
