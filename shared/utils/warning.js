/* global __DEVELOPMENT__ */
/* eslint no-console: 0, no-empty: 0 */

export const warning = (content) => {
  if (__DEVELOPMENT__) {
    if (typeof content !== 'string') {
      throw new Error(`Warning content must be a string, but is ${typeof format}`)
    }
    const message = `Warning: ${content}`
    if (typeof console !== 'undefined') {
      console.error(message)
    }
    try {
      // Throw an error to let user find the callsite that caused this warning to fire
      throw new Error(message)
    } catch (x) {}
  }
}

export default warning
