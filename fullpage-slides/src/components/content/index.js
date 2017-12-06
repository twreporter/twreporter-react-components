/* eslint react/require-default-props: 0 */

import * as CONTENT_TYPES from '../../constants/content-types'
import AudioPlayer from './audio-player'
import PropTypes from 'prop-types'
import React from 'react'
import SloganBox from './slogan-box'
import TextBox from './text-box'
import TitleBox from './title-box'
import Colophon from './colophon'
import TitleBoxLeft from './title-box-left'
import CaptionBox from './caption-box'

const Content = (props) => {
  const { contentType, content, isFocus } = props
  switch (contentType) {
    case CONTENT_TYPES.TEXT_BOX: {
      return <TextBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.CAPTION: {
      return <CaptionBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.TITLE_LEFT: {
      return <TitleBoxLeft isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.TITLE: {
      return <TitleBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.SLOGAN: {
      return <SloganBox isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.AUDIO: {
      const { isChanging, getAudioPlayer, index } = props
      return (
        <AudioPlayer
          index={index}
          isChanging={isChanging}
          isFocus={isFocus}
          ref={getAudioPlayer}
          {...content}
        />
      )
    }
    case CONTENT_TYPES.COLOPHON: {
      return <Colophon isFocus={isFocus} {...content} />
    }
    case CONTENT_TYPES.BLANK:
    default:
      return null
  }
}

Content.propTypes = {
  content: PropTypes.object,
  contentType: PropTypes.string,
  getAudioPlayer: PropTypes.func,
  index: PropTypes.number,
  isChanging: PropTypes.bool.isRequired,
  isFocus: PropTypes.bool.isRequired,
}

Content.defaultProps = {
  content: {},
  contentType: '',
}

export default Content
