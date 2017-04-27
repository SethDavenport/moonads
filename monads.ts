// A function that takes a value of type T and returns a Monad with value
// type V.
type WrappingCallback<T, V> = (T) => Monad<V>;

// A function that takes a value of type T an returns a value of type V.
type RawCallback<T, V> = (T) => V;

// Is it worth making a functor interface?
interface Monad<T> {
  bind: <V>(f: WrappingCallback<T, V>) => Monad<V>;
  flatMap: <V>(f: WrappingCallback<T, V>) => Monad<V>; // Same thing as bind
  chain: <V>(f: WrappingCallback<T, V>) => Monad<V>; // Is this where .chain lives?

  map: <V>(f: RawCallback<T, V>) => Monad<V>;

  get: () => T;
  fold: <V>(f: RawCallback<T, V>) => V,
}

class Identity<T> implements Monad<T> {
  private constructor(private value: T) {}
  
  static of = <V>(value: V): Identity<V> => new Identity<V>(value);
  static unit = Identity.of; // What Monet calls of.

  bind = <V>(f: WrappingCallback<T, V>): Monad<V> => f(this.value)
  flatMap = this.bind
  chain = this.bind

  map = <V>(f: RawCallback<T, V>): Monad<V> => Identity.of(f(this.value))

  get = (): T => this.value
  fold = <V>(f: RawCallback<T, V>): V => f(this.value);
}

export class None<T> implements Monad<T> {
  private static _singleton = new None<any>();

  static of = <T>() => None._singleton as None<T>
  static unit = None.of

  bind = <V>(f: WrappingCallback<T, V>): Monad<V> => None.of<V>()
  flatMap = this.bind
  chain = this.bind

  map = <V>(f: RawCallback<T, V>): Monad<V> => None.of<V>()

  get = (): T => null
  fold: <V>(f: RawCallback<T, V>) => null
}

export class Maybe<T> implements Monad<T> {
  static of = <V>(value: V): Monad<V> =>
    value === null || value === undefined ?
    None.of<V>() :
    Identity.of(value);

  static unit = Maybe.of

  // TODO: operations.
}

// TODO: either.
// TODO: lists and stuff
// TODO: future

const getPercent = (wrongCount: number, correctCount: number) =>
  Identity.of(wrongCount + correctCount)
    .map(totalCount => correctCount / totalCount)
    .map(ratio => Math.round(100 * ratio))
    .map(percent => `${percent}%`)
    .get();

// Making it more readable instead of ramda/promise-style soup.
const toRatioWith = correctCount => totalCount => correctCount / totalCount;
const toPercentage = ratio => Math.round(100 * ratio);
const toDisplayString = percentage => `{percentage}%`;

const getPercentWithNamedOperations = (wrongCount: number, correctCount: number) =>
  Identity.of(wrongCount + correctCount)
    .map(toRatioWith(correctCount))
    .map(toPercentage)
    .map(toDisplayString)
    .get();

// So... is a promise a monad? No... because .then acts like both map
// and flatmap. And there is no .get (unless you count await).
/*
const qGetPercent = async (wrongCount: number, correctCount: number) =>
  await Promise.resolve(wrongCount + correctCount)
    .then(totalCount => correctCount / totalCount)
    .then(ratio => Math.round(100 * ratio))
    .then(percent => `${percent}%`)
    // No easy way to unbox a promise... hence await.
*/

console.log('getPercent:', getPercent(3, 4));
console.log('getPercentWithNamedOperations:', getPercent(3, 4));
//console.log('qGetPercent:', qGetPercent(3, 4));
