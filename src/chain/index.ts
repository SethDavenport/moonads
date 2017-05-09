import { Callback } from '../utils/callback';
import { Apply } from '../apply';

export interface Chain<T> {
  bind: <V, CV extends Chain<V>>(f: Callback<T, CV>) => CV;
}
