import { Identity } from './identity';

describe('Identity', () => {
  it('boxes and unboxes a value', () => expect(
    Identity
      .of(3)
      .get())
    .toBe(3));

  it('folds a function correctly', () => expect(
    Identity
      .of(3)
      .fold(x => x * 2))
    .toBe(6));

  it('maps a function correctly', () => expect(
    Identity
      .of(3)
      .map(x => x + 1)
      .get())
    .toBe(4));

  it('binds a function correctly', () => expect(
    Identity
      .of(3)
      .bind(x => Identity.of(x + 2))
      .get())
    .toBe(5));

  it('can partially apply a curried function', () => {
    const person = forename => surname => address =>
      forename + ' ' + surname + ' lives in ' + address;

    const iaddress = Identity.of('Dulwich, London')
    const isurname = Identity.of('Baker')
    const iforename = Identity.of('Tom')

    expect(iaddress
      .ap(
        isurname.ap(
          iforename.map(person)))
      .get()).toEqual('Tom Baker lives in Dulwich, London');
  });
});
