import { colors, fontSizes, fontWeight } from '../../constants/style-variables'
import { screen } from 'shared/style-utils'
import { slideUpFadeInWhenFocus } from '../../utils/style-mixins'
import ContentContainer from './container'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import CaptionIcon from '../../../static/icon-caption.svg'

const padding = {
  mobile: '20px 18px',
  tablet: '55px 52px',
  desktop: '55px 68px',
  hd: '58px 85px',
}

const Container = styled(ContentContainer)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: ${padding.mobile};
  ${screen.tabletOnly`
    padding: ${padding.tablet};
  `}
  ${screen.desktopOnly`
    padding: ${padding.desktop};
  `}
  ${screen.hdAbove`
    padding: ${padding.hd};
  `}
`

const Caption = styled.div`
  color: ${colors.black};
  font-weight: ${fontWeight.normal};
  font-size: ${fontSizes.caption.mobile};
  line-height: 2;
  letter-spacing: 1.2px;
  svg {
    height: .77em;
    transform: translateX(-50%);
  }
  ${screen.tabletOnly`
    font-size: ${fontSizes.caption.tablet};
  `}
  ${screen.desktopOnly`
    font-size: ${fontSizes.caption.desktop};
    font-weight: ${fontWeight.light};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.caption.hd};
    letter-spacing: 1.8px;
  `}
  ${props => slideUpFadeInWhenFocus(props.isFocus)}
`

const Text = styled.span`
  background-color: rgba(255,255,255,0.7);
`

const CaptionBox = (props) => {
  const { isFocus, caption } = props
  return (
    <Container>
      <Caption isFocus={isFocus}>
        <Text><CaptionIcon />{caption}</Text>
      </Caption>
    </Container>
  )
}

CaptionBox.propTypes = {
  caption: PropTypes.string.isRequired,
  isFocus: PropTypes.bool.isRequired,
}

export default CaptionBox
