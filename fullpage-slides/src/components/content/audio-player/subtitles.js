import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Subtitle from './subtitle'

import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const SubtitlesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

class Subtitles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playingIndex: -1,
      hideAll: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const thisIndex = this.state.playingIndex
    const { subtitles, currentTime } = nextProps
    const nOfSubtitles = _.get(subtitles, 'length')
    const nextIndex = thisIndex + 1
    /* detect if next subtitle is start (should display) */
    if (currentTime === 0) {
      this.setState({
        playingIndex: -1,
        hideAll: false,
      })
    }
    if (nextIndex < nOfSubtitles) {
      const nextStart = subtitles[nextIndex].start
      if (currentTime >= nextStart) {
        return this.setState({
          playingIndex: nextIndex,
          hideAll: false,
        })
      }
    }
    /* detect if this subtitle is end (should hide) */
    if (thisIndex >= 0 && thisIndex < nOfSubtitles) {
      const thisEnd = subtitles[thisIndex].end
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
    const { subtitles, isFocus } = this.props
    const nOfSubtitles = _.get(subtitles, 'length')
    const playingIndex = this.state.playingIndex
    if (playingIndex >= nOfSubtitles || playingIndex < 0) {
      return null
    }
    const hideAll = this.state.hideAll
    const subtitlesJSX = _.map(subtitles, (subtitle, index) => (
      <Subtitle
        key={index}
        text={_.get(subtitle, 'text', '')}
        hide={!isFocus || index !== playingIndex || hideAll}
      />
    ))

    return (
      <SubtitlesContainer>
        {subtitlesJSX}
      </SubtitlesContainer>
    )
  }
}

Subtitles.propTypes = {
  subtitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTime: PropTypes.number.isRequired,
  isFocus: PropTypes.bool.isRequired,
}

export default Subtitles
