import { colors, fontSizes, fontWeight } from '../../constants/style-variables'
import { screen } from 'shared/style-utils'
import { slideUpFadeInWhenFocus } from '../../utils/style-mixins'
import ContentContainer from './container'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Slogan = styled.h2`
  color: ${colors.white};
  font-size: ${fontSizes.slogan.mobile};
  font-weight: ${fontWeight.extraLight};
  letter-spacing: .8px;
  line-height: 1.42;
  margin: 0 auto;
  min-width: 270px;
  padding: 0;
  position: relative;
  text-align: center;
  top: 48%;
  width: 84%;
  ${screen.tabletOnly`
    top: 58%;
    width: 90%;
    font-size: ${fontSizes.slogan.tablet};
    font-weight: ${fontWeight.light};
    letter-spacing: 1px;
  `}
  ${screen.desktopOnly`
    top: 60%;
    font-size: ${fontSizes.slogan.desktop};
    font-weight: ${fontWeight.light};
    letter-spacing: 1px;
    width: 782px;
  `}
  ${screen.hdAbove`
    top: 64%;
    font-size: ${fontSizes.slogan.hd};
    font-weight: ${fontWeight.light};
    letter-spacing: 1.5px;
    width: 1173px;
  `}
  ${props => slideUpFadeInWhenFocus(props.isFocus)}
`

const SloganBox = (props) => {
  const { isFocus, slogan } = props
  return (
    <ContentContainer>
      <Slogan isFocus={isFocus}>{slogan}</Slogan>
    </ContentContainer>
  )
}

SloganBox.propTypes = {
  slogan: PropTypes.string.isRequired,
  isFocus: PropTypes.bool.isRequired,
}

export default SloganBox
