import { colors, fontSizes, fontWeight, zIndex } from '../constants/style-variables'
import { screen } from 'shared/style-utils'
import Logo from '../../static/logo.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from './styled-link'

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.header};
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  height: 24px;
  margin: 26px;
  >a {
    height: 100%;
    >svg {
      height: 100%;
    }
  }
  ${screen.tabletAbove`
    margin: 45px;
  `}
  ${screen.desktopAbove`
    margin: 45px 60px;
  `}
  ${screen.hdAbove`
    height: 36px;
    margin: 60px 80px;
  `}
`

const Separator = styled.div`
  width: .5px;
  height: 21px;
  margin: 0 16px;
  background-color: ${colors.white};
  will-change: opacity;
  opacity: ${props => (props.isTitleShown ? '.7' : '0')};
  transition: opacity 1s ease;
  ${screen.hdAbove`
    width: 1px;
    height: 32px;
    margin: 0 23px;
  `}
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: ${colors.white};
  font-weight: ${fontWeight.extraLight};
  font-size: ${fontSizes.headerTitle.mobile};
  line-height: 1;
  ${screen.tabletAbove`
    font-size: ${fontSizes.headerTitle.tablet};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.headerTitle.hd};
  `}
  will-change: opacity;
  opacity: ${props => (props.isTitleShown ? '.7' : '0')};
  transition: opacity 1s ease;
`

class Header extends React.PureComponent {
  render() {
    const { title, isTitleShown } = this.props
    return (
      <Container>
        <Link href="https://www.twreporter.org/" target="_blank" rel="noopener noreferrer"><Logo /></Link>
        {!title ? null : <Separator isTitleShown={isTitleShown} />}
        {!title ? null : <Title isTitleShown={isTitleShown}>{title}</Title>}
      </Container>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string,
  isTitleShown: PropTypes.bool.isRequired,
}

Header.defaultProps = {
  title: '',
  isTitleShown: false,
}

export default Header
