import { Either, Left, Right } from './';

describe('Either', () => {
  const left = Either.left(8);
  const right = Either.right(8);

  describe('Left', () => {
    it('short circuits map', () =>
      expect(
        left.map(x => `Value is ${x}`)
          .equals(Either.left(8))).toBe(true));

    it('short circuits bind', () =>
      expect(
        left.bind(x => Either.right(`Value is ${x}`))
          .equals(Either.left(8))).toBe(true));

    it('short circuits ap', () =>
      expect(
        left.ap(Either.right(x => `Value is ${x}`))
          .equals(Either.left(8))).toBe(true));

    it('short circuits fold', () =>
      expect(left.fold(x => `Value is ${x}`)).toEqual(8));

    it('provides access to its value', () => expect(left.get()).toEqual(8));
    it('reports itself as a left', () => expect(left.isLeft()).toBe(true));
    it('doesn\'t report itself as a right', () => expect(left.isRight()).toBe(false));
    it('can be converted to a None', () => expect(left.toMaybe().isNone()).toBe(true));
  });

  describe('Right', () => {
    it('maps', () =>
      expect(
        right.map(x => `Value is ${x}`)
          .equals(Either.right('Value is 8'))).toBe(true));

    it('binds', () =>
      expect(
        right.bind(x => Either.right(`Value is ${x}`))
          .equals(Either.right('Value is 8'))).toBe(true));

    it('aps', () =>
      expect(
        right.ap(Either.right(x => `Value is ${x}`))
          .equals(Either.right('Value is 8'))).toBe(true));

    it('folds', () =>
      expect(right.fold(x => `Value is ${x}`)).toEqual('Value is 8'));

    it('provides access to its value', () => expect(right.get()).toEqual(8));
    it('doesn\'t report itself as a left', () => expect(right.isLeft()).toBe(false));
    it('reports itself as a right', () => expect(right.isRight()).toBe(true));
    it('can be converted to a Some', () => expect(right.toMaybe().isNone()).toBe(false));
  });

  describe('fromNillable', () => {
    it('creates a Left if the value is null', () =>
      expect(Either
        .fromNillable(null)
        .equals(Left.of<any>(null))));

    it('creates a Left if the value is undefined', () =>
      expect(Either
        .fromNillable(undefined)
        .equals(Left.of<any>(undefined))));

    it('creates a Right if the value is not nil', () =>
      expect(Either
        .fromNillable(3)
        .equals(Right.of(3))));
  });

  describe('try', () => {
    const explosionError = new Error('Boom!');
    const explode = x => { throw explosionError };
    const addOne = x => x + 1;

    it('creates a Left if the operation explodes', () =>
      expect(Either
        .try(explode)(3)
        .equals(Left.of(explosionError))));

    it('creates a Right if the operation does not explode', () => {
      expect(Either
        .try(addOne)(3)
        .equals(Right.of(4)));
    });
  });
});
