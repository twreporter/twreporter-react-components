/* eslint react/require-default-props: 0 */
import { pageHeight, pageWidth } from '../constants/style-variables'
import * as BACKGROUND_TYPES from '../constants/background-types'
import Background from './background'
import Content from './content'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import checkIfPropsChanged from 'shared/utils/check-props'

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
    this.propsToBeChecked = ['isChanging', 'canPlayUnmutedly', 'currentIndex', 'premierIndex']
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
    return checkIfPropsChanged(this.propsToBeChecked, prevProps, nextProps)
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
      currentIndex,
      getAudioPlayer,
      index,
      isChanging,
      // premierIndex,
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
      </SlideContainer>
    )
  }
}

Slide.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  getAudioPlayer: PropTypes.func,
  index: PropTypes.number.isRequired,
  isChanging: PropTypes.bool.isRequired,
  premierIndex: PropTypes.number.isRequired,
  slide: PropTypes.object.isRequired,
}

export default Slide

