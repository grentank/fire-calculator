import { CalculatorType } from '../types/categories';

export default function calculateRemaining(
  calculator: CalculatorType,
): number {
  const { income, fixedExpenses, investments, savings } = calculator;

  return (
    income.reduce((acc, entry) => acc + entry.value, 0) -
    fixedExpenses.reduce((acc, entry) => acc + entry.value, 0) -
    investments.reduce((acc, entry) => acc + entry.value, 0) -
    savings.reduce((acc, entry) => acc + entry.value, 0)
  );
}
