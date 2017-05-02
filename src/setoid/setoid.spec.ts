import { Identity } from '../identity';

describe('Setoid Rules', () => {
  const reflexivityTests = [ Identity.of(4) ];
  const symmetryTests = [
    { a: Identity.of(4), b: Identity.of(4) },
    { a: Identity.of(2), b: Identity.of(4) } ];

  const transitivityTests = [
    { a: Identity.of(4), b: Identity.of(4), c: Identity.of(4) },
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
