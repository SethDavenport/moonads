// TODO: wtf is ap?
// TODO: either.
// TODO: lists and stuff
// TODO: future

import { Identity } from './';

const getPercent = (wrongCount: number, correctCount: number) =>
  Identity.of(wrongCount + correctCount)
    .map(totalCount => correctCount / totalCount)
    .map(ratio => Math.round(100 * ratio))
    .map(percent => `${percent}%`)
    .get();

// Making it more readable instead of ramda/promise-style soup.
const toRatioWith = correctCount => totalCount => correctCount / totalCount;
const toPercentage = ratio => Math.round(100 * ratio);
const toDisplayString = percentage => `{percentage}%`;

const getPercentWithNamedOperations = (wrongCount: number, correctCount: number) =>
  Identity.of(wrongCount + correctCount)
    .map(toRatioWith(correctCount))
    .map(toPercentage)
    .map(toDisplayString)
    .get();

// So... is a promise a monad? No... because .then acts like both map
// and flatmap. And there is no .get (unless you count await).
/*
const qGetPercent = async (wrongCount: number, correctCount: number) =>
  await Promise.resolve(wrongCount + correctCount)
    .then(totalCount => correctCount / totalCount)
    .then(ratio => Math.round(100 * ratio))
    .then(percent => `${percent}%`)
    // No easy way to unbox a promise... hence await.
*/

console.log('getPercent:', getPercent(3, 4));
console.log('getPercentWithNamedOperations:', getPercent(3, 4));
//console.log('qGetPercent:', qGetPercent(3, 4));
