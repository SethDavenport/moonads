import { Monad } from '../monad';
import { Transform } from '../utils/transform';

export type NodeStyleCallback<T> = (err, result: T) => void;

export type AsyncOperation<T> = (
  reject: (any) => void,
  resolve: (T) => void) => void;

export class Future<T> extends Monad<T> {
  private constructor(private operation: AsyncOperation<T>) {
    super(null);
  }

  readonly fork: AsyncOperation<T> = this.operation

  readonly map = <V>(f: Transform<T, V>): Future<V> =>
    Future.of(<AsyncOperation<V>>((reject, resolve) => this.fork(
      reject,
      v => f(v))))

  readonly bind = <V>(f: Transform<T, Future<V>>): Future<V> =>
    Future.of(<AsyncOperation<V>>((reject, resolve) => this.fork(
      reject,
      v => f(resolve(v)).fork(
        reject,
        x => resolve(x)))))

  readonly ap = <V>(fm: Future<Transform<T, V>>): Future<V> =>
    fm.map(f => f(this.value));

  // Don't make much sense for async operations?
  readonly get = <V>() => null;
  readonly fold = <V>(f: Transform<T, V>) => null;

  readonly toPromise = (): Promise<T> => new Promise((resolve, reject) =>
    this.fork(reject, resolve));

  static readonly of = <V, E>(operation: AsyncOperation<V>): Future<V> =>
    new Future(operation);

  static readonly fromPromise = <V>(promise: Promise<V>): Future<V> =>
    new Future<V>((reject, resolve) => promise.then(resolve, reject));
}
