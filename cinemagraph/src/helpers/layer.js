import { checkTypeof } from 'shared/utils/type-check'
import { warning } from 'shared/utils/warning'
import * as DEVICES from 'shared/constants/devices'
import * as EFFECT_TYPES from '../constants/effect-types'
import Keyframes from './keyframes'

import assign from 'lodash/assign'
import forEach from 'lodash/forEach'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import set from 'lodash/set'

const _ = {
  assign,
  forEach,
  isObject,
  get,
  set,
}


/*
Mock Data:

{
  _id: 'whats-happening-in-syria-02'
  _bgPosition: {
    mobile: 'center center',
    tablet: 'center center',
    desktop: 'center center',
  },
  _bgSize: {
    mobile: 'cover',
    tablet: 'cover',
    desktop: 'cover',
  },
  _animation: {
    mobile: {
      name: 'FU38GB', // generated with keyframes helper of styled-components
      duration: '3s',
      fillMode: 'both',
    },
    tablet: {
      name: 'DHE8GF',
      duration: '3s',
      fillMode: 'both',
    },
    desktop: {
      name: 'DHE8GF',
      duration: '3s',
      fillMode: 'both',
    },
  },
  _image: {
    id: 'slide01_BG',
    description: 'the background of slide01',
    alt: '',
    resizedTargets: {
      mobile: mobileBg,
      tablet: tabletBg,
      desktop: desktopBg,
    },
  },
  _keyframes: {
    mobile: / instance of Keyframes /,
    tablet: / instance of Keyframes /,
    desktop: / instance of Keyframes /,
  }
}
*/

class Layers {
  constructor(layerId) {
    this._id = layerId
    this._bgPosition = {}
    this._bgSize = {}
    this._animation = {}
    this._image = {}
    this._keyframes = {}
  }

  _checkIfScreenIsValid(screen) {
    if (DEVICES[screen]) {
      warning(`The screen type '${screen}' does not exist.`)
      return false
    }
    return true
  }

  _runJobByDevices(screen, jobFunc) {
    if (screen === DEVICES.ALL) {
      _.forEach(DEVICES, (device) => {
        if (device !== DEVICES.ALL) {
          jobFunc(device)
        }
      })
    } else {
      jobFunc(screen)
    }
  }

  /**
   * set this._bgPosition
   *
   * @param {string} [bgPosition=''] css value of background-position
   * @param {string} [screen=DEVICES.ALL] device type
   * @returns
   * @memberof Layers
   */
  setBgPosition(bgPosition = '', screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    allChecked = checkTypeof(bgPosition, 'string', 'bgPosition')
    if (allChecked) {
      const job = (setScreen) => {
        _.set(this._bgPosition, setScreen, bgPosition)
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  /**
   * set css properties in this._animation (not include animation-name)
   *
   * @param {object} [animation={}] kry: animation-* property, value: css value
   * @param {string} [screen=DEVICES.ALL] device type
   * @returns
   * @memberof Layers
   */
  setAnimationOptions(animation = {}, screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    // if (!animation.duration) {
    //   warning('animation should be an object with `duration` properties')
    //   allChecked = false
    // }
    if (allChecked) {
      const job = (setScreen) => {
        _.set(this._animation, setScreen, _.assign({}, _.get(this._animation, setScreen, {}), animation))
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  /**
   * set animation-name and keyframes in this._animation
   *
   * @param {object} [keyframes={}] key: selector, value: declaration
   * @param {string} [screen=DEVICES.ALL] device type
   * @returns
   * @memberof Layers
   */
  setCustomKeyframes(keyframes = {}, screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    if (allChecked) {
      const job = (setScreen) => {
        if (!(this._keyframes[setScreen] instanceof Keyframes)) {
          _.set(this._keyframes, setScreen, new Keyframes())
        }
        const kf = this._keyframes[setScreen]
        _.forEach(keyframes, (declarationObj, selector) => {
          kf.setStoredKeyframes(selector, declarationObj)
        })
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  /**
   * set keyframes by preset type
   *
   * @param {string} type
   * @param {any} start
   * @param {any} to
   * @param {any} [screen=DEVICES.ALL]
   * @memberof Layers
   */
  setKeyframesByType(type, start, to, screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    if (!EFFECT_TYPES[type]) {
      warning(`The effect type '${type}' does not exist`)
      allChecked = false
    }
    if (allChecked) {
      const job = (setScreen) => {
        let cssProperty
        let cssValueFrom
        let cssValueTo
        if (type === EFFECT_TYPES.SCALE) {
          cssProperty = 'transform'
          cssValueFrom = `scale(${start}, ${start})`
          cssValueTo = `scale(${to}, ${to})`
        }
        if (type === EFFECT_TYPES.MOVE_X) {
          cssProperty = 'transform'
          cssValueFrom = `translateX(${start})`
          cssValueTo = `translateX(${to})`
        }
        if (type === EFFECT_TYPES.MOVE_Y) {
          cssProperty = 'transform'
          cssValueFrom = `translateY(${start})`
          cssValueTo = `translateY(${to})`
        }
        if (!(this._keyframes[setScreen] instanceof Keyframes)) {
          _.set(this._keyframes, setScreen, new Keyframes())
        }
        const kf = this._keyframes[setScreen]
        kf.setStoredKeyframes('from', cssProperty, cssValueFrom)
        kf.setStoredKeyframes('to', cssProperty, cssValueTo)
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  setAnimationName(screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    if (allChecked) {
      const job = (setScreen) => {
        if (!(this._keyframes[setScreen] instanceof Keyframes)) {
          _.set(this._keyframes, setScreen, new Keyframes())
        }
        const animationName = this._keyframes[setScreen].injectStoredKeyframes().getAnimationName()
        _.set(this._animation, [setScreen, 'name'], animationName)
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  /**
   * set this._bgSize
   *
   * @param {string} [bgSize=''] css value of background-size
   * @param {string} [screen=DEVICES.ALL] device type
   * @returns
   * @memberof Layers
   */
  setBgSize(bgSize = '', screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    allChecked = checkTypeof(bgSize, 'string', 'bgSize')
    if (typeof bgSize !== 'string') {
      warning(`Argument bgSize must be a string, but is ${typeof bgSize}`)
    }
    if (allChecked) {
      const job = (setScreen) => {
        _.set(this._bgSize, setScreen, bgSize)
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  /**
   * set meta properties in this._image
   *
   * @param {object} [meta={}]
   * @returns
   * @memberof Layers
   */
  setImageMeta(meta = {}) {
    let allChecked = true
    if (!_.isObject(meta)) {
      warning('meta should be an object')
      allChecked = false
    }
    if (allChecked) {
      _.assign(this._image, meta)
    }
    return this
  }

  /**
   * set image path in this._image
   *
   * @param {string} [path=''] image path
   * @param {string} [screen=DEVICES.ALL] device type
   * @returns
   * @memberof Layers
   */
  setImagePath(path = '', screen = DEVICES.ALL) {
    let allChecked = true
    allChecked = this._checkIfScreenIsValid(screen)
    allChecked = checkTypeof(path, 'string', 'path')
    if (allChecked) {
      const job = (setScreen) => {
        _.set(this._image, ['resizedTargets', setScreen], path)
      }
      this._runJobByDevices(screen, job)
    }
    return this
  }

  getLayerObj() {
    return {
      id: this._id,
      animation: this._animation,
      bgPosition: this._bgPosition,
      bgSize: this._bgSize,
      image: this._image,
    }
  }
}

export default Layers
