import { Callback } from '../utils/callback';
import { Functor } from '../functor';

export interface Apply<T> extends Functor<T> {
  ap: <V, AV extends Apply<V>>(fm: Apply<Callback<T, V>>) => AV;
}
