import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Caption from './caption'

import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const CaptionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

class Captions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playingIndex: -1,
      hideAll: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const thisIndex = this.state.playingIndex
    const { captions, currentTime } = nextProps
    const nOfCaptions = _.get(captions, 'length')
    const nextIndex = thisIndex + 1
    /* detect if next caption is start (should display) */
    if (nextIndex < nOfCaptions) {
      const nextStart = captions[nextIndex].start
      if (currentTime >= nextStart) {
        return this.setState({
          playingIndex: nextIndex,
          hideAll: false,
        })
      }
    }
    /* detect if this caption is end (should hide) */
    if (thisIndex >= 0 && thisIndex < nOfCaptions) {
      const thisEnd = captions[thisIndex].end
      if (currentTime >= thisEnd) {
        return this.setState({
          hideAll: true,
        })
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* update only when index change or isFocus change */
    return (
      this.props.isFocus !== nextProps.isFocus ||
      this.state.playingIndex !== nextState.playingIndex ||
      this.state.hideAll !== nextState.hideAll
    )
  }

  render() {
    const { captions, isFocus } = this.props
    const nOfCaptions = _.get(captions, 'length')
    const playingIndex = this.state.playingIndex
    if (playingIndex >= nOfCaptions || playingIndex < 0) {
      return null
    }
    const hideAll = this.state.hideAll
    const subtitlesJSX = _.map(captions, (caption, index) => (
      <Caption
        key={index}
        text={_.get(caption, 'text', '')}
        hide={!isFocus || index !== playingIndex || hideAll}
      />
    ))

    return (
      <CaptionsContainer>
        {subtitlesJSX}
      </CaptionsContainer>
    )
  }
}

Captions.propTypes = {
  captions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTime: PropTypes.number.isRequired,
  isFocus: PropTypes.bool.isRequired,
}

export default Captions
