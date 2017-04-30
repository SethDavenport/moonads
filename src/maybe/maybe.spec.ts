import { fromNillable, Maybe } from './maybe';

describe('Maybe', () => {
  describe('fromNillable', () => {
    it('gives you a None if you pass null', () =>
      expect(fromNillable<number>(null).isNone()).toBe(true));

    it('gives you a None if you pass undefined', () =>
      expect(fromNillable<number>(undefined).isNone()).toBe(true));

    it('gives you a Some if you pass something falsy', () =>
      expect(fromNillable<boolean>(false).isNone()).toBe(false));
  });

  describe('None', () => {
    const none: Maybe<any> = fromNillable(null);

    it('isNone', () => expect(none.isNone()).toBe(true));
    it('returns null from get', () => expect(none.get()).toBeNull());
    it('returns null from fold', () => expect(none.fold(() => 'wat')).toBeNull());
    it('returns none from map', () => expect(none.map(() => 'wat')).toEqual(none));
    it('returns none from bind', () =>
      expect(none.bind(() => fromNillable('wat'))).toEqual(none));
  });

  describe('Some', () => {
    const value: String = 'Hello';
    const some: Maybe<string> = fromNillable('value');

    it('isn\'t none', () => expect(some.isNone()).toBe(false));
    it('returns the value from get', () => expect(some.get()).toBe(value));
    it('returns the value from fold', () => expect(some.fold(() => 'wat')).toBe('wat'));
    it('returns some from map', () => expect(some.map(() => 'wat'))
      .toEqual(fromNillable('wat')));
    it('returns some from bind', () =>
      expect(some.bind(() => fromNillable('wat')))
        .toEqual(fromNillable('wat')));
  });
});
