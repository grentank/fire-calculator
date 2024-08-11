import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { transliterate as tr } from 'transliteration';
import { initCalculator } from '../../utils/initCalculator';
import {
  EntryType,
  FINANCIAL_CATEGORIES,
  FinCategoryT,
  FinTimeEnum,
} from '../../types/categories';

// const initialState: CalculatorT = {
//   income: [],
//   fixedExpenses: [],
//   inflatingExpenses: [],
//   investments: [],
//   savings: [],
//   remaining: {
//     id: "remaining",
//     name: "Remaining",
//     value: 0,
//     type: "Остаток",
//   },
// };

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: initCalculator,
  reducers: {
    addEntry: (
      state,
      action: PayloadAction<{ category: FinCategoryT; text: string }>,
    ) => {
      const { category, text } = action.payload;
      state[category].push({
        id: uuidv4(),
        text,
        name: tr(text),
        value: 0,
        editable: true,
        removable: true,
        periodicity: FinTimeEnum.monthly,
      });
    },
    deleteEntry: (state, action: PayloadAction<EntryType['id']>) => {
      for (const category of FINANCIAL_CATEGORIES) {
        const { name } = category;
        const targetIndex = state[name].findIndex(
          (entry) => entry.id === action.payload,
        );
        if (
          targetIndex !== -1 &&
          state[name][targetIndex].removable
        ) {
          state[name].splice(targetIndex, 1);
          break;
        }
      }
      // state.remaining.value = calculateRemaining(state);
    },
    changeEntryValue: (state, action: PayloadAction<EntryType>) => {
      const { id, value } = action.payload;
      for (const category of FINANCIAL_CATEGORIES) {
        const { name } = category;
        const targetEntry = state[name].find(
          (entry) => entry.id === id,
        );
        if (targetEntry && targetEntry.editable) {
          targetEntry.value = value;
          break;
        }
      }
      // state.remaining.value = calculateRemaining(state);
    },
  },
});

export const { addEntry, deleteEntry, changeEntryValue } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
