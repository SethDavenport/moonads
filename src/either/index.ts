import { Callback } from '../utils/callback';
import { Monad } from '../utils/monad';

// type Either<T, V> = Left<T> | Right<V>;

/*
// Right-biased.
export class Either<T> implements Monad<T> {
  //constructor(private left: Monad<T>, private right: Monad<T>) {}

  static left = <V>(value: V) => new Either(Left.of(value), None.of<V>());
  static right = <V>(value: V) => new Either(None.of<V>(), Right.of(value));

  bind: <V>(f: Callback<T, Either<V>>) => Either<V>;
  map: <V>(f: Callback<T, V>) => Left<T> | Right<V>;
  get: () => T;
  fold: <V>(f: Callback<T, V>) => V;
  ap: <V>(fm: Monad<Callback<T, V>>) => Either<V>;
}


// TODO: Figure out a type-safe way to reduce redundancy between left, right,
// identity, some, and none?
class Left<T> implements Monad<T> {
  private constructor(private value: T) {}

  static of = <V>(value: V): Left<V> => new Left<V>(value);

  // Left short circuits all the ops.  Unfortunately this means
  // we're returning types of T instead of types of V which
  // is inconsistent with Right...
  bind = <V>(f: Callback<T, Either<T, V>>): Left<T> => this;
  map = <V>(f: Callback<T, V>): Left<T> => this;
  get = (): T => this.value;
  fold = <V>(f: Callback<T, V>): T => this.value;
  ap = <V>(fm: Either<Callback<T, V>>): Left<T> => this;
}

class Right<T> implements Monad<T> {
  private constructor(private value: T) {}

  static of = <V>(value: V): Right<V> => new Right<V>(value);
}
*/
