/* eslint react/require-default-props: 0 */
import { pageHeight, pageWidth } from '../constants/style-variables'
import * as BACKGROUND_TYPES from '../constants/background-types'
import Background from './background'
import Content from './content'
import NextPageBtn from './go-next-button'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const preloadAbove = 3

const SlideContainer = styled.div`
  position: relative;
  width: ${pageWidth};
  height: ${pageHeight};
  overflow: hidden;
`

class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.propsToBeChecked = ['isChanging', 'canPlayUnmutedly', 'currentIndex']
    this.state = {
      shouldLoad: this._handlePreload(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    this._handlePreload(nextProps)
  }

  shouldComponentUpdate(nextProps) {
    /* only rerender when selected props in `this.propsToBeChecked` changed */
    const prevProps = this.props
    const propsToBeChecked = this.propsToBeChecked
    let shouldUpdate = false
    for (let i = 0, l = propsToBeChecked.length; i < l; i += 1) {
      if (prevProps[propsToBeChecked[i]] !== nextProps[propsToBeChecked[i]]) {
        shouldUpdate = true
      }
    }
    return shouldUpdate
  }

  _handlePreload(props) {
    const { currentIndex, index, slide } = props
    const { backgroundType } = slide
    const shouldLoad = index - currentIndex <= preloadAbove || backgroundType === BACKGROUND_TYPES.CINEMAGRAPH
    if (!this.state) {
      return shouldLoad
    }
    if (!this.state.shouldLoad) {
      if (shouldLoad) {
        this.setState({
          shouldLoad: true,
        })
      }
    }
  }

  render() {
    const {
      canPlayUnmutedly,
      currentIndex,
      getAudioPlayer,
      goNextIndex,
      index,
      isChanging,
      slide,
    } = this.props
    const {
      background,
      backgroundType,
      content,
      contentType,
    } = slide
    const isFocus = index === currentIndex
    return (
      <SlideContainer>
        <Content
          canPlayUnmutedly={canPlayUnmutedly}
          content={content}
          contentType={contentType}
          getAudioPlayer={getAudioPlayer}
          index={index}
          isChanging={isChanging}
          isFocus={isFocus}
        />
        <Background
          index={index}
          isChanging={isChanging}
          isFocus={isFocus}
          backgroundType={backgroundType}
          currentIndex={currentIndex}
          preload={this.state.shouldLoad}
          {...background}
        />
        <NextPageBtn
          handleClick={goNextIndex}
          shouldDisplay={isFocus}
          shouldLoad={contentType === BACKGROUND_TYPES.BLANK}
        />
      </SlideContainer>
    )
  }
}

Slide.propTypes = {
  canPlayUnmutedly: PropTypes.bool,
  currentIndex: PropTypes.number.isRequired,
  getAudioPlayer: PropTypes.func,
  goNextIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isChanging: PropTypes.bool.isRequired,
  slide: PropTypes.object.isRequired,
}

export default Slide

