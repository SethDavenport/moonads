import { Transform } from '../utils/transform';
import { Apply } from '../apply';

export interface Chain<T> {
  readonly bind: <V, CV extends Chain<V>>(f: Transform<T, CV>) => CV;
}
