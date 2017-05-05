import { Callback } from '../utils/callback';
import { Monad } from '../monad';
import { isNil } from '../utils/is-nil';

export abstract class Maybe<T> extends Monad<T> {
  static of = <V>(value: V) => (isNil(value) ?
    None.of<V>():
    Some.of<V>(value)) as Maybe<V>;

  bind: <V>(f: Callback<T, Maybe<V>>) => Maybe<V>;
  map: <V>(f: Callback<T, V>) => Maybe<V>;
  get: () => T;
  fold: <V>(f: Callback<T, V>) => V;
  ap: <V>(fm: Monad<Callback<T, V>>) => Maybe<V>;

  orElse: (m: Maybe<T>) => Maybe<T>;
  orSome: (value: T) => T;
  isNone: () =>boolean;
}

class Some<T> extends Maybe<T> {
  static of = <V>(value: V) => new Some<V>(value);

  private constructor(value: T) { super(value); }

  bind = <V>(f: Callback<T, Maybe<V>>): Maybe<V> => f(this.value);
  map = <V>(f: Callback<T, V>): Maybe<V> => Maybe.of(f(this.value));
  get = (): T => this.value;
  fold = <V>(f: Callback<T, V>): V => f(this.value);
  ap = <V>(fm: Monad<Callback<T, V>>): Maybe<V> => Some.of<V>(fm.get()(this.value));

  orElse = (m: Maybe<T>): Maybe<T> => m;
  orSome = (value: T): T => this.value;
  isNone = (): boolean => false;
}

class None<T> extends Maybe<T> {
  private static _singleton = new None<any>();

  static of = <V>() => None._singleton as None<V>

  private constructor() { super(null); }

  bind = <V>(f: Callback<T, Maybe<V>>): Maybe<V> => None.of<V>();
  map = <V>(f: Callback<T, V>): Maybe<V> => None.of<V>();
  get = (): T => null;
  fold = <V>(f: Callback<T, V>): V => null;
  ap = <V>(fm: Monad<Callback<T, V>>): Maybe<V> => None.of<V>();

  orElse = (m: Maybe<T>): Maybe<T> => None.of<T>();
  orSome = (value: T): T => value;
  isNone = (): boolean => true;
}
