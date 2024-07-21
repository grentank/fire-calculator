import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalculatorState, EntryT, keyIsExpense } from '../../../utils/types/calculator';
import uuidv4 from '../../../utils/helpers/uuidGen';
import transliterate from '../../../utils/helpers/transliterate';

const initialState: CalculatorState = {
  months: 360,
  income: [
    {
      id: uuidv4(),
      name: 'Zarplata',
      value: 330000,
      type: 'Зарплата',
    },
  ],
  expenses: {
    fixed: [
      {
        id: uuidv4(),
        name: 'Ipoteka',
        value: 72000,
        type: 'Ипотека',
      },
      {
        id: uuidv4(),
        name: 'Arenda kvartiry',
        value: 45000,
        type: 'Аренда квартиры',
      },
      {
        id: uuidv4(),
        name: 'Fitnes',
        value: 7000,
        type: 'Фитнес',
      },
      {
        id: uuidv4(),
        name: 'Podpiski',
        value: 5000,
        type: 'Подписки',
      },
    ],
    savings: [
      {
        id: uuidv4(),
        name: 'Sberezheniya',
        value: 10000,
        type: 'Сбережения',
      },
    ],
    investments: [
      {
        id: uuidv4(),
        name: 'Pokupka akciy',
        value: 100000,
        type: 'Покупка акций',
      },
    ],
    remaining: {
      id: uuidv4(),
      name: 'remaining',
      value: 0,
      type: 'Остаток',
    },
  },
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    removeEntry: (state, action: PayloadAction<EntryT['id']>) => {
      const incomeIndex = state.income.findIndex((item) => item.id === action.payload);
      if (incomeIndex !== -1) return state.income.splice(incomeIndex, 1), undefined;

      for (const category of Object.keys(state.expenses) as (keyof typeof state.expenses)[]) {
        if (category === 'remaining') continue;
        const targetIndex = state.expenses[category].findIndex(
          (item) => item.id === action.payload,
        );
        if (targetIndex === -1) continue;
        state.expenses[category].splice(targetIndex, 1);
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
      if (category === 'income') return state.income.push(newEntry), undefined;
      if (!keyIsExpense(category)) return;
      state.expenses[category].push(newEntry);
    },
    updateValue: (state, action: PayloadAction<EntryT>) => {
      const { id, value } = action.payload;
      const entry = [
        ...state.income,
        ...state.expenses.fixed,
        ...state.expenses.savings,
        ...state.expenses.investments,
      ].find((item) => item.id === id);
      if (entry) {
        entry.value = value;
      }
    },
    updateName: (state, action: PayloadAction<EntryT>) => {
      const { id, name } = action.payload;
      const entry = [
        ...state.income,
        ...state.expenses.fixed,
        ...state.expenses.savings,
        ...state.expenses.investments,
      ].find((item) => item.id === id);
      if (entry) {
        entry.name = name;
      }
    },
    setMonths: (state, action: PayloadAction<number>) => {
      state.months = action.payload;
    },
  },
});

export const {
  // addFixed,
  // addSavings,
  // addInvestments,
  // addIncome,
  setMonths,
  updateValue,
  updateName,
  removeEntry,
  addEntry,
} = calculatorSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default calculatorSlice.reducer;
