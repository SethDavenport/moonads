import { Transform } from '../utils/transform';
import { Functor } from '../functor';

export interface Apply<T> extends Functor<T> {
  readonly ap: <V, AV extends Apply<V>>(fm: Apply<Transform<T, V>>) => AV;
}
