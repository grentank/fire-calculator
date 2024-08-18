import { FinTimeEnum } from '../types/categories';

export const constantNames = [
  'months',
  'inflationCoefficient',
  'investmentsGrowthCoefficient',
  'retirementMonths',
] as const;

export const initConstants = [
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
    text: 'Инфляция % год',
    periodicity: FinTimeEnum.annual,
    value: 7,
    editable: true,
    removable: false,
  },
  {
    id: 'investmentsGrowthCoefficient',
    name: 'investmentsGrowthCoefficient',
    text: 'Рост инвестиций % год',
    periodicity: FinTimeEnum.annual,
    value: 12,
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
  {
    id: 'paycheckIncrease',
    name: 'paycheckIncrease',
    text: 'Рост доходов % год',
    periodicity: FinTimeEnum.monthly,
    value: 5,
    editable: true,
    removable: false,
  },
  {
    id: 'startMonth',
    name: 'startMonth',
    text: 'Начальный месяц',
    periodicity: FinTimeEnum.never,
    value: 0,
    editable: true,
    removable: false,
  },
  {
    id: 'endMonth',
    name: 'endMonth',
    text: 'Конечный месяц',
    periodicity: FinTimeEnum.never,
    value: 36,
    editable: true,
    removable: false,
  },
] as const;

export type ConstantsValuesT = {
  [key in (typeof initConstants)[number]['name']]: number;
};
