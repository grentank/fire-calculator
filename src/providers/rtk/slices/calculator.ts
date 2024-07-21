import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CATEGORIES,
  EntryT,
  keyIsNumerical,
  keyMatchesArrayOfEntries,
} from '../../../utils/types/calculator';
import uuidv4 from '../../../utils/helpers/uuidGen';
import transliterate from '../../../utils/helpers/transliterate';
import { initCalculator } from '../../../utils/constants/initCalculator';
import recalculateRemaining from '../../../utils/helpers/recalculateRemaining';

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: initCalculator,
  reducers: {
    removeEntry: (state, action: PayloadAction<EntryT['id']>) => {
      for (const category of CATEGORIES) {
        const targetIndex = state[category].findIndex((item) => item.id === action.payload);
        if (targetIndex === -1) continue;
        state[category].splice(targetIndex, 1);
        return;
      }
    },
    addEntry: (
      state,
      action: PayloadAction<{
        type: string;
        category: string;
      }>,
    ) => {
      const { type, category } = action.payload;
      const newEntry = {
        id: uuidv4(),
        name: transliterate(type),
        value: 0,
        type: type,
      };
      if (!keyMatchesArrayOfEntries(category)) return;
      state[category].push(newEntry);
    },
    updateValue: (state, action: PayloadAction<EntryT>) => {
      const { id, value } = action.payload;
      const allEntries: EntryT[] = [];
      for (const category of CATEGORIES) {
        allEntries.push(...state[category]);
      }
      const entry = allEntries.find((item) => item.id === id);
      if (entry) {
        entry.value = value;
      }
      state.remaining.value = recalculateRemaining(state);
    },
    updateName: (state, action: PayloadAction<EntryT>) => {
      const { id, name } = action.payload;
      const allEntries: EntryT[] = [];
      for (const category of CATEGORIES) {
        allEntries.push(...state[category]);
      }
      const entry = allEntries.find((item) => item.id === id);
      if (entry) {
        entry.name = name;
      }
    },
    setNumerical: (state, action: PayloadAction<{ value: number; key: string }>) => {
      const { value, key } = action.payload;
      if (!keyIsNumerical(key)) return;
      state[key] = value;
    },
  },
});

export const { setNumerical, updateValue, updateName, removeEntry, addEntry } =
  calculatorSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default calculatorSlice.reducer;
