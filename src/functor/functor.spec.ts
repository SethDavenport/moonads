import { Identity } from '../identity';
import { Maybe } from '../maybe';

describe('Functor Rules', () => {
  const functorsUnderTest = [ 
    Identity.of(4),
    Maybe.of<number>(null),
    Maybe.of<number>(undefined),
    Maybe.of(3),
  ];

  it('satisfies the identity rule', () =>
    functorsUnderTest.forEach(functor =>
      expect(functor.map(x => x).equals(functor)).toBe(true)));

  it('satisfies the composition rule', () => {
    const double = a => a * 2;
    const addFour = a => a + 4;

    functorsUnderTest.forEach(functor =>
      expect(functor
        .map(x => addFour(double(x)))
        .equals(functor
          .map(double)
          .map(addFour))).toBe(true));
  });
});
