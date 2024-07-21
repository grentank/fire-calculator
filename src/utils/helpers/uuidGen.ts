import { v4 } from 'uuid';
import { z } from 'zod';

export type uuid = string;

export default function uuidv4(): uuid {
  return z.string().uuid().parse(v4());
}
