import { Identity } from '../identity';
import { Maybe } from '../maybe';
import { Transform } from '../utils/Transform';
import { Either } from '../either';

describe('Chain Rules', () => {
  const double = x => 2 * x;
  const addFour = x => x + 4;

  const chainsUnderTest = [
    { m: Identity.of(7), f: x => Identity.of(double(x)), g: x => Identity.of(addFour(x)) },
    { m: Maybe.of(7), f: x => Maybe.of(double(x)), g: x => Maybe.of(addFour(x)) },
    { m: Maybe.of<number>(null), f: x => Maybe.of(double(x)), g: x => Maybe.of(addFour(x)) },
    { m: Maybe.of<number>(undefined), f: x => Maybe.of(double(x)), g: x => Maybe.of(addFour(x)) },
    { m: Maybe.of(7), f: x => Maybe.of<number>(null), g: x => Maybe.of(addFour(x)) },
    { m: Maybe.of(7), f: x => Maybe.of(double(x)), g: x => Maybe.of<number>(null) },
    { m: Maybe.of<number>(null), f: x => Maybe.of<number>(null), g: x => Maybe.of<number>(null) },
    { m: Either.right(7), f: x => Either.right(double(x)), g: x => Either.right(addFour(x)) },
    { m: Either.left(7), f: x => Either.left(double(x)), g: x => Either.left(addFour(x)) },
    { m: Either.right(7), f: x => Either.right(double(x)), g: x => Either.left(addFour(x)) },
    { m: Either.right(7), f: x => Either.left(double(x)), g: x => Either.left(addFour(x)) },
    { m: Either.left(7), f: x => Either.right(double(x)), g: x => Either.right(addFour(x)) },
    { m: Either.left(7), f: x => Either.left(double(x)), g: x => Either.right(addFour(x)) },
    { m: Either.left(7), f: x => Either.right(double(x)), g: x => Either.left(addFour(x)) },
  ];

  // m.chain(f).chain(g) is equivalent to m.chain(x => f(x).chain(g))
  it('satisfies the associativity rule', () =>
    chainsUnderTest.forEach(({ m, f, g }) => expect(
      m.bind(f)
        .bind(g)
        .equals(m.bind(x => f(x).bind(g)))).toBe(true)));
});
