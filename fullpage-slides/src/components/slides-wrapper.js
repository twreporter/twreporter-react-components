import { pageTransitionDuration } from '../constants/time'
import * as CONTENT_TYPES from '../constants/content-types'
import * as styles from '../constants/style-variables'
import DetectPlayWithoutGesture from 'shared/components/detect-play-without-gesture'
import Header from './header'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slide from './slide'
import styled from 'styled-components'
import FirstPageButton from './first-page-button'
import NextPageBtn from './go-next-button'

import forOwn from 'lodash/forOwn'
import get from 'lodash/get'
import map from 'lodash/map'
import set from 'lodash/set'
import throttle from 'lodash/throttle'

const _ = {
  forOwn,
  get,
  map,
  set,
  throttle,
}

let prevTouchClientY
const touchThreshold = 10
const wheelThreshold = 0

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
  touch-action: none;
  position: relative;
  pointer-events: auto;
  width: ${styles.pageWidth};
  height: ${styles.pageHeight};
  will-change: transform;
  transform: translateY(${props => `${(props.currentIndex) * -100}%`}) translateZ(0);
  transition: transform ${pageTransitionDuration}ms ease;
  background-color: black;
`

class Slides extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      isChanging: false,
      toIndex: undefined,
      canPlayWithoutGesture: false,
    }
    this._audioElements = [] // for android and ios we can only play audio on user interaction

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchCancel = this.onTouchCancel.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
    /* Action of two fingers swiping on laptop touchpad may cause lots of wheeling events during about 1.6s. So we need to throttle it. */
    this.onWheel = _.throttle(this.onWheel, 1600, { leading: true, trailing: false }).bind(this)

    this.getAudioPlayer = this.getAudioPlayer.bind(this)
    this.handlePlayed = this.handlePlayed.bind(this)
    this.goNextIndex = this.goNextIndex.bind(this)
    this.goNextAndPreplay = this.goNextAndPreplay.bind(this)

    this._handleTouchClientY = _.throttle(this._handleTouchClientY, 0)
  }

  getChildContext() {
    const { bookmarkPostMessage } = this.props
    return { bookmarkPostMessage }
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'PageDown':
      case 'Down':
      case 'Enter':
      case ' ':
      case 'ArrowRight':
      case 'Right':
      case 'ArrowDown':
      case 'Spacebar':
        e.preventDefault()
        return this._changeIndex(this.state.currentIndex + 1)
      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
      case 'PageUp':
        e.preventDefault()
        return this._changeIndex(this.state.currentIndex - 1)
      default:
        return null
    }
  }

  onWheel(e) {
    if (Math.abs(e.deltaY) > wheelThreshold) {
      if (e.deltaY > 0) {
        return this._changeIndex(this.state.currentIndex + 1)
      }
      if (e.deltaY < 0) {
        return this._changeIndex(this.state.currentIndex - 1)
      }
    }
  }

  onTouchStart(e) {
    const nextTouchClientY = !e.touches ? undefined : _.get(e.touches.item(0), 'clientY')
    prevTouchClientY = nextTouchClientY
  }

  onTouchMove(e) {
    e.preventDefault()
    if (e.touches) {
      const nextTouchClientY = _.get(e.touches.item(0), 'clientY')
      return this._handleTouchClientY(nextTouchClientY)
    }
  }

  onTouchEnd() {
    this._resetPrevTouchClientY()
  }

  onTouchCancel() {
    this._resetPrevTouchClientY()
  }

  onTransitionEnd() {
    const targetIndex = this.state.toIndex
    if (this._isIndexValueValid(targetIndex)) {
      return this.setState({
        currentIndex: targetIndex,
        isChanging: false,
        toIndex: undefined,
      })
    }
  }

  getAudioPlayer(instance) {
    const index = _.get(instance, 'props.index')
    if (index >= 0) {
      this._audioElements.push(instance._audio)
    }
  }

  goNextIndex() {
    return this._changeIndex(this.state.currentIndex + 1)
  }

  goNextAndPreplay() {
    this.setState({
      isChanging: true,
      toIndex: this.state.currentIndex + 1,
    })
    this._preplayAllAudios()
  }

  handlePlayed() {
    this.setState({
      canPlayWithoutGesture: true,
    })
  }

  _isIndexValueValid(index) {
    return (index >= 0 && index < _.get(this.props, 'slides.length'))
  }

  _changeIndex(targetIndex) {
    if (!this.state.isChanging) {
      if (this._isIndexValueValid(targetIndex)) {
        if (targetIndex !== this.state.currentIndex) {
          this.setState({
            isChanging: true,
            toIndex: targetIndex,
          })
        }
      }
    }
  }

  _handleTouchClientY(nextTouchClientY) {
    const deltaY = nextTouchClientY - prevTouchClientY
    if (Math.abs(deltaY) > touchThreshold) {
      this._resetPrevTouchClientY()
      if (deltaY > 0) {
        return this._changeIndex(this.state.currentIndex - 1)
      }
      if (deltaY < 0) {
        return this._changeIndex(this.state.currentIndex + 1)
      }
    }
  }

  _resetPrevTouchClientY() {
    prevTouchClientY = undefined
  }

  _preplayAllAudios() {
    const n = this._audioElements.length
    for (let i = 0; i < n; i += 1) {
      this._audioElements[i].play()
      this._audioElements[i].pause()
    }
  }

  render() {
    const { slides, title, blankAudioSrc } = this.props
    const { currentIndex, isChanging, toIndex, canPlayWithoutGesture } = this.state

    const isFirstPage = currentIndex === 0
    const premierIndex = isChanging ? toIndex : currentIndex
    const isHeaderTitleShown = _.get(slides, [premierIndex, 'contentType']) !== CONTENT_TYPES.TITLE

    const buildSlide = (slide, index) => (
      <Slide
        key={`slide-${index}`}
        canPlayWithoutGesture={canPlayWithoutGesture}
        currentIndex={currentIndex}
        getAudioPlayer={this.getAudioPlayer}
        index={index}
        isChanging={isChanging}
        premierIndex={premierIndex}
        slide={slide}
      />
    )
    const listenerOff = isFirstPage && !canPlayWithoutGesture
    return (
      <ViewportWrapper
        tabIndex="0"
        onKeyDown={listenerOff ? null : this.onKeyDown}
        onTouchStart={listenerOff ? null : this.onTouchStart}
        onTouchMove={listenerOff ? null : this.onTouchMove}
        onTouchEnd={listenerOff ? null : this.onTouchEnd}
        onTouchCancel={listenerOff ? null : this.onTouchCancel}
        onWheel={listenerOff ? null : this.onWheel}
      >
        <Header title={title} isTitleShown={isHeaderTitleShown} />
        <Pagination currentIndex={premierIndex} total={_.get(slides, 'length', 0)} />
        <SlidesContainer currentIndex={premierIndex} onTransitionEnd={this.onTransitionEnd}>
          {_.map(slides, buildSlide)}
        </SlidesContainer>
        <DetectPlayWithoutGesture playedCallback={this.handlePlayed} blankAudioSrc={blankAudioSrc} />
        <NextPageBtn
          handleClick={this.goNextIndex}
          shouldDisplay={!isChanging}
          shouldLoad={_.get(slides, [currentIndex, 'showNextPageButton'])}
          buttonTheme={_.get(slides, [currentIndex, 'buttonTheme'])}
        />
        <FirstPageButton
          isFirstPage={currentIndex === 0}
          canPlayWithoutGesture={canPlayWithoutGesture}
          isChanging={isChanging}
          handleCannotPlay={this.goNextAndPreplay}
          handleCanPlay={this.goNextIndex}
        />
      </ViewportWrapper>
    )
  }
}

Slides.childContextTypes = {
  bookmarkPostMessage: PropTypes.object,
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  blankAudioSrc: PropTypes.string,
  bookmarkPostMessage: PropTypes.object,
}

Slides.defaultProps = {
  slides: [],
  title: '',
  blankAudioSrc: '',
  bookmarkPostMessage: {},
}

export default Slides
