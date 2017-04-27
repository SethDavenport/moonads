import { Callback } from './callback';

export interface Functor<T> {
  map: <V>(f: Callback<T, V>) => Functor<V>;
}
