import { Callback } from './callback';
import { Monad } from './monad';
import { Maybe } from './maybe';

export class None<T> extends Maybe<T> {
  private constructor() { super(); }
  private static _singleton = new None<any>();

  static of = <V>() => None._singleton as None<V>

  bind = <V>(f: Callback<T, Maybe<V>>): Maybe<V> => None.of<V>();
  map = <V>(f: Callback<T, V>): Maybe<V> => None.of<V>();
  get = (): T => null;
  fold = <V>(f: Callback<T, V>): V => null;
  ap = <V>(fm: Monad<Callback<T, V>>): Maybe<V> => None.of<V>();

  orElse = (m: Maybe<T>): Maybe<T> => None.of<T>();
  orSome = (value: T): T => value;
}
