import { Callback } from '../utils/callback';

export interface Functor<T> {
  map: <V, FV extends Functor<V>>(f: Callback<T, V>) => FV;
}
