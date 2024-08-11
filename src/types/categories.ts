export const FINANCIAL_CATEGORIES = [
  {
    name: 'income',
    text: 'Доходы',
  },
  {
    name: 'fixedExpenses',
    text: 'Фикс расходы',
  },
  {
    name: 'savings',
    text: 'Сбережения',
  },
  {
    name: 'investments',
    text: 'Инвестиции',
  },
  {
    name: 'constants',
    text: 'Константы',
  },
] as const;

export type FinCategoryT =
  (typeof FINANCIAL_CATEGORIES)[number]['name'];

export enum FinTimeEnum {
  never = 0,
  monthly = 1,
  annual = 12,
}

export type EntryType = {
  id: string;
  name: string;
  text: string;
  value: number;
  periodicity: FinTimeEnum;
  editable: boolean;
  removable: boolean;
};

export type CalculatorType = {
  [k in FinCategoryT]: EntryType[];
};
