import { Callback } from '../utils/callback';
import { Monad } from '../monad';
import { Maybe } from '../maybe';

// Right-biased.
export abstract class Either<T> extends Monad<T> {
  abstract bind: <V>(f: Callback<T, Either<V>>) => Either<V>
  abstract map: <V>(f: Callback<T, V>) => Either<V>
  abstract get: () => T
  abstract fold: <V>(f: Callback<T, V>) => V
  abstract ap: <V>(fm: Either<Callback<T, V>>) => Either<T>

  abstract isRight: () => boolean
  abstract isLeft: () => boolean
  abstract toMaybe: () => Maybe<T>

  static left = <L>(value: L) => Left.of(value);
  static right = <R>(value: R) => Right.of(value);
}

export class Left<T> extends Either<T> {
  static of = <V>(value: V): Left<V> => new Left<V>(value)

  private constructor(value: T) {
    super(value);
  }

  bind = <V>(f: Callback<T, Either<V>>): Either<T> => this
  map = <V>(f: Callback<T, V>): Either<T> => this
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): T => this.value
  ap = <V>(fm: Either<Callback<T, V>>): Either<T> => this

  isRight = (): boolean => false
  isLeft = (): boolean => true
  toMaybe = (): Maybe<T> => Maybe.of(null)
}

export class Right<T> extends Either<T> {
  static of = <V>(value: V): Right<V> => new Right<V>(value)

  private constructor(value: T) {
    super(value);
  }

  bind = <V>(f: Callback<T, Either<V>>): Either<V> => f(this.value)
  map = <V>(f: Callback<T, V>): Either<V> => Right.of(f(this.value))
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): V => f(this.value)
  ap = <V>(fm: Either<Callback<T, V>>): Either<V> => fm.map(f => f(this.value))

  isRight = (): boolean => true
  isLeft = (): boolean => false
  toMaybe = (): Maybe<T> => Maybe.of(this.value)
}
