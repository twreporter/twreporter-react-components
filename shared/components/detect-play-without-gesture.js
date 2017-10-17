import React from 'react'
import PropTypes from 'prop-types'

/*
  This component will:
  1. Mount a html5 audio element with testing file and set muted = false
  2. Try to play it when componentDidMount
  3. If played success 
*/

class DetectPlayWithoutClick extends React.Component {
  constructor(props) {
    super(props)
    this._handleStartPlay = this._handleStartPlay.bind(this)
    this._getAudioElement = this._getAudioElement.bind(this)
  }
  componentDidMount() {
    try {
      this._audio.play()
    } catch (e) {} // eslint-disable-line no-empty
  }
  shouldComponentUpdate() {
    /* never update this component */
    return false
  }
  _getAudioElement(ele) {
    this._audio = ele
  }
  _handleStartPlay() {
    return this.props.playedCallback()
  }
  render() {
    const { blankAudioSrc } = this.props
    return (
      <audio
        crossOrigin="anonymous"
        muted={false}
        ref={this._getAudioElement}
        playsInline
        preload="auto"
        onPlay={this._handleStartPlay}
        style={{
          position: 'absolute',
          height: 0,
          width: 0,
        }}
      >
        <source
          type="audio/mpeg"
          src={blankAudioSrc}
        />
      </audio>
    )
  }
}

DetectPlayWithoutClick.propTypes = {
  blankAudioSrc: PropTypes.string.isRequired,
  playedCallback: PropTypes.func.isRequired,
}

export default DetectPlayWithoutClick
