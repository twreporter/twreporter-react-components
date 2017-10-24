import { breakpoints } from './configs'
import { changeOpacity } from './animation'
import { css } from 'styled-components'
import { warning } from 'shared/utils/warning'

import compact from 'lodash/compact'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'

const _ = {
  compact,
  isArray,
  isEmpty,
  reduce,
}

export const absoluteCentering = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const centerBlock = css`
  margin-left: auto;
  margin-right: auto;
`

export const linkUnderline = css`
  animation: ${changeOpacity('0', '1')} .5s linear;
  position: absolute;
  left: 0;
  bottom: 0;
  display: block;
  content: "";
  width: 100%;
  height: 3px;
  background-color: red;
`

/**
* @prop {array|number} values - Array or number of values
* @prop {string} unit - Unit
* */
export const arrayToCssShorthand = (values, unit = 'px') => {
  const _handleValue = (value) => {
    switch (typeof value) {
      case 'number':
        return (value === 0) ? '0' : `${value}${unit}`
      case 'string':
        return value
      default:
        return ''
    }
  }
  if (!_.isArray(values)) {
    return _handleValue(values)
  }
  return values.map(_handleValue).join(' ')
}

export const media = {
  mobile: (...args) => css`
    @media (max-width: 414px) {
      ${css(...args)}
    }
  `,
  iPhone5: (...args) => css`
    @media (max-width: 320px) {
      ${css(...args)}
    }
  `,
  iPhone6: (...args) => css`
    @media (max-width: 375px) {
      ${css(...args)}
    }
  `,
  iPhone6Plus: (...args) => css`
    @media (max-width: 414px) {
      ${css(...args)}
    }
  `,
  largeMobile: (...args) => css`
    @media (max-width: 650px) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
}

/**
* @prop {string} position - postion of the content div
* @prop {number} lineHeight - line-height
* @prop {number} numberOfLine - number of line that you need in div
* @prop {string} backgroundColor - background
* @prop {string} textAlign - text-align
* */
export function truncate(position, lineHeight, numberOfLine, backgroundColor, textAlign) {
  const maxHeight = lineHeight * numberOfLine
  const textAlignValue = textAlign || 'justify'
  return `
    overflow: hidden;
    position: ${position};
    line-height: ${lineHeight}em;
    max-height: ${maxHeight}em;
    text-align: ${textAlignValue};
    margin-right: -1em;
    padding-right: 1em;
    &::before {
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      margin-top: 0.25em;
      background: ${backgroundColor};
    }
  `
}

export const mq = (mqSettingsObj) => {
  const mqString = _.reduce(mqSettingsObj, (result, value, key) => {
    switch (key) {
      case 'mediaType':
        return `${value} ${result}`
      default:
        return `${result} and (${key}: ${value})`
    }
  })
  return (...cssCode) => css`
    @media ${mqString} {
      ${css(...cssCode)}
    }
  `
}

const bp = {
  small: {
    max: `${breakpoints.medium.min - 1}px`,
  },
  medium: {
    min: `${breakpoints.medium.min}px`,
    max: `${breakpoints.large.min - 1}px`,
  },
  large: {
    min: `${breakpoints.large.min}px`,
    max: `${breakpoints.xlarge.min - 1}px`,
  },
  xlarge: {
    min: `${breakpoints.xlarge.min}px`,
  },
}

export const screen = {
  mobileOnly: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bp.small.max,
  })(...cssCode),
  tabletAbove: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.medium.min,
  })(...cssCode),
  tabletOnly: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.medium.min,
    'max-width': bp.medium.max,
  })(...cssCode),
  tabletBelow: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bp.medium.max,
  })(...cssCode),
  desktopOnly: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.large.min,
    'max-width': bp.large.max,
  })(...cssCode),
  desktopAbove: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.large.min,
  })(...cssCode),
  hdAbove: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.xlarge.min,
  })(...cssCode),
}

export const linkHoverFadeOut = css`
  ${screen.desktopAbove`
    &:hover {
      opacity: .7;
      transition: 200ms opacity linear;  
    }
  `}
`

export const resetLinkStyle = css`
  a {
    &, :hover, :active, :link, :visited {
      color: inherit;
      text-decoration: none;
    }
  }
`

export const animationObjectToShorthandString = (animation) => {
  if (typeof animation === 'string') {
    return animation
  }
  if (typeof animation === 'undefined') {
    warning('Animation should be an object or a string, but is undefined')
    return ''
  }
  const propertiesArray = _.compact([
    animation.duration,
    animation.name,
    animation.timingFunction,
    animation.delay,
    animation.iterationCount,
    animation.direction,
    animation.fillMode,
    animation.playState,
  ]) // remove falsey values
  return propertiesArray.join(' ')
}

export const animationsToCss = (animations) => {
  const { all } = animations
  if (!isEmpty(all)) {
    return css`
      animation: ${animationObjectToShorthandString(all)};
    `
  }
  const { mobile, tablet, desktop } = animations
  return css`
    animation: ${animationObjectToShorthandString(mobile)};
    ${screen.tabletOnly`
      animation: ${animationObjectToShorthandString(tablet)}
    `}
    ${screen.desktopAbove`
      animation: ${animationObjectToShorthandString(desktop)}
    `}
  `
}
