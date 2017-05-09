import { Callback } from '../utils/callback';
import { Monad } from '../monad';

/**
 * Simply wraps a value in a monadic interface.
 *
 * @typeparam T The type of the wrapped value.
 */
export class Identity<T> extends Monad<T> {
  static of = <V>(value: V): Identity<V> => new Identity<V>(value);

  private constructor(value: T) {
    super(value);
  }

  bind = <V>(f: Callback<T, Identity<V>>): Identity<V> => f(this.value);
  map = <V>(f: Callback<T, V>): Identity<V> => Identity.of(f(this.value))
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): V => f(this.value);
  ap = <V>(fm: Identity<Callback<T, V>>): Identity<V> =>
    fm.map(f => f(this.value));
}
