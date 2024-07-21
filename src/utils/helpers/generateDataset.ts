import { EntryT } from '../types/calculator';

type ArgsT = {
  income: EntryT[];
  investments: EntryT[];
  fixed: EntryT[];
  savings: EntryT[];
  months: number;
};

const annualRawROIrate = 0.12;
const annualInflationRate = 0.1;
const annualPaycheckIncrease = 0.05;

export function genExpenses({ fixed, savings, months }: ArgsT) {
  const dataSet: number[] = [];
  const totalMonthlyFixed = fixed.reduce((acc, inv) => acc + inv.value, 0);
  //   const totalMonthlySavings = savings.reduce((acc, inv) => acc + inv.value, 0);
  for (let index = 0; index < months; index++) {
    const newEntry = totalMonthlyFixed * (1 + annualInflationRate / 12) ** index;
    // if (index === 0) {
    //   dataSet.push(newEntry);
    //   continue;
    // }
    dataSet.push(newEntry);
  }
  return dataSet;
}

export function genInvestmentsGrowth() {}

export function genIncome({ income, months }: ArgsT) {
  const dataSet: number[] = [];
  const totalMonthlyIncome = income.reduce((acc, inv) => acc + inv.value, 0);
  for (let index = 0; index < months; index++) {
    if (index === 0) {
      dataSet.push(totalMonthlyIncome);
      continue;
    }
    dataSet.push(dataSet[index - 1] + (totalMonthlyIncome * annualPaycheckIncrease) / 12);
  }
  return dataSet;
}

export function investmentsGrowth({ savings, investments, months }: ArgsT) {
  // const roiWithoutInflation = rawROIrate - inflationRate;
  const dataSet: number[] = [];
  const monthlyGrowth: number[] = [0];
  const totalMonthlyInvestments = investments.reduce((acc, inv) => acc + inv.value, 0);
  const totalMonthlySavings = savings.reduce((acc, inv) => acc + inv.value, 0);
  for (let index = 0; index < months; index++) {
    const newEntry = totalMonthlyInvestments + totalMonthlySavings;
    if (index === 0) {
      dataSet.push(newEntry);
      continue;
    }
    const growth = dataSet[index - 1] * (annualRawROIrate / 12);
    monthlyGrowth.push(growth);
    dataSet.push(dataSet[index - 1] + newEntry + growth);
  }
  return { totalInvestments: dataSet, monthlyGrowth };
}

export function simpleSavings({ savings, investments, months }: ArgsT) {
  const dataSet: number[] = [];
  const totalMonthlyInvestments = investments.reduce((acc, inv) => acc + inv.value, 0);
  const totalMonthlySavings = savings.reduce((acc, inv) => acc + inv.value, 0);
  for (let index = 0; index < months; index++) {
    const newEntry = totalMonthlyInvestments + totalMonthlySavings;
    if (index === 0) {
      dataSet.push(newEntry);
      continue;
    }
    dataSet.push(dataSet[index - 1] + newEntry);
  }
  return dataSet;
}
