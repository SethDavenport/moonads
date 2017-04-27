import { Callback } from './callback';
import { Maybe } from './maybe';

export class Some<T> extends Maybe<T> {
  private constructor(private value: T) { super(); }

  static of = <V>(value: V) => new Some<V>(value);

  bind = <V>(f: Callback<T, Maybe<V>>): Maybe<V> => f(this.value);
  map = <V>(f: Callback<T, V>): Maybe<V> => Maybe.fromNull(f(this.value));
  get = (): T => this.value;
  fold = <V>(f: Callback<T, V>): V => f(this.value);
}
