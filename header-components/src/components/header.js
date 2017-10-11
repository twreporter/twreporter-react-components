import Categories from './categories'
import Channels from './channels'
import Icons from './icons'
import Logo from '../../static/twreporter-logo.svg'
import LogoBright from '../../static/twreporter-logo-bright.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
import { arrayToCssShorthand, screen } from 'shared/style-utils'
import { colors } from 'shared/common-variables'
import { HEADER_POSITION_UPON } from '../styles/constants'

const styles = {
  headerHeight: 109, // px
  headerHeightIndex: 62, // px
  topRowPadding: {
    mobile: [34, 10, 35, 24], // px
    tablet: [34, 20, 35, 35], // px
    desktop: [34, 58, 35, 70], // px
    index: {
      mobile: [18, 16, 18, 16], // px
      tablet: [18, 34, 18, 34], // px
      desktop: [18, 47, 18, 47], // px
    },
  },
  topRowMaxWidth: {
    tablet: 768, // px
    desktop: 1024,
    hd: 1440, // px
  },
}

const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const TopRow = styled.div`
  background-color: ${props => props.bgColor};
  height: ${props => (props.isIndex ? styles.headerHeightIndex : styles.headerHeight)}px;
`

const TopRowContent = styled.div`
  padding: ${props => (!props.isIndex ? arrayToCssShorthand(styles.topRowPadding.mobile) : arrayToCssShorthand(styles.topRowPadding.index.mobile))};
  ${screen.tabletOnly`
    padding: ${props => (!props.isIndex ? arrayToCssShorthand(styles.topRowPadding.tablet) : arrayToCssShorthand(styles.topRowPadding.index.tablet))};
  `}
  ${screen.desktopAbove`
    padding: ${props => (!props.isIndex ? arrayToCssShorthand(styles.topRowPadding.desktop) : arrayToCssShorthand(styles.topRowPadding.index.desktop))};
  `}
  box-sizing: border-box;
  height: ${props => (props.isIndex ? styles.headerHeightIndex : styles.headerHeight)}px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  ${screen.tabletOnly`
    max-width: ${styles.topRowMaxWidth.tablet}px;
  `}
  ${screen.desktopOnly`
    max-width: ${props => (props.isIndex ? styles.topRowMaxWidth.desktop : styles.topRowMaxWidth.hd)}px;
  `}
  ${screen.hdAbove`
    max-width: ${props => (props.headerPosition === HEADER_POSITION_UPON ? '100%' : `${styles.topRowMaxWidth.hd}px`)};
  `}
  margin: 0 auto;
`

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categoriesIsOpen: false,
    }
    this._closeCategoriesMenu = this._handleToggleCategoriesMenu.bind(this, 'close')
    this._handleToggleCategoriesMenu = this._handleToggleCategoriesMenu.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // close categories when location change
    if (this.state.categoriesIsOpen && this.props.pathName !== nextProps.pathName) {
      this.setState({
        categoriesIsOpen: false,
      })
    }
  }

  _handleToggleCategoriesMenu(force = '') {
    const result = force || (this.state.categoriesIsOpen ? 'close' : 'open')
    this.setState({
      categoriesIsOpen: (result === 'open'),
    })
  }

  _selectLogo(logoColor) {
    switch (logoColor) {
      case Header.logoColor.bright:
        return <LogoBright onMouseDown={this._closeCategoriesMenu} />
      case Header.logoColor.dark:
      default:
        return <Logo onMouseDown={this._closeCategoriesMenu} />
    }
  }

  render() {
    const { bgColor, fontColor, logoColor, pathName, isIndex, headerPosition } = this.props
    const { categoriesIsOpen } = this.state
    return (
      <HeaderContainer>
        <TopRow
          bgColor={bgColor}
          isIndex={isIndex}
        >
          <TopRowContent isIndex={isIndex} headerPosition={headerPosition} >
            <Link to="/">
              {this._selectLogo(logoColor)}
            </Link>
            <Icons />
          </TopRowContent>
        </TopRow>
        {isIndex ? null : <Channels handleToggleCategoriesMenu={this._handleToggleCategoriesMenu} fontColor={fontColor} pathName={pathName} categoriesIsOpen={categoriesIsOpen} headerPosition={headerPosition} />}
        {isIndex ? null : <Categories categoriesIsOpen={categoriesIsOpen} handleToggleCategoriesMenu={this._handleToggleCategoriesMenu} bgColor={bgColor} />}
      </HeaderContainer>
    )
  }
}

Header.logoColor = {
  dark: 'dark',
  bright: 'bright',
}

Header.propTypes = {
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  logoColor: PropTypes.string,
  pathName: PropTypes.string,
  isIndex: PropTypes.bool,
  headerPosition: PropTypes.string,
}

Header.defaultProps = {
  bgColor: '',
  fontColor: colors.black,
  logoColor: Header.logoColor.dark,
  isIndex: false,
  pathName: '',
  headerPosition: '',
}

export default Header
