import { Identity } from '../identity';
import { Maybe } from '../maybe';

describe('Setoid Rules', () => {
  const reflexivityTests = [
    Identity.of(4),
    Maybe.of<number>(null),
    Maybe.of<number>(undefined),
    Maybe.of(3),
  ];

  const symmetryTests = [
    { a: Identity.of(4), b: Identity.of(4) },
    { a: Identity.of(2), b: Identity.of(4) },
    { a: Maybe.of(2),    b: Maybe.of(3) },
    { a: Maybe.of(null), b: Maybe.of(undefined) },
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
