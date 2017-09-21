import { screen } from 'shared/style-utils'
import { zIndex } from '../../../constants/style-variables'
import Captions from './captions'
import ContentContainer from '../container'
import Progress from './progress'
import PropTypes from 'prop-types'
import React from 'react'
import SoundOffIcon from '../../../../static/off-sound.svg'
import SoundOnIcon from '../../../../static/on-sound.svg'
import styled from 'styled-components'

import throttle from 'lodash/throttle'
import get from 'lodash/get'

const _ = {
  throttle,
  get,
}

const Status = styled.div`
  z-index: ${zIndex.status};
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  flex-direction: column;
  ${screen.tabletAbove`
    flex-direction: row;
    align-items: stretch;
  `}
  height: 106px;  
  ${screen.tabletOnly`
    height: 136px;
  `}
  ${screen.desktopOnly`
    height: 93px;
  `}
  ${screen.hdAbove`
    height: 109px;
  `}
`

const ButtonsBox = styled.div`
  text-align: left;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  padding-left: 20px;
  ${screen.tabletOnly`
    flex-basis: 90px;
    width: 90px;
    padding-left: 45px;
  `}
  ${screen.desktopOnly`
    flex-basis: 112px;
    width: 112px;
    padding-left: 60px;
  `}
  ${screen.hdAbove`
    flex-basis: 148px;
    width: 148px;
    padding-left: 80px;
  `}
`

const CaptionsBox = styled.div`
  text-align: left;
  flex-grow: 1;
  flex-shrink: 1;
  ${screen.mobileOnly`
    width: 100%;
    padding: 0 27px;
  `}
  ${screen.tabletOnly`
    padding-right: 96px;
  `}
  ${screen.desktopOnly`
    padding-right: 84px;
  `}
  ${screen.hdAbove`
    padding-right: 200px;
  `}
`

const Button = styled.div`
  width: 30px;
  height: 30px;
  >svg {
    width: 100%;
    height: 100%;
  }
  ${screen.hdAbove`
    width: 45px;
    height: 45px;
  `}
`

const Debug = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: red;
`

const SoundOffIconJSX = <SoundOffIcon />
const SoundOnIconJSX = <SoundOnIcon />

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: 0,
      duration: 0,
      muted: false,
    }
    this._changeMute = this._changeMute.bind(this)
    this._handleTimeUpdate = _.throttle(this._handleTimeUpdate, 300).bind(this)
    this._handleLoadedData = this._handleLoadedData.bind(this)
    this._getAudioElement = this._getAudioElement.bind(this)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      const isIos = /iPad|iPhone|iPod/.test(_.get(window, 'navigator.userAgent')) && !window.MSStream
      this.setState({
        muted: isIos,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocus) {
      this._playAudio()
    } else {
      this._pauseAudio()
    }
  }

  _playAudio() {
    const audio = this._audio
    if (audio.paused) {
      audio.play()
    }
  }

  _pauseAudio() {
    const audio = this._audio
    if (!audio.paused) {
      audio.pause()
    }
  }

  _handleTimeUpdate() {
    this.setState({
      currentTime: this._audio.currentTime,
    })
  }

  _changeMute() {
    this.setState({
      muted: !this.state.muted,
    })
  }

  _handleLoadedData() {
    this.setState({
      duration: this._audio.duration,
    })
  }

  _getAudioElement(ele) {
    this._audio = ele
  }

  render() {
    const { audioSrc, audioType, captions, isFocus } = this.props
    const { currentTime, muted, duration } = this.state
    const SoundIcon = muted ? SoundOffIconJSX : SoundOnIconJSX
    return (
      <ContentContainer>
        <audio
          crossOrigin="anonymous"
          muted={muted}
          ref={this._getAudioElement}
          playsInline
          preload="auto"
          onTimeUpdate={this._handleTimeUpdate}
          onLoadedData={this._handleLoadedData}
        >
          <source
            type={audioType}
            src={audioSrc}
          />
        </audio>
        <Status>
          <ButtonsBox><Button onClick={this._changeMute}>{SoundIcon}</Button></ButtonsBox>
          <CaptionsBox><Captions ref={(ele) => { this._captions = ele }} currentTime={currentTime} isFocus={isFocus} captions={captions} /></CaptionsBox>
        </Status>
        <Debug>currentTime:{currentTime}</Debug>
        <Progress currentTime={currentTime} duration={duration} />
      </ContentContainer>
    )
  }
}

AudioPlayer.propTypes = {
  isFocus: PropTypes.bool.isRequired,
  audioSrc: PropTypes.string.isRequired,
  captions: PropTypes.array.isRequired,
  audioType: PropTypes.string.isRequired,
}

AudioPlayer.defaultProps = {
  captions: [],
  audioType: 'audio/mpeg',
}

export default AudioPlayer
