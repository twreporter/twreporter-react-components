import { colors, fontSizes } from '../../../constants/style-variables'
import { screen } from 'shared/style-utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const styles = {
  lineHeight: {
    mobile: 1.75,
    tablet: 1.4,
    desktop: 1.4,
  },
}

const Container = styled.div`
  opacity: ${props => (!props.hide ? '1' : '0')};
  transition: opacity 200ms ease;
  position: absolute;
  width: 100%;
  height: 100%;
`

const Text = styled.div`
  position: absolute;
  display: inline-block;
  max-width: 100%;
  left: 0;
  top: 0;
  >span {
    letter-spacing: 1.2px;
    font-size: ${fontSizes.subtitle.mobile};
  }
  ${screen.tabletOnly`
    >span {
      font-size: ${fontSizes.subtitle.tablet};
    }
  `}
  ${screen.desktopOnly`
    >span {
      font-size: ${fontSizes.subtitle.desktop};
    }
  `}
  ${screen.hdAbove`
    >span {
      font-size: ${fontSizes.subtitle.hd};
    }
  `}
`

const Content = Text.extend`
  color: ${colors.white};
  >span {
    background-color: transparent;
    line-height: ${styles.lineHeight.mobile};
  }
  ${screen.tabletOnly`
    >span {
      line-height: ${styles.lineHeight.tablet};
    }
  `}
  ${screen.desktopAbove`
    >span {
      line-height: ${styles.lineHeight.desktop};
    }
  `}
`

const Background = Text.extend`
  user-select: none;
  transform: translateY(7px) scale(1.05,0.78);
  transform-origin: center top;
  >span {
    color: ${colors.black};
    background-color: ${colors.black};
    line-height: ${1 / 0.78 * styles.lineHeight.mobile};
  }
  ${screen.tabletOnly`
    transform: translateY(7px) scale(1.03,0.74);
    >span {
      line-height: ${1 / 0.78 * styles.lineHeight.tablet};
    }
  `}
  ${screen.desktopOnly`
    transform: translateY(7px) scale(1.03,0.74);
    >span {
      line-height: ${1 / 0.74 * styles.lineHeight.desktop};
    }
  `}
  ${screen.hdAbove`
    transform: translateY(13px) scale(1.02,0.74);
    >span {
      line-height: ${1 / 0.74 * styles.lineHeight.desktop};
    }
  `}
`

class Subtitle extends React.PureComponent {
  render() {
    const { text, hide } = this.props
    if (!text) return null
    return (
      <Container hide={hide}>
        <Background><span>{text}</span></Background>
        <Content><span>{text}</span></Content>
      </Container>
    )
  }
}

Subtitle.propTypes = {
  text: PropTypes.string,
  hide: PropTypes.bool.isRequired,
}

Subtitle.defaultProps = {
  text: '',
  hide: false,
}

export default Subtitle
