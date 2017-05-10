import { Transform } from '../utils/transform';

export interface Functor<T> {
  readonly map: <V, FV extends Functor<V>>(f: Transform<T, V>) => FV;
}
