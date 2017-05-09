import { Callback } from '../utils/callback';
import { Setoid } from '../setoid';
import { Chain } from '../chain';
import { isNil } from '../utils/is-nil';
import * as eq from 'lodash.eq';

// Applicative is implied in this model due to the static nature
// of .of().
export abstract class Monad<T> implements Setoid<T>, Chain<T> {
  bind: <V, MV extends Monad<V>>(f: Callback<T, MV>) => MV;
  map: <V, MV extends Monad<V>>(f: Callback<T, V>) => MV;
  get: () => T;
  fold: <V>(f: Callback<T, V>) => V;
  ap: <V, MV extends Monad<V>>(fm: Monad<Callback<T, V>>) => MV;

  protected constructor(protected value: T) {}

  equals = <M extends Monad<T>>(m: M): boolean =>
    !isNil(m) &&
    this.constructor === m.constructor &&
    eq(this.get(), m.get());
}
