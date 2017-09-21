import { pageItemEntranceDuration, pageTransitionDuration } from '../constants/time'
import * as CONTENT_TYPES from '../constants/content-types'
import * as styles from '../constants/style-variables'
import Header from './header'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slide from './slide'
import styled, { injectGlobal } from 'styled-components'

import get from 'lodash/get'
import map from 'lodash/map'
import set from 'lodash/set'
import throttle from 'lodash/throttle'

const _ = {
  get,
  map,
  set,
  throttle,
}

let prevTouchClientY
const touchToNextPageThreshold = 50
const touchToPrevPageThreshold = 50

const ViewportWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: ${styles.pageWidth};
  height: ${styles.pageHeight};
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`

const SlidesContainer = styled.div`
  position: relative;
  width: ${styles.pageWidth};
  height: ${styles.pageHeight};
  will-change: transform;
  transform: translateY(${props => props.slideY}) translateZ(0);
  transition: transform ${pageTransitionDuration}ms ease;
  background-color: black;
`

class Slides extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      isChanging: false,
      toIndex: undefined,
    }
    this._audioPlayers = {} // for ios 8 we can only play audio on user interaction
    this._getAudioPlayer = this._getAudioPlayer.bind(this)
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onTouchStart = this._onTouchStart.bind(this)
    this._onTouchMove = this._onTouchMove.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
    this._onTouchCancel = this._onTouchCancel.bind(this)
    this._onWheel = this._onWheel.bind(this)
    this._goNextIndex = this._goNextIndex.bind(this)
    this._changeIndex = _.throttle(this._changeIndex, (pageTransitionDuration + pageItemEntranceDuration + 100), { leading: true, trailing: false }).bind(this)
    this._handleTouchClientY = _.throttle(this._handleTouchClientY, 200)
    this._changingFinished = this._changingFinished.bind(this)
    // this._loadAudio = this._loadAudio.bind(this)
  }

  componentWillMount() {
    // // For ios below 9.2 to disable touch overscroll
    // if (typeof document !== 'undefined') {
    //   document.addEventListener('touchmove', e => (e.preventDefault()))
    // }

    /* Set for `height: 100%` as browser window inner height */
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      html, body {
        touch-action: manipulation;
        height: 100%;
        overflow: hidden;
      }
    `
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      html, body {
        touch-action: auto;
        height: auto;
        overflow: visible;
      }
    `
  }

  _getAudioPlayer(instance) {
    const index = _.get(instance, 'props.index')
    if (index >= 0) {
      this._audioPlayers[index] = instance
    }
  }

  _changingFinished(targetIndex) {
    this.setState({
      index: targetIndex,
      isChanging: false,
      toIndex: undefined,
    })
  }

  _isIndexValueValid(index) {
    return (index >= 0 && index < _.get(this.props, 'slides.length'))
  }

  _goNextIndex() {
    console.log('gonext')
    return this._changeIndex(this.state.index + 1)
  }

  _changeIndex(targetIndex) {
    if (this._isIndexValueValid(targetIndex)) {
      if (targetIndex !== this.state.index) {
        if (typeof window !== 'undefined') {
          // this._playAudioOnUserInteraction(targetIndex)
          setTimeout(this._changingFinished, pageTransitionDuration, targetIndex)
          this.setState({
            isChanging: true,
            toIndex: targetIndex,
          })
        }
      }
    }
  }

  _onKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
      case 'Right':
      case 'ArrowDown':
      case 'Down':
        e.preventDefault()
        return this._changeIndex(this.state.index + 1)
      case 'ArrowLeft':
      case 'Left':
      case 'ArrowUp':
      case 'Up':
        e.preventDefault()
        return this._changeIndex(this.state.index - 1)
      default:
        return null
    }
  }

  _onWheel(e) {
    if (e.deltaY > 0) {
      return this._changeIndex(this.state.index + 1)
    }
    return this._changeIndex(this.state.index - 1)
  }

  _onTouchStart(e) {
    console.log('touchstart')
    const nextTouchClientY = !e.touches ? undefined : _.get(e.touches.item(0), 'clientY')
    prevTouchClientY = nextTouchClientY
  }

  _onTouchMove(e) {
    e.preventDefault()
    if (e.touches) {
      const nextTouchClientY = _.get(e.touches.item(0), 'clientY')
      return this._handleTouchClientY(nextTouchClientY)
    }
  }

  _onTouchEnd() {
    console.log('touchend')
    this._resetPrevTouchClientY()
  }

  _onTouchCancel() {
    console.log('touchcancel')
    this._resetPrevTouchClientY()
  }

  _handleTouchClientY(nextTouchClientY) {
    const touchDiff = nextTouchClientY - prevTouchClientY
    if (touchDiff > 0 && Math.abs(touchDiff) > touchToNextPageThreshold) {
      this._resetPrevTouchClientY()
      this._changeIndex(this.state.index - 1)
    }
    if (touchDiff < 0 && Math.abs(touchDiff) > touchToPrevPageThreshold) {
      this._resetPrevTouchClientY()
      this._changeIndex(this.state.index + 1)
    }
  }

  _resetPrevTouchClientY() {
    prevTouchClientY = undefined
  }

  // _playAudioOnUserInteraction(targetIndex) {
  //   const { index, isChanging, toIndex } = this.state
  //   const premierIndex = isChanging ? toIndex : index
  //   const nextIndex = targetIndex !== undefined ? targetIndex : premierIndex
  //   const audio = _.get(this._audioPlayers, [nextIndex, '_audio'])
  //   console.log('_playAudioOnUserInteraction', nextIndex)
  //   if (audio) {
  //     return audio.play()
  //   }
  // }

  render() {
    const { slides, title } = this.props
    const { isChanging, toIndex } = this.state
    const currentIndex = this.state.index
    const premierIndex = isChanging ? toIndex : currentIndex
    const slideY = `${(-premierIndex) * 100}%`
    const isHeaderTitleShown = _.get(slides, [premierIndex, 'contentType']) !== CONTENT_TYPES.TITLE
    const SlidesJSX = _.map(slides, (slide, index) => {
      return (
        <Slide
          key={`slide-${index}`}
          slide={slide}
          currentIndex={currentIndex}
          getAudioPlayer={this._getAudioPlayer}
          goNextIndex={this._goNextIndex}
          index={index}
          isChanging={isChanging}
        />
      )
    })
    return (
      <ViewportWrapper
        tabIndex="0"
        onKeyDown={this._onKeyDown}
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEnd}
        onTouchCancel={this._onTouchCancel}
        onWheel={this._onWheel}
      >
        <Header title={title} isTitleShown={isHeaderTitleShown} />
        <Pagination currentIndex={premierIndex} total={_.get(slides, 'length', 0)} />
        <SlidesContainer currentIndex={currentIndex} slideY={slideY}>
          {SlidesJSX}
        </SlidesContainer>
      </ViewportWrapper>
    )
  }
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

Slides.defaultProps = {
  slides: [],
  title: '',
}

export default Slides
