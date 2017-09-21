import * as CONTENT_TYPES from '../../constants/content-types'
import AudioPlayer from './audio-player'
import PropTypes from 'prop-types'
import React from 'react'
import SloganBox from './slogan-box'
import TextBox from './text-box'
import TitleBox from './title-box'

const Content = (props) => {
  const { contentType, content, isFocus } = props
  switch (contentType) {
    case CONTENT_TYPES.TEXT_BOX: {
      return <TextBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.TITLE: {
      return <TitleBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.SLOGAN: {
      return <SloganBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.AUDIO: {
      return <AudioPlayer isFocus={isFocus} {...content} />
    }
    default:
      return null
  }
}

Content.propTypes = {
  content: PropTypes.object,
  isFocus: PropTypes.bool,
  contentType: PropTypes.string.isRequired,
  getAudioPlayer: PropTypes.func, // eslint-disable-line react/require-default-props
  index: PropTypes.number, // eslint-disable-line react/require-default-props
}

Content.defaultProps = {
  content: {},
  isFocus: false,
}

export default Content
