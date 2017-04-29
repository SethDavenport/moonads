import { Identity } from './identity';

describe('Identity', () => {
  it('ap should let you partially apply a curried function', () => {
    const person = forename => surname => address =>
      forename + ' ' + surname + ' lives in ' + address;

    const iaddress = Identity.of('Dulwich, London')
    const isurname = Identity.of('Baker')
    const iforename = Identity.of('Tom')

    const ifnWithTom = iforename.map(person);
    const ifnWithTomBaker = iforename.ap(ifnWithTom);
    const iTheWholeString = ifnWithTomBaker.ap(ifnWithTomBaker);

    console.log(iaddress
      .ap(
        isurname.ap(
          iforename.map(person)))
      .get()) ;
  })
});
