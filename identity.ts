import { Callback } from './callback';
import { Monad } from './monad';

export class Identity<T> implements Monad<T> {
  private constructor(private value: T) {}
  
  static of = <V>(value: V): Identity<V> => new Identity<V>(value);

  bind = <V>(f: Callback<T, Monad<V>>): Monad<V> => f(this.value);
  map = <V>(f: Callback<T, V>): Monad<V> => Identity.of(f(this.value))
  get = (): T => this.value
  fold = <V>(f: Callback<T, V>): V => f(this.value);
}
