import { warning } from 'shared/utils/warning'
import { keyframes } from 'styled-components'
import assignWith from 'lodash/assignWith'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import isObject from 'lodash/isObject'
import set from 'lodash/set'

const _ = {
  assignWith,
  forEach,
  get,
  isObject,
  set,
}


/*
Mock Data:

animationName = 'AT3F0'

keyframes = {
  '0%': {
    transform: 'translate(0, 0, 0) scale(1)',
  },
  '100%': {
    transform: 'translate(-10px, 0, 0) scale(1.4)',
  },
}
*/

class Keyframes {
  constructor() {
    this._keyframes = {}
    this._animationName = ''
  }

  _trimEndingSemicolon(cssString = '') {
    return cssString.replace(/;$/g, '')
  }

  _handleCssTransform(...values) {
    /* TODO: handle duplicate */
    return values.filter(string => _.get(string, 'length') > 0).join(' ')
  }

  /**
   * Set keyframes in the instance
   *
   * @param {number | string} selector - a number from 0 to 100 OR string 'from' or 'to'
   * @param {string} cssProperty
   * @param {string} cssValue
   * @returns
   * @memberof Keyframes
   */
  setStoredKeyframes(selector, cssProperty, cssValue) {
    let transedSelector = selector
    if (selector === 'from') {
      transedSelector = 0
    }
    if (selector === 'to') {
      transedSelector = 100
    }
    transedSelector = parseInt(transedSelector, 10)
    if (!(transedSelector >= 0 && transedSelector <= 100)) {
      warning(`Keyframes selector must be a integer between 0 to 100, but is ${selector}`)
    }
    if (_.isObject(cssProperty) && typeof cssValue === 'undefined') {
      const declarationObj = cssProperty
      const nextDeclarationObj = _.assignWith({}, this._keyframes[`${transedSelector}%`], declarationObj, (prev, next, key) =>
        (key === 'transform' ? this._handleCssTransform(prev, next) : undefined))
      _.set(this._keyframes, `${transedSelector}%`, nextDeclarationObj)
      return this
    }
    if (typeof cssProperty !== 'string') {
      warning('Argument cssProperty must be a string. Or you cannot call the method with the third parameter cssValue.')
    }
    if (typeof cssValue !== 'string') {
      warning(`Argument cssValue must be a string, but is '${typeof cssValue}'`)
    }
    let nextCssValue = this._trimEndingSemicolon(cssValue)
    if (cssProperty === 'transform') {
      const prevCssValue = _.get(this._keyframes, [`${transedSelector}%`, cssProperty])
      nextCssValue = this._handleCssTransform(prevCssValue, nextCssValue)
    }
    _.set(this._keyframes, [`${transedSelector}%`, cssProperty], nextCssValue)
    return this
  }

  /**
   * Inject css to html and get keyframes name string
   *
   * @returns
   * @memberof Keyframes
   */
  injectStoredKeyframes() {
    let cssString = ''
    _.forEach(this._keyframes, (declarationObj, selector) => {
      if (selector.slice(-1) === '%') {
        let declarationString = ''
        _.forEach(declarationObj, (value, property) => {
          declarationString += `${property}: ${value};`
        })
        cssString += `${selector} {${declarationString}}`
      }
    })
    this._animationName = keyframes`${cssString}`
    return this
  }

  getAnimationName() {
    return this._animationName
  }
}

export default Keyframes
