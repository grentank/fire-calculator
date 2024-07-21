import { charMap } from './charMap';

export default function transliterate(str: string): string {
  return str
    .split('')
    .map((char) => (char in charMap ? charMap[char] : char))
    .join('');
}
