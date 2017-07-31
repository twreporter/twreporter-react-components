import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Categories from './categories'
import Channels from './channels'
import Icons from './icons'
import { arrayToCssShorthand, screen } from 'shared/style-utils'
import { pageThemes } from 'shared/configs'
import { selectBgColor } from '../styles/theme'
import LogoBright from '../../static/twreporter-logo.svg'
import LogoDark from '../../static/twreporter-logo-dark.svg'
import { Link } from 'react-router'

const styles = {
  headerHeight: 109, // px
  topRowPadding: {
    mobile: [34, 10, 35, 24], // px
    tablet: [34, 20, 35, 35], // px
    desktop: [34, 58, 35, 70], // px
  },
  topRowMaxWidth: 1440, // px
}

const HeaderContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const TopRow = styled.div`
  background-color: ${props => selectBgColor(props.pageTheme)};
  height: ${styles.headerHeight}px;
`

const TopRowContent = styled.div`
  padding: ${arrayToCssShorthand(styles.topRowPadding.mobile)};
  ${screen.tabletOnly`
    padding: ${arrayToCssShorthand(styles.topRowPadding.tablet)};
  `}
  ${screen.desktopAbove`
    padding: ${arrayToCssShorthand(styles.topRowPadding.desktop)};
  `}
  box-sizing: border-box;
    height: ${styles.headerHeight}px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  max-width: ${styles.topRowMaxWidth}px;
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
    const { isChannelsDisplayed, pageTheme, pathName } = this.props
    const { categoriesIsOpen } = this.state
    return (
      <HeaderContainer>
        <TopRow pageTheme={pageTheme}>
          <TopRowContent>
            <Link to="/">
              {Header._selectLogo(pageTheme)}
            </Link>
            <Icons pageTheme={pageTheme} />
          </TopRowContent>
        </TopRow>
        {!isChannelsDisplayed ? null : <Channels handleToggleCategoriesMenu={this._handleToggleCategoriesMenu} pageTheme={pageTheme} pathName={pathName} categoriesIsOpen={categoriesIsOpen} />}
        {!isChannelsDisplayed ? null : <Categories categoriesIsOpen={categoriesIsOpen} handleToggleCategoriesMenu={this._handleToggleCategoriesMenu} pageTheme={pageTheme} />}
      </HeaderContainer>
    )
  }
}

Header.propTypes = {
  isChannelsDisplayed: PropTypes.bool,
  pageTheme: PropTypes.string,
  pathName: PropTypes.string.isRequired,
}

Header.defaultProps = {
  isChannelsDisplayed: true,
  pageTheme: pageThemes.bright,
}

export default Header
