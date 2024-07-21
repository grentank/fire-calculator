import { uuid } from '../helpers/uuidGen';

export type CalculatorState = {
  months: number;
  income: EntryT[]; // Любой доход после вычета налогов
  fixedExpenses: EntryT[]; // Фиксированные расходы, которые не увеличиваются в размере (напр. ипотека, подписки)
  inflatingCosts: EntryT[]; // Расходы, которые увеличиваются из-за инфляции (напр. аренда жилья, продукты)
  savings: EntryT[]; // Сбережения, которые не увеличиваются в размере (напр. накопления)
  investments: EntryT[]; // Инвестиции, которые увеличиваются в размере (напр. страховые вклады)
  remaining: EntryT; // Что остаётся после разницы всех доходов и всех расходов
  annualROI: number; // Годовой процент роста инвестиционного портфеля без учёта инфляции (напр. 15%)
  annualInflationRate: number; // Годовой процент инфляции (напр. 10%, тогда чистый рост инвестиций = 15% - 10% = 5%)
  annualPaycheckIncrease: number; // Годовой процент повышения заработной платы
};

export const CATEGORIES = [
  'fixedExpenses',
  'inflatingCosts',
  'savings',
  'investments',
  'income',
] as const;

export const NUMERICAL_KEYS = [
  'months',
  'annualROI',
  'annualInflationRate',
  'annualPaycheckIncrease',
] as const;

export type NumericalKeyT = (typeof NUMERICAL_KEYS)[number];

export type CategoryT = (typeof CATEGORIES)[number];

export const CATEGORIES_WITH_LABELS = [
  { key: 'fixedExpenses', label: 'Фиксированные расходы', simpleText: 'Фиксированные расходы' },
  {
    key: 'inflatingCosts',
    label: 'Расходы, увеличивающиеся из-за инфляции',
    simpleText: 'Растущие расходы',
  },
  { key: 'savings', label: 'Сбережения', simpleText: 'Фиксированные сбережения' },
  { key: 'investments', label: 'Инвестиции', simpleText: 'Инвестиции' },
  { key: 'income', label: 'Доход', simpleText: 'Все доходы' },
] as const;

export type EntryT<T = number> = {
  id: uuid;
  name: string;
  value: T;
  type: string;
};

// export function keyIsExpense(key: string): key is 'fixed' | 'savings' | 'investments' {
//   return ['fixed', 'savings', 'investments'].includes(key);
// }

export function keyIsNumerical(key: string): key is NumericalKeyT {
  return NUMERICAL_KEYS.includes(key as NumericalKeyT);
}

export function keyMatchesArrayOfEntries(key: string): key is CategoryT {
  return CATEGORIES.includes(key as CategoryT);
}
