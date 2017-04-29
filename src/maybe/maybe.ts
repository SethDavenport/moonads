import { Callback } from '../utils/callback';
import { Monad } from '../utils/monad';
import { isNil } from '../utils/is-nil';

export abstract class Maybe<T> implements Monad<T> {
  bind: <V>(f: Callback<T, Maybe<V>>) => Maybe<V>;
  map: <V>(f: Callback<T, V>) => Maybe<V>;
  get: () => T;
  fold: <V>(f: Callback<T, V>) => V;
  ap: <V>(fm: Monad<Callback<T, V>>) => Maybe<V>;

  orElse: (m: Maybe<T>) => Maybe<T>;
  orSome: (v: T) => T;

  static some = <V>(value: V): Maybe<V> => Some.of<V>(value);
  static none = <V>(): Maybe<V> => None.of<V>();

  static fromNull = <V>(value?: V): Maybe<V> =>
    null === value || undefined === value ?
    Maybe.none<V>() :
    Maybe.some<V>(value);
}

class Some<T> extends Maybe<T> {
  static of = <V>(value: V) => new Some<V>(value);

  private constructor(private value: T) { super(); }

  bind = <V>(f: Callback<T, Maybe<V>>): Maybe<V> => f(this.value);
  map = <V>(f: Callback<T, V>): Maybe<V> => Maybe.fromNull(f(this.value));
  get = (): T => this.value;
  fold = <V>(f: Callback<T, V>): V => f(this.value);
  ap = <V>(fm: Monad<Callback<T, V>>): Maybe<V> => Some.of<V>(fm.get()(this.value));

  orElse = (m: Maybe<T>): Maybe<T> => m;
  orSome = (value: T): T => this.value;
}

class None<T> extends Maybe<T> {
  private static _singleton = new None<any>();

  static of = <V>() => None._singleton as None<V>

  private constructor() { super(); }

  bind = <V>(f: Callback<T, Maybe<V>>): Maybe<V> => None.of<V>();
  map = <V>(f: Callback<T, V>): Maybe<V> => None.of<V>();
  get = (): T => null;
  fold = <V>(f: Callback<T, V>): V => null;
  ap = <V>(fm: Monad<Callback<T, V>>): Maybe<V> => None.of<V>();

  orElse = (m: Maybe<T>): Maybe<T> => None.of<T>();
  orSome = (value: T): T => value;
}
