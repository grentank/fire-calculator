import { CalculatorState } from '../../../utils/types/calculator';

export default function generateFIREdatasets(calculator: CalculatorState) {
  const {
    investments,
    annualROI,
    income,
    annualPaycheckIncrease,
    fixedExpenses,
    inflatingCosts,
    annualInflationRate,
    months,
  } = calculator;
  const dataMonthlyIncome: number[] = [];
  const dataMonthlyGrowth: number[] = [];
  const dataMonthlyAssets: number[] = [];
  const dataMonthlyFixedExpenses: number[] = [];
  const dataMonthlyInflatingCosts: number[] = [];
  const totalMonthlyIncome = income.reduce((acc, inv) => acc + inv.value, 0);
  const totalMonthlyInvestments = investments.reduce((acc, inv) => acc + inv.value, 0);
  const totalMonthlyFixedExpenses = fixedExpenses.reduce((acc, inv) => acc + inv.value, 0);
  const totalMonthlyInflatingCosts = inflatingCosts.reduce((acc, inv) => acc + inv.value, 0);
  for (let index = 0; index < months; index++) {
    if (index === 0) {
      dataMonthlyIncome.push(totalMonthlyIncome);
      dataMonthlyAssets.push(totalMonthlyInvestments);
      dataMonthlyFixedExpenses.push(totalMonthlyFixedExpenses);
      dataMonthlyInflatingCosts.push(totalMonthlyInflatingCosts);
      dataMonthlyGrowth.push(0);
      continue;
    }
    const growth = dataMonthlyAssets[index - 1] * (annualROI / 12);
    dataMonthlyGrowth.push(growth);
    dataMonthlyIncome.push(dataMonthlyIncome[index - 1] * (1 + annualPaycheckIncrease / 12));
    dataMonthlyAssets.push(dataMonthlyAssets[index - 1] + totalMonthlyInvestments + growth);
    dataMonthlyFixedExpenses.push(totalMonthlyFixedExpenses);
    dataMonthlyInflatingCosts.push(
      dataMonthlyInflatingCosts[index - 1] * (1 + annualInflationRate / 12),
    );
  }
  const datasets = [
    {
      label: 'Рост дохода',
      data: dataMonthlyIncome,
      borderWidth: 1,
    },
    {
      label: 'Доход с инвестиций',
      data: dataMonthlyGrowth,
      borderWidth: 1,
    },
    {
      label: 'Расходы',
      data: dataMonthlyFixedExpenses.map((val, ind) => val + dataMonthlyInflatingCosts[ind]),
      borderWidth: 1,
    },
  ];
  return datasets;
}
