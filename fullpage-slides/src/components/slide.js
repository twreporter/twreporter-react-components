import { pageHeight, pageWidth } from '../constants/style-variables'
import Background from './background'
import Content from './content'
import NextPageBtn from './next-page-button'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const loadPageBefore = 1

const SlideContainer = styled.div`
  position: relative;
  width: ${pageWidth};
  height: ${pageHeight};
  overflow: hidden;
`

class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMount: false,
    }
  }
  componentWillMount() {
    this._mountIfBeside(this.props)
  }
  componentWillReceiveProps(nextProps) {
    this._mountIfBeside(nextProps)
  }

  shouldComponentUpdate(nextProps) {
    /* only rerender when page changing */
    const prevProps = this.props
    return (
      prevProps.currentIndex !== nextProps.currentIndex ||
      prevProps.isChanging !== nextProps.isChanging
    )
  }

  _mountIfBeside(props) {
    const { currentIndex, index } = props
    if (index - currentIndex <= loadPageBefore && !this.state.shouldMount) {
      this.setState({
        shouldMount: true,
      })
    }
  }
  render() {
    if (!this.state.shouldMount) {
      return <SlideContainer />
    }
    const {
      slide,
      currentIndex,
      getAudioPlayer,
      goNextIndex,
      index,
      isChanging,
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
          getAudioPlayer={getAudioPlayer}
          index={index}
          isFocus={isFocus}
          content={content}
          contentType={contentType}
        />
        <Background
          index={index}
          isChanging={isChanging}
          isFocus={isFocus}
          backgroundType={backgroundType}
          currentIndex={currentIndex}
          {...background}
        />
        <NextPageBtn
          handleClick={goNextIndex}
          shouldDisplay={isFocus}
          shouldMount={index === 0}
        />
      </SlideContainer>
    )
  }
}

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  currentIndex: PropTypes.number.isRequired,
  getAudioPlayer: PropTypes.func.isRequired,
  goNextIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isChanging: PropTypes.bool.isRequired,
}

export default Slide

