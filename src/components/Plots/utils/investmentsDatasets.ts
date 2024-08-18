import { CalculatorType } from '../../../types/categories';
import { extractConstants } from '../../../types/guards';

export default function investmentsDatasets(
  calculator: CalculatorType,
) {
  const {
    investments: investmentsWithInitialValue,
    constants,
    // savings,
    income,
    fixedExpenses,
  } = calculator;
  const {
    investmentsGrowthCoefficient,
    inflationCoefficient,
    months,
    // retirementMonths,
    paycheckIncrease,
  } = extractConstants(constants);

  const initalInvestmentValue = investmentsWithInitialValue[0].value;
  const investments = investmentsWithInitialValue.slice(1);
  const newMonthlyInvestments = investments.reduce(
    (acc, entry) => acc + entry.value,
    0,
  );
  const overallFixedExpenses = fixedExpenses.reduce(
    (acc, entry) => acc + entry.value,
    0,
  );
  const overallMonthlyIncome = income.reduce(
    (acc, entry) => acc + entry.value,
    0,
  );
  const finalResults = {
    totalInvestedWithCapitalization: [initalInvestmentValue],
    totalMonthlySpentOnInvesting: [0],
    noInvestmentGain: [initalInvestmentValue],
    investmentsCapitalization: [0],
    investmentsGain: [0],
    monthlyExpenses: [overallFixedExpenses],
    monthlyIncome: [overallMonthlyIncome],
  };
  // const totalInvestedWithCapitalizationArr: number[] = [newMonthlyInvestments];
  // const noInvestmentGain: number[] = [newMonthlyInvestments];
  for (let index = 1; index < months; index++) {
    const investmentsCapitalization =
      finalResults.totalInvestedWithCapitalization[index - 1] *
      (investmentsGrowthCoefficient / 1200);

    finalResults.investmentsCapitalization.push(
      investmentsCapitalization,
    );

    finalResults.totalInvestedWithCapitalization.push(
      investmentsCapitalization +
        newMonthlyInvestments +
        finalResults.totalInvestedWithCapitalization[index - 1],
    );

    finalResults.totalMonthlySpentOnInvesting.push(
      finalResults.totalMonthlySpentOnInvesting[index - 1] +
        newMonthlyInvestments,
    );

    finalResults.noInvestmentGain.push(
      newMonthlyInvestments +
        finalResults.noInvestmentGain[index - 1],
    );

    finalResults.investmentsGain.push(
      finalResults.totalInvestedWithCapitalization[index] -
        finalResults.noInvestmentGain[index],
    );
    finalResults.monthlyExpenses.push(
      finalResults.monthlyExpenses[index - 1] *
        (1 + inflationCoefficient / 1200),
    );
    finalResults.monthlyIncome.push(
      finalResults.monthlyIncome[index - 1] *
        (1 + paycheckIncrease / 1200),
    );
  }
  return [
    /** ПЕРВЫЕ 3 ДАТАСЕТА - ДЛЯ STACK BAR ЧАРТА */
    {
      label: 'Первичный взнос',
      data: new Array(months).fill(initalInvestmentValue),
      borderWidth: 1,
    },
    {
      label: 'Вложено денег',
      data: finalResults.totalMonthlySpentOnInvesting,
      borderWidth: 1,
    },
    {
      label: 'Кумулятивная капитализация',
      data: finalResults.investmentsGain,
      borderWidth: 1,
    },
    /** СЛЕДУЮЩИЕ ДАТАСЕТЫ ДЛЯ ЛИНЕЙНЫХ ГРАФИКОВ */
    {
      label: 'Вложения',
      data: finalResults.noInvestmentGain,
      borderWidth: 1,
    },
    {
      label: 'Суммарные инвестиции',
      data: finalResults.totalInvestedWithCapitalization,
      borderWidth: 1,
    },
    {
      label: 'Капитализация',
      data: finalResults.investmentsCapitalization,
      borderWidth: 1,
    },
    {
      label: 'Затраты',
      data: finalResults.monthlyExpenses,
      borderWidth: 1,
    },
    {
      label: 'Зарплата',
      data: finalResults.monthlyIncome,
      borderWidth: 1,
    },
  ];
}
