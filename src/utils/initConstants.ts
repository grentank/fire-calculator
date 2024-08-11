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
] as const;

export type ConstantsValuesT = {
  [key in (typeof initConstants)[number]['name']]: number;
};
