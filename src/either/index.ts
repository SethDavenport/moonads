import { Transform } from '../utils/transform';
import { isNil } from '../utils/is-nil';
import { Monad } from '../monad';
import { Maybe } from '../maybe';

// Right-biased.
export abstract class Either<T> extends Monad<T> {
  abstract readonly bind: <V>(f: Transform<T, Either<V>>) => Either<V>
  abstract readonly map: <V>(f: Transform<T, V>) => Either<V>
  abstract readonly get: () => T
  abstract readonly fold: <V>(f: Transform<T, V>) => V
  abstract readonly ap: <V>(fm: Either<Transform<T, V>>) => Either<T>

  abstract readonly isRight: () => boolean
  abstract readonly isLeft: () => boolean
  abstract readonly toMaybe: () => Maybe<T>

  static readonly left = <L>(value: L) => Left.of(value);
  static readonly right = <R>(value: R) => Right.of(value);
  static readonly fromNillable = <V>(value: V) => isNil(value) ?
    Left.of(value) :
    Right.of(value)

  static readonly try = <T, V>(f: Transform<T, V>) =>
    (value: T): Either<V | Error> => {
      try {
        return Right.of(f(value));
      } catch (error) {
        return Left.of(error);
      }
    }
}

export class Left<T> extends Either<T> {
  static readonly of = <V>(value: V): Left<V> => new Left<V>(value)

  private constructor(value: T) {
    super(value);
  }

  readonly bind = <V>(f: Transform<T, Either<V>>): Either<T> => this
  readonly map = <V>(f: Transform<T, V>): Either<T> => this
  readonly get = (): T => this.value
  readonly fold = <V>(f: Transform<T, V>): T => this.value
  readonly ap = <V>(fm: Either<Transform<T, V>>): Either<T> => this

  readonly isRight = (): boolean => false
  readonly isLeft = (): boolean => true
  readonly toMaybe = (): Maybe<T> => Maybe.of(null)
}

export class Right<T> extends Either<T> {
  static of = <V>(value: V): Right<V> => new Right<V>(value)

  private constructor(value: T) {
    super(value);
  }

  readonly bind = <V>(f: Transform<T, Either<V>>): Either<V> => f(this.value)
  readonly map = <V>(f: Transform<T, V>): Either<V> => Right.of(f(this.value))
  readonly get = (): T => this.value
  readonly fold = <V>(f: Transform<T, V>): V => f(this.value)
  readonly ap = <V>(fm: Either<Transform<T, V>>): Either<V> => fm.map(f => f(this.value))

  readonly isRight = (): boolean => true
  readonly isLeft = (): boolean => false
  readonly toMaybe = (): Maybe<T> => Maybe.of(this.value)
}
