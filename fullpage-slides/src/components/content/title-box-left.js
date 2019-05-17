import { colors, fontSizes, fontWeight } from '../../constants/style-variables'
import { screen } from 'shared/style-utils'
import ContentContainer from './container'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import * as time from '../../constants/time'

const padding = {
  mobile: '0 20px 93px 20px',
  tablet: '0 45px 72px 45px',
  desktop: '0 60px 117px 60px',
  hd: '0 80px 147px 80px',
}

const subtitlePaddingLeft = {
  mobile: '4px',
  tablet: '7px',
  desktop: '7px',
  hd: '7px',
}

const datePaddingLeft = {
  mobile: '4px',
  tablet: '5px',
  desktop: '6px',
  hd: '6px',
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeInAnimation = css`animation: ${fadeIn} ${time.firstPageItemEntranceDuration}ms ease ${time.firstPageItemEntranceDelay}ms both;`

const Container = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  padding: ${padding.mobile};
  ${screen.tabletAbove`
    padding: ${padding.tablet};
  `}
  ${screen.desktopAbove`
    padding: ${padding.desktop};
  `}
  ${screen.hdAbove`
    padding: ${padding.hd};
  `}
`

const MainTitle = styled.h1`
  color: ${colors.white};
  font-size: ${fontSizes.leftMainTitle.mobile};
  font-weight: ${fontWeight.extraLight};
  letter-spacing: 3px;
  line-height: 1.25;
  margin: 0;
  padding: 0;
  ${screen.tabletOnly`
    font-size: ${fontSizes.leftMainTitle.tablet};
    letter-spacing: 2px;
  `}
  ${screen.desktopOnly`
    font-size: ${fontSizes.leftMainTitle.desktop};
    letter-spacing: 2px;
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.leftMainTitle.hd};
    letter-spacing: 6px;
  `}
  ${fadeInAnimation}
`

const MainSubTitle = styled.div`
  color: ${colors.white};
  font-size: ${fontSizes.mainSubTitle.mobile};
  font-weight: ${fontWeight.medium};
  letter-spacing: 0.8px;
  line-height: 1.42;
  padding-left: ${subtitlePaddingLeft.mobile};
  ${screen.tabletOnly`
    font-size: ${fontSizes.mainSubTitle.tablet};
    letter-spacing: 1.9px;
    padding-left: ${subtitlePaddingLeft.tablet};
  `}
  ${screen.desktopOnly`
    font-size: ${fontSizes.mainSubTitle.desktop};
    letter-spacing: 1.9px;
    padding-left: ${subtitlePaddingLeft.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.mainSubTitle.hd};
    letter-spacing: 3.2px;
    padding-left: ${subtitlePaddingLeft.hd};
  `}
  ${fadeInAnimation}
`

const Date = styled.div`
  color: ${colors.white};
  font-size: ${fontSizes.mainSubTitle.mobile};
  font-weight: ${fontWeight.extraLight};
  letter-spacing: 1.9px;
  line-height: 1.42;
  padding-left: ${datePaddingLeft.mobile};
  margin-top: 15px;
  ${screen.tabletOnly`
    font-size: ${fontSizes.mainSubTitle.tablet};
    margin-top: 20px;
    padding-left: ${datePaddingLeft.tablet};
  `}
  ${screen.desktopOnly`
    font-size: ${fontSizes.mainSubTitle.desktop};
    margin-top: 25px;
    padding-left: ${datePaddingLeft.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.mainSubTitle.hd};
    letter-spacing: 3.4px;
    margin-top: 50px;
    padding-left: ${datePaddingLeft.hd};
  `}
  ${fadeInAnimation}
`

const TitleBoxLeft = (props) => {
  const { isFocus, title, subtitle, date } = props
  return (
    <Container isFocus={isFocus}>
      {!subtitle ? null : <MainSubTitle>{subtitle}</MainSubTitle>}
      {!title ? null : <MainTitle>{title}</MainTitle>}
      {!date ? null : <Date>{date}</Date>}
    </Container>
  )
}

TitleBoxLeft.propTypes = {
  isFocus: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default TitleBoxLeft
