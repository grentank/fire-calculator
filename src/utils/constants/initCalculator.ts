import uuidv4 from '../helpers/uuidGen';
import { CalculatorState } from '../types/calculator';

const income = [
  {
    id: uuidv4(),
    name: 'Zarplata',
    value: 220000,
    type: 'Зарплата',
  },
];

const fixedExpenses = [
  {
    id: uuidv4(),
    name: 'Ipoteka',
    value: 50000,
    type: 'Ипотека',
  },
  {
    id: uuidv4(),
    name: 'Podpiski',
    value: 5000,
    type: 'Подписки',
  },
];

const savings = [
  {
    id: uuidv4(),
    name: 'Sberezheniya',
    value: 10000,
    type: 'Сбережения',
  },
];

const investments = [
  {
    id: uuidv4(),
    name: 'Pokupka akciy',
    value: 100000,
    type: 'Покупка акций',
  },
];

const inflatingCosts = [
  {
    id: uuidv4(),
    name: 'Prodykty',
    value: 22000,
    type: 'Продукты',
  },
  {
    id: uuidv4(),
    name: 'Fitnes',
    value: 7000,
    type: 'Фитнес',
  },
];

export const initCalculator: CalculatorState = {
  months: 360,
  income,
  fixedExpenses,
  inflatingCosts,
  savings,
  investments,
  annualROI: 0.15,
  annualInflationRate: 0.12,
  annualPaycheckIncrease: 0.05,
  remaining: {
    id: uuidv4(),
    name: 'remaining',
    value: 220000 - 50000 - 22000 - 5000 - 10000 - 100000 - 7000,
    type: 'Остаток',
  },
};

export const MAX_MONTHS_CALCULATOR = 360;
