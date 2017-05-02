import { Callback } from '../utils/callback';

export interface Functor<T> {
  // If only typescript supported generified 'polymorphic this'.
  // I could do
  //   map: <V>(f: Callback<T, V>) => this<V>;
  // ... and not have to redefine map on subtypes of Functor.
  // https://github.com/Microsoft/TypeScript/issues/6223
  map: <V>(f: Callback<T, V>) => Functor<V>;
}
