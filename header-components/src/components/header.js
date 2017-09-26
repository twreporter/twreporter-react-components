import { arrayToCssShorthand, screen } from 'shared/style-utils'

import Categories from './categories'
import Channels from './channels'
import Icons from './icons'
import { Link } from 'react-router'
import LogoBright from '../../static/twreporter-logo.svg'
import LogoDark from '../../static/twreporter-logo-dark.svg'
import PropTypes from 'prop-types'
import React from 'react'
import { colors } from 'shared/common-variables'
import { pageThemes } from 'shared/configs'
import { selectBgColor } from '../styles/theme'
import styled from 'styled-components'

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
  background-color: ${props => (props.isIndex ? colors.indexBodyBgWhite : selectBgColor(props.pageTheme))};
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
    max-width: ${styles.topRowMaxWidth.hd}px;
  `}
  margin: 0 auto;
`

class Header extends React.PureComponent {
  static _selectLogo(pageTheme) {
    switch (pageTheme) {
      case pageThemes.dark:
        return <LogoDark onMouseDown={this._closeCategoriesMenu} />
      case pageThemes.bright:
      default:
        return <LogoBright onMouseDown={this._closeCategoriesMenu} />
    }
  }

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

  render() {
    const { pageTheme, pathName, isIndex } = this.props
    const { categoriesIsOpen } = this.state
    return (
      <HeaderContainer>
        <TopRow pageTheme={pageTheme} isIndex={isIndex}>
          <TopRowContent isIndex={isIndex}>
            <Link to="/">
              {Header._selectLogo(pageTheme)}
            </Link>
            <Icons
              pageTheme={pageTheme}
              ifAuthenticated={this.props.ifAuthenticated}
              signOutAction={this.props.signOutAction}
            />
          </TopRowContent>
        </TopRow>
        {isIndex ? null : <Channels handleToggleCategoriesMenu={this._handleToggleCategoriesMenu} pageTheme={pageTheme} pathName={pathName} categoriesIsOpen={categoriesIsOpen} />}
        {isIndex ? null : <Categories categoriesIsOpen={categoriesIsOpen} handleToggleCategoriesMenu={this._handleToggleCategoriesMenu} pageTheme={pageTheme} />}
      </HeaderContainer>
    )
  }
}

Header.propTypes = {
  pageTheme: PropTypes.string,
  pathName: PropTypes.string,
  isIndex: PropTypes.bool,
  ifAuthenticated: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired,
}

Header.defaultProps = {
  pageTheme: pageThemes.bright,
  isIndex: false,
  pathName: '',
}

export default Header
