import {
  constantNames,
  ConstantsValuesT,
} from '../utils/initConstants';
import {
  EntryType,
  FINANCIAL_CATEGORIES,
  FinCategoryT,
} from './categories';

export default function isFinCategory(
  category: string,
): category is FinCategoryT {
  return !!FINANCIAL_CATEGORIES.find((cat) => cat.name === category);
}

export function extractConstants(
  constants: EntryType[],
): ConstantsValuesT {
  for (let index = 0; index < constantNames.length; index++) {
    const constName = constantNames[index];
    const constObj = constants[index];
    if (constObj.name !== constName)
      throw new Error(`Wrong constant name: ${constName}`);
  }
  return constants.slice(0, 7).reduce(
    (acc, constObj) => ({
      ...acc,
      [constObj.name]: constObj.value,
    }),
    {},
  ) as ConstantsValuesT;
}
