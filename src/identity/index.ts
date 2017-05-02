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

  /**
   * Applies a function to this instance's wrapped value. The given
   * function is expected to wrap its result in another Identity monad.
   *
   * @typeparam V The type of the wrapped value returned by f.
   * @param f A function that accepts the identity's value and returns a derivative
   *   Identity instance.
   * @return A new Identity representing the result of f applied to this instance's
   *   value.
   */
  bind = <V>(f: Callback<T, Identity<V>>): Identity<V> => f(this.value);

  map = <V>(f: Callback<T, V>): Identity<V> => Identity.of(f(this.value))
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): V => f(this.value);
  ap = <V>(fm: Identity<Callback<T, V>>): Identity<V> => Identity.of(fm.get()(this.value));
}
