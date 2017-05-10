export interface Setoid<T> {
  readonly equals: <S extends Setoid<T>>(s: S) => boolean
}
