import { Callback } from '../utils/callback';
import { Monad } from '../utils/monad';

export class Identity<T> implements Monad<T> {
  static of = <V>(value: V): Identity<V> => new Identity<V>(value);

  private constructor(private value: T) {}

  bind = <V>(f: Callback<T, Identity<V>>): Identity<V> => f(this.value);
  map = <V>(f: Callback<T, V>): Identity<V> => Identity.of(f(this.value))
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): V => f(this.value);
  ap = <V>(fm: Identity<Callback<T, V>>): Identity<V> => Identity.of(fm.get()(this.value));
}
