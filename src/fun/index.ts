/**
 * print `hello,world`
 */
export function helloworld() {
  console.log('hello, world!')
}

/**
 * Generate integers starting from 1
 *
 * @returns {number} num
 * @example
 * generateNum().next().value
 */
export function* generateNum(): Generator<number, never, never> {
  let num = 1;
  while (true) {
    yield num++;
  }
}

/**
 * Generate integers starting from 1001
 *
 * @returns {number} num
 * @example
 * generateNum().next().value
 */
export function* generateNumWiththousand(): Generator<number, never, never> {
  let num = 1001;
  while (true) {
    yield num++;
  }
}