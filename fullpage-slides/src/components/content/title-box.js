import { colors, fontSizes, fontWeight } from '../../constants/style-variables'
import { screen } from 'shared/style-utils'
import { slideUpFadeInWhenFocus } from '../../utils/style-mixins'
import ContentContainer from './container'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const TitleBoxContainer = styled(ContentContainer)`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  >* {
    ${props => slideUpFadeInWhenFocus(props.isFocus)}
  }
`

const MainTitle = styled.h1`
  color: ${colors.white};
  font-size: ${fontSizes.mainTitle.mobile};
  font-weight: ${fontWeight.extraLight};
  letter-spacing: 6.8px;
  line-height: 1.42;
  margin: 0;
  padding: 0;
  ${screen.tabletOnly`
    font-size: ${fontSizes.mainTitle.tablet};
  `}
  ${screen.desktopOnly`
    font-size: ${fontSizes.mainTitle.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.mainTitle.hd};
  `}
`

const MainSubTitle = styled.div`
  color: ${colors.white};
  font-size: ${fontSizes.mainSubTitle.mobile};
  font-weight: ${fontWeight.extraLight};
  letter-spacing: 1.9px;
  line-height: 1.42;
  ${screen.tabletOnly`
    font-size: ${fontSizes.mainSubTitle.tablet};
  `}
  ${screen.desktopOnly`
    font-size: ${fontSizes.mainSubTitle.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.mainSubTitle.hd};
  `}
`

const TitleBox = (props) => {
  const { isFocus, title, subtitle } = props
  return (
    <TitleBoxContainer isFocus={isFocus}>
      <div>
        {!title ? null : <MainTitle>{title}</MainTitle>}
        {!subtitle ? null : <MainSubTitle>{subtitle}</MainSubTitle>}
      </div>
    </TitleBoxContainer>
  )
}

TitleBox.propTypes = {
  isFocus: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default TitleBox
