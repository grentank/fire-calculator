import { CalculatorType } from '../../../types/categories';

export default function generateRows({
  income,
  fixedExpenses,
  investments,
  savings,
}: CalculatorType) {
  const totalIncome = income.reduce((a, v) => a + v.value, 0);
  const totalInvestments = investments
    .slice(1)
    .reduce((a, v) => a + v.value, 0);
  const totalExpenses = fixedExpenses.reduce(
    (a, v) => a + v.value,
    0,
  );
  const totalSavings = savings.reduce((a, v) => a + v.value, 0);
  const left =
    totalIncome - totalInvestments - totalExpenses - totalSavings;
  const expensesPercentage = (totalExpenses * 100) / totalIncome;
  const investmentsPercentage =
    (totalInvestments * 100) / totalIncome;
  const savingsPercentage = (totalSavings * 100) / totalIncome;
  const leftoverPercentage = (left * 100) / totalIncome;
  const rows = [
    {
      name: 'Доходы',
      value: totalIncome,
      percentage: '100%',
      recommendation: '100%',
    },
    {
      name: 'Расходы',
      value: totalExpenses,
      percentage: `${expensesPercentage.toFixed()}%`,
      recommendation:
        (expensesPercentage <= 65 ? '✅' : '❌') + 'Не более 65%',
    },
    {
      name: 'Инвестиции',
      value: totalInvestments,
      percentage: `${investmentsPercentage.toFixed()}%`,
      recommendation:
        (expensesPercentage >= 10 ? '✅' : '❌') + 'Не менее 10%',
    },
    {
      name: 'Сбережения',
      value: totalSavings,
      percentage: `${savingsPercentage.toFixed()}%`,
      recommendation:
        (savingsPercentage >= 5 ? '✅' : '❌') + 'Не менее 5%',
    },
    {
      name: 'Тратить на себя',
      value: left,
      percentage: `${leftoverPercentage.toFixed()}%`,
      recommendation:
        (leftoverPercentage >= 20 && leftoverPercentage <= 35
          ? '✅'
          : '❌') + 'В диапазоне 20-35%',
    },
  ];
  return rows;
}
