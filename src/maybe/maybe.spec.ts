import { Maybe } from '.';
import { isEqual } from 'lodash';

describe('Maybe', () => {
  describe('fromNillable', () => {
    it('gives you a None if you pass null', () =>
      expect(Maybe.of<number>(null).isNone()).toBe(true));

    it('gives you a None if you pass undefined', () =>
      expect(Maybe.of<number>(undefined).isNone()).toBe(true));

    it('gives you a Some if you pass something falsy', () =>
      expect(Maybe.of<boolean>(false).isNone()).toBe(false));
  });

  describe('None', () => {
    const none = Maybe.of<string>(null);

    it('isNone', () => expect(none.isNone()).toBe(true));
    it('returns null from get', () => expect(none.get()).toBeNull());
    it('returns null from fold', () => expect(none.fold(() => 'wat')).toBeNull());
    it('returns none from map', () => expect(none.map(() => 'wat')).toEqual(none));
    it('returns none from bind', () =>
      expect(none.bind(() => Maybe.of('wat'))).toEqual(none));
  });

  describe('Some', () => {
    const value = 'Hello';
    const some = Maybe.of(value);

    it('isn\'t none', () => expect(some.isNone()).toBe(false));
    it('returns the value from get', () => expect(some.get()).toBe(value));
    it('returns the value from fold', () => expect(some.fold(() => 'wat')).toBe('wat'));

    it('returns some from map', () =>
      expect(some
        .map(() => 'wat')
        .equals(Maybe.of('wat'))).toBe(true));

    it('returns some from bind', () =>
      expect(some
        .bind(() => Maybe.of('wat'))
        .equals(Maybe.of('wat'))).toBe(true));
  });
});
