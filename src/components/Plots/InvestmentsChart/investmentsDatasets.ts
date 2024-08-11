import { CalculatorT } from '../../../types/calculator';

export default function investmentsDatasets(calculator: CalculatorT) {
  const { investments, months, annualInvestmentRate } = calculator;
  const newMonthlyInvestments = investments.reduce(
    (acc, entry) => acc + entry.value,
    0,
  );
  const totalInvestedArr: number[] = [newMonthlyInvestments];
  const noInvestmentGain: number[] = [newMonthlyInvestments];
  for (let index = 1; index < months; index++) {
    const growth =
      totalInvestedArr[index - 1] * (annualInvestmentRate / 12);
    totalInvestedArr.push(
      totalInvestedArr[index - 1] + growth + newMonthlyInvestments,
    );
    noInvestmentGain.push(
      noInvestmentGain[index - 1] + newMonthlyInvestments,
    );
  }
  return [
    {
      label: 'Суммарные инвестиции',
      data: totalInvestedArr,
      borderWidth: 1,
    },
    {
      label: 'Без роста процентов',
      data: noInvestmentGain,
      borderWidth: 1,
    },
  ];
}
