import { Transform } from '../utils/transform';
import { Monad } from '../monad';

/**
 * Simply wraps a value in a monadic interface.
 *
 * @typeparam T The type of the wrapped value.
 */
export class Identity<T> extends Monad<T> {
  static readonly of = <V>(value: V): Identity<V> => new Identity<V>(value);

  private constructor(value: T) {
    super(value);
  }

  readonly bind = <V>(f: Transform<T, Identity<V>>): Identity<V> => f(this.value);
  readonly map = <V>(f: Transform<T, V>): Identity<V> => Identity.of(f(this.value))
  readonly get = (): T => this.value
  readonly fold = <V>(f: Transform<T, V>): V => f(this.value);
  readonly ap = <V>(fm: Identity<Transform<T, V>>): Identity<V> =>
    fm.map(f => f(this.value));
}
