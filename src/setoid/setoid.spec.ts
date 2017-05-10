import { Identity } from '../identity';
import { Maybe } from '../maybe';
import { Either } from '../either';

describe('Setoid Rules', () => {
  const reflexivityTests = [
    Identity.of(4),
    Maybe.of<number>(null),
    Maybe.of<number>(undefined),
    Maybe.of(3),
    Either.left(3),
    Either.right(3),
  ];

  const symmetryTests = [
    { a: Identity.of(4), b: Identity.of(4) },
    { a: Identity.of(2), b: Identity.of(4) },
    { a: Maybe.of(1),    b: Maybe.of(1) },
    { a: Maybe.of(2),    b: Maybe.of(3) },
    { a: Maybe.of(null), b: Maybe.of(undefined) },
    { a: Either.left(1), b: Either.left(1) },
    { a: Either.left(2), b: Either.left(3) },
    { a: Either.right(1), b: Either.right(1) },
    { a: Either.right(2), b: Either.right(3) },
    { a: Either.left(1), b: Either.right(1) },
  ];

  const transitivityTests = [
    { a: Identity.of(4), b: Identity.of(4), c: Identity.of(4) },
    { a: Identity.of(2), b: Identity.of(3), c: Identity.of(3) },
    { a: Identity.of(2), b: Identity.of(3), c: Identity.of(4) },
    { a: Maybe.of(4), b: Maybe.of(4), c: Maybe.of(4) },
    { a: Maybe.of(2), b: Maybe.of(3), c: Maybe.of(3) },
    { a: Maybe.of(2), b: Maybe.of(3), c: Maybe.of(4) },
    { a: Maybe.of(null), b: Maybe.of(null), c: Maybe.of(null) },
    { a: Maybe.of(undefined), b: Maybe.of(undefined), c: Maybe.of(undefined) },
    { a: Maybe.of(null), b: Maybe.of(undefined), c: Maybe.of(undefined) },
    { a: Maybe.of(1), b: Maybe.of(undefined), c: Maybe.of(undefined) },
    { a: Maybe.of(1), b: Maybe.of(null), c: Maybe.of(undefined) },
    { a: Either.right(4), b: Either.right(4), c: Either.right(4) },
    { a: Either.right(2), b: Either.right(3), c: Either.right(3) },
    { a: Either.right(2), b: Either.right(3), c: Either.right(4) },
    { a: Either.left(4), b: Either.left(4), c: Either.left(4) },
    { a: Either.left(2), b: Either.left(3), c: Either.left(3) },
    { a: Either.left(2), b: Either.left(3), c: Either.left(4) },
  ];

  it('satisfies the reflexivity rule for reference equality', () =>
    reflexivityTests.forEach(setoid =>
      expect(setoid.equals(setoid)).toBe(true)));

  it('satisfies the reflexivity rule for value equality', () =>
    reflexivityTests.forEach(setoid =>
      expect(setoid.equals(setoid.map(x => x))).toBe(true)));

  it('satisfies the symmetry rule', () =>
    symmetryTests.forEach(({ a, b }) =>
      expect(a.equals(b))
        .toBe(a.equals(b))));

  it('satisfies the transitivity rule', () =>
    transitivityTests.forEach(({ a, b, c }) =>
      expect(a.equals(b) && b.equals(c)).toBe(a.equals(c))));
});
