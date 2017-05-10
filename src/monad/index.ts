import { Transform } from '../utils/transform';
import { Setoid } from '../setoid';
import { Chain } from '../chain';
import { isNil } from '../utils/is-nil';
import * as eq from 'lodash.eq';

// Applicative is implied in this model due to the static nature
// of .of().
export abstract class Monad<T> implements Setoid<T>, Chain<T> {
  abstract readonly bind: <V, MV extends Monad<V>>(f: Transform<T, MV>) => MV;
  abstract readonly map: <V, MV extends Monad<V>>(f: Transform<T, V>) => MV;
  abstract readonly get: () => T;
  abstract readonly fold: <V>(f: Transform<T, V>) => V;
  abstract readonly ap: <V, MV extends Monad<V>>(fm: Monad<Transform<T, V>>) => MV;

  protected constructor(protected value: T) {}

  readonly equals = <M extends Monad<T>>(m: M): boolean =>
    !isNil(m) &&
    this.constructor === m.constructor &&
    eq(this.get(), m.get());
}
