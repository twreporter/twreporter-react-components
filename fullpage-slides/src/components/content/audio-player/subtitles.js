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
      playingIndex: 0,
      hideAll: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { playingIndex, hideAll } = this.state
    const { subtitles, currentTime } = nextProps
    const nOfSubtitles = _.get(subtitles, 'length')
    for (let i = 0; i < nOfSubtitles; i += 1) {
      const addedIndex = playingIndex + i
      const testIndex = addedIndex < nOfSubtitles ? addedIndex : addedIndex - nOfSubtitles
      const thisStart = _.get(subtitles, [testIndex, 'start'])
      const thisEnd = _.get(subtitles, [testIndex, 'end'])
      if (currentTime >= thisStart && currentTime <= thisEnd) {
        return this.setState({
          playingIndex: testIndex,
          hideAll: false,
        })
      }
    }
    if (!hideAll) {
      return this.setState({
        hideAll: true,
      })
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
