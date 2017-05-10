import { Callback } from '../utils/callback';
import { Monad } from '../monad';
import { Maybe } from '../maybe';

// Right-biased.
export abstract class Either<L, R> extends Monad<R> {
  abstract bind: <V>(f: Callback<L, Either<L, V>>) => Either<L, V>
  abstract map: <V>(f: Callback<L, V>) => Either<L, V>
  abstract get: () => R
  abstract fold: <V>(f: Callback<R, V>) => V
  abstract ap: <V>(fm: Either<L, Callback<R, V>>) => Either<L, V>

  abstract isRight: () => boolean
  abstract isLeft: () => boolean
  abstract toMaybe: () => Maybe<R>

  static left = <V>(value: V) => Left.of(value);
  static right = <V>(value: V) => Right.of(value);
}

export class Left<T> extends Either<T, any> {
  static of = <V>(value: V): Left<V> => new Left<V>(value)

  private constructor(value: T) {
    super(value);
  }

  bind = <V>(f: Callback<T, Either<T, V>>): Either<T, any> => this
  map = <V>(f: Callback<T, V>): Either<T, any> => this
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): T => this.value
  ap = <V>(fm: Either<T, Callback<any, V>>): Either<T, any> => this

  isRight = (): boolean => false
  isLeft = (): boolean => true
  toMaybe = (): Maybe<T> => Maybe.of(null)
}

export class Right<T> extends Either<any, T> {
  static of = <V>(value: V): Right<V> => new Right<V>(value)

  private constructor(value: T) {
    super(value);
  }

  bind = <V>(f: Callback<T, Either<any, V>>): Either<any, V> => f(this.value)
  map = <V>(f: Callback<T, V>): Either<any, V> => Right.of(f(this.value))
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): V => f(this.value)
  ap = <V>(fm: Either<any, Callback<T, V>>): Either<any, V> => fm.map(f => f(this.value))

  isRight = (): boolean => true
  isLeft = (): boolean => false
  toMaybe = (): Maybe<T> => Maybe.of(this.value)
}
