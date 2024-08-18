import { Slider } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeEntryValue } from '../../redux/slices/calculator';

export default function MonthSlider() {
  const constants = useAppSelector(
    (store) => store.calculator.constants,
  );
  const [startEntry, endEntry] = constants.slice(5);
  const start = startEntry.value;
  const end = endEntry.value;
  const dispatch = useAppDispatch();
  return (
    <Slider
      value={[start, end]}
      onChange={(_, value) => {
        if (typeof value === 'number')
          return dispatch(changeEntryValue({ ...endEntry, value }));
        const [startValue, endValue] = value;
        dispatch(
          changeEntryValue({ ...startEntry, value: startValue }),
        );
        dispatch(changeEntryValue({ ...endEntry, value: endValue }));
      }}
      max={constants[0].value}
      marks={[
        { value: start, label: `${start}` },
        { value: end, label: `${end}` },
      ]}
    />
  );
}
