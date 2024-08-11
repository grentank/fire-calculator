import { FINANCIAL_CATEGORIES, FinCategoryT } from './categories';

export default function isFinCategory(
  category: string,
): category is FinCategoryT {
  return !!FINANCIAL_CATEGORIES.find((cat) => cat.name === category);
}
