import { uuid } from '../helpers/uuidGen';

export type CalculatorState = {
  months: number;
  income: EntryT[];
  expenses: {
    fixed: EntryT[];
    savings: EntryT[];
    investments: EntryT[];
    remaining: EntryT;
  };
};
export type CategoryT = 'fixed' | 'savings' | 'investments' | 'income';

export type EntryT<T = number> = {
  id: uuid;
  name: string;
  value: T;
  type: string;
};

export function keyIsExpense(key: string): key is 'fixed' | 'savings' | 'investments' {
  return ['fixed', 'savings', 'investments'].includes(key);
}
