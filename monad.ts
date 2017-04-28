import { Callback } from './callback';
import { Functor } from './functor';

export interface Monad<T> extends Functor<T> {
  bind: <V>(f: Callback<T, Monad<V>>) => Monad<V>;
  map: <V>(f: Callback<T, V>) => Monad<V>;
  get: () => T;
  fold: <V>(f: Callback<T, V>) => V;
  ap: <V>(fm: Monad<Callback<T, V>>) => Monad<V>;
}
