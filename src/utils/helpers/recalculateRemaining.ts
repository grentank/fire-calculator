import { CalculatorState } from '../types/calculator';

export default function recalculateRemaining(calculator: CalculatorState) {
  const { income, fixedExpenses, inflatingCosts, investments, savings } = calculator;
  const totalIncome = income.reduce((acc, curr) => acc + curr.value, 0);
  const totalFixedExpenses = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0);
  const totalInflatingCosts = inflatingCosts.reduce((acc, curr) => acc + curr.value, 0);
  const totalInvestments = investments.reduce((acc, curr) => acc + curr.value, 0);
  const totalSavings = savings.reduce((acc, curr) => acc + curr.value, 0);
  return totalIncome - totalFixedExpenses - totalInflatingCosts - totalInvestments - totalSavings;
}
