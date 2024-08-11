import { v4 as uuidv4 } from 'uuid';
import {
  CalculatorType,
  EntryType,
  FinTimeEnum,
} from '../types/categories';

const initConstants: EntryType[] = [
  {
    id: 'months',
    name: 'months',
    text: 'Месяцы наращивания капитала',
    periodicity: FinTimeEnum.monthly,
    value: 240,
    editable: true,
    removable: false,
  },
  {
    id: 'inflationCoefficient',
    name: 'inflationCoefficient',
    text: 'Инфляция',
    periodicity: FinTimeEnum.annual,
    value: 0.1,
    editable: true,
    removable: false,
  },
  {
    id: 'investmentsGrowthCoefficient',
    name: 'investmentsGrowthCoefficient',
    text: 'Рост инвестиций',
    periodicity: FinTimeEnum.annual,
    value: 0.15,
    editable: true,
    removable: false,
  },
  {
    id: 'retirementMonths',
    name: 'retirementMonths',
    text: 'Месяцы траты капитала',
    periodicity: FinTimeEnum.monthly,
    value: 240,
    editable: true,
    removable: false,
  },
];

const initIncome: EntryType[] = [
  {
    id: uuidv4(),
    name: 'Zarplata',
    text: 'Зарплата',
    periodicity: FinTimeEnum.monthly,
    value: 330000,
    editable: true,
    removable: true,
  },
  {
    id: uuidv4(),
    name: 'Podrabotka',
    text: 'Подработка',
    periodicity: FinTimeEnum.monthly,
    value: 50000,
    editable: true,
    removable: true,
  },
];

const initFixedExpenses: EntryType[] = [
  {
    id: uuidv4(),
    name: 'Ipoteka',
    text: 'Ипотека',
    periodicity: FinTimeEnum.monthly,
    value: 72000,
    editable: true,
    removable: true,
  },
  {
    id: uuidv4(),
    name: 'Prodykty',
    text: 'Продукты',
    periodicity: FinTimeEnum.monthly,
    value: 30000,
    editable: true,
    removable: true,
  },
  {
    id: uuidv4(),
    name: 'Podiski',
    text: 'Подписки (фитнес, телефон)',
    periodicity: FinTimeEnum.monthly,
    value: 12000,
    editable: true,
    removable: true,
  },
  {
    id: uuidv4(),
    name: 'Remont-arenda',
    text: 'Ремонт и аренда',
    periodicity: FinTimeEnum.monthly,
    value: 45000,
    editable: true,
    removable: true,
  },
];

const initSavings: EntryType[] = [
  {
    id: uuidv4(),
    name: 'Podushka',
    text: 'Подушка',
    periodicity: FinTimeEnum.monthly,
    value: 20000,
    editable: true,
    removable: true,
  },
];

const initInvestments: EntryType[] = [
  {
    id: uuidv4(),
    name: 'Indexi',
    text: 'Индексы',
    periodicity: FinTimeEnum.monthly,
    value: 100000,
    editable: true,
    removable: true,
  },
];

export const initCalculator: CalculatorType = {
  income: initIncome,
  fixedExpenses: initFixedExpenses,
  savings: initSavings,
  investments: initInvestments,
  constants: initConstants,
};
