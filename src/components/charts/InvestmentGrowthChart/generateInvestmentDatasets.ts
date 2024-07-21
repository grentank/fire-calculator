import { CalculatorState } from '../../../utils/types/calculator';

export default function generateInvestmentDatasets(calculator: CalculatorState) {
  const { investments, savings, annualROI, months } = calculator;
  const dataMonthlyGrowth: number[] = [];
  const dataMonthlyAssets: number[] = [];
  const dataMonthlyAllToSavings: number[] = [];
  const totalMonthlyInvestments = investments.reduce((acc, inv) => acc + inv.value, 0);
  const totalMonthlySavings = savings.reduce((acc, inv) => acc + inv.value, 0);
  for (let index = 0; index < months; index++) {
    // const thisMonthSaving = totalMonthlyInvestments; // + totalMonthlySavings;
    if (index === 0) {
      dataMonthlyAssets.push(totalMonthlyInvestments);
      dataMonthlyGrowth.push(0);
      dataMonthlyAllToSavings.push(totalMonthlyInvestments + totalMonthlySavings);
      continue;
    }
    const growth = dataMonthlyAssets[index - 1] * (annualROI / 12);
    dataMonthlyGrowth.push(growth);
    dataMonthlyAssets.push(dataMonthlyAssets[index - 1] + totalMonthlyInvestments + growth);
    dataMonthlyAllToSavings.push(
      dataMonthlyAllToSavings[index - 1] + totalMonthlySavings + totalMonthlyInvestments,
    );
  }
  const datasets = [
    {
      label: 'Инвестиции',
      data: dataMonthlyAssets,
      borderWidth: 1,
    },
    {
      label: 'Без инвестирования',
      data: dataMonthlyAllToSavings,
      borderWidth: 1,
    },
  ];
  return datasets;
}
