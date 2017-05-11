import { Transform } from '../utils/transform';
import { Monad } from '../monad';
import { isNil } from '../utils/is-nil';

export abstract class Maybe<T> extends Monad<T> {
  abstract readonly bind: <V>(f: Transform<T, Maybe<V>>) => Maybe<V>;
  abstract readonly map: <V>(f: Transform<T, V>) => Maybe<V>;
  abstract readonly get: () => T;
  abstract readonly fold: <V>(f: Transform<T, V>) => V;
  abstract readonly ap: <V>(fm: Maybe<Transform<T, V>>) => Maybe<V>;

  abstract readonly orElse: (m: Maybe<T>) => Maybe<T>;
  abstract readonly orSome: (value: T) => T;
  abstract readonly isNone: () => boolean;

  static readonly of = <V>(value: V) => (isNil(value) ?
    None.of<V>() :
    Some.of<V>(value)) as Maybe<V>;
}

class Some<T> extends Maybe<T> {
  static readonly of = <V>(value: V) => new Some<V>(value);

  readonly bind = <V>(f: Transform<T, Maybe<V>>): Maybe<V> => f(this.value);
  readonly map = <V>(f: Transform<T, V>): Maybe<V> => Maybe.of(f(this.value));
  readonly get = (): T => this.value;
  readonly fold = <V>(f: Transform<T, V>): V => f(this.value);
  readonly ap = <V>(fm: Maybe<Transform<T, V>>): Maybe<V> =>
    fm.map(f => f(this.value));

  readonly orElse = (m: Maybe<T>): Maybe<T> => m;
  readonly orSome = (value: T): T => this.value;
  readonly isNone = (): boolean => false;

  private constructor(value: T) { super(value); }
}

class None<T> extends Maybe<T> {
  private static readonly _singleton = new None<any>();

  static readonly of = <V>() => None._singleton as None<V>

  private constructor() { super(null); }

  readonly bind = <V>(f: Transform<T, Maybe<V>>): Maybe<V> => None.of<V>();
  readonly map = <V>(f: Transform<T, V>): Maybe<V> => None.of<V>();
  readonly get = (): T => null;
  readonly fold = <V>(f: Transform<T, V>): V => null;
  readonly ap = <V>(fm: Maybe<Transform<T, V>>): Maybe<V> => None.of<V>();

  readonly orElse = (m: Maybe<T>): Maybe<T> => None.of<T>();
  readonly orSome = (value: T): T => value;
  readonly isNone = (): boolean => true;
}
