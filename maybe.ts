import { Callback } from './callback';
import { Monad } from './monad';
import { None } from './none';
import { Some } from './some';
import { isNil } from './is-nil';

export abstract class Maybe<T> implements Monad<T> {
  static some = <V>(value: V): Some<V> => Some.of<V>(value);
  static none = <V>(): None<V> => None.of<V>();

  static fromNull = <V>(value?: V): Maybe<V> =>
    null === value || undefined === value ?
    Maybe.none<V>() :
    Maybe.some<V>(value);

  bind: <V>(f: Callback<T, Maybe<V>>) => Maybe<V>;
  map: <V>(f: Callback<T, V>) => Maybe<V>;
  get: () => T;
  fold: <V>(f: Callback<T, V>) => V;

  orElse: (m: Maybe<T>) => Maybe<T>;
  orSome: (v: T) => T;
}
