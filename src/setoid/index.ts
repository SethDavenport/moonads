export interface Setoid<T> {
  equals: <S extends Setoid<T>>(s: S) => boolean
}
