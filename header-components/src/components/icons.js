import React from 'react'
import styled from 'styled-components'
import SearchBox from './search-box'
import SearchIcon from '../../static/search-icon.svg'
import { screen } from 'shared/style-utils'
import { colors, fonts } from 'shared/common-variables'
import { searchConfigs } from 'shared/configs'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

// import MemberIcon from '../../static/member-icon.svg'
// import BookmarkListIcon from '../../static/bookmark-list-icon.svg'
// import DonateIcon from '../../static/donate-icon.svg'

const styles = {
  iconContainerSize: 3, // em
}

/* Icon alt text takes 2 fullwidth characters specifically */
const ICON_ALT_TEXT = {
  SEARCH: '搜尋',
}

const IconsContainer = styled.div`
  position: relative;
  display: table;
`

const IconContainer = styled.div`
  font-size: ${fonts.size.base};
  cursor: pointer;
  display: table-cell;
  width: ${styles.iconContainerSize}em;
  height: ${styles.iconContainerSize}em;
  line-height: 1;
  vertical-align: middle;
  text-align: center;
  position: relative;
  svg {
    height: 100%;
  }
  span {
    display: none;
  }
  ${screen.desktopAbove`
    svg {
      opacity: 1;
      transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      position: absolute;
      height: 100%;
      top: 0;
      left: 30%;
      z-index: 1;
    }
    span {
      display: inline;
      white-space: nowrap;
      overflow: hidden;
      color: ${colors.iconAltText};
      font-weight: ${fonts.weight.bold};
      opacity: 0;
      transition: transform .3s ease-in-out, opacity .3s ease-in-out;
      transform: scale(.4, 1.2);
      position: absolute;
      height: 100%;
      width: 2em;
      line-height: ${styles.iconContainerSize};
      vertical-align: middle;
      top: 0;
      left: 17%;
      z-index: 2;
    }
    &:hover {
      svg {
        transform: scale(1.7, .5);
        opacity: 0;
      }
      span {
        transform: scale(1, 1);
        opacity: 1;
      }
    }
  `}
`

const DisplayOnDesktop = IconContainer.extend`
  display: none;
  ${props => (props.isSearchOpened ? '' : screen.desktopAbove`
    display: table-cell;
  `)}
`

const HideOnDesktop = IconContainer.extend`
  display: table-cell;
  ${screen.desktopAbove`
    display: none;
  `}
`

class Icons extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSearchOpened: false,
    }
    this._closeSearchBox = this._closeSearchBox.bind(this)
    this._handleClickSearch = this._handleClickSearch.bind(this)
  }
  _closeSearchBox() {
    this.setState({
      isSearchOpened: false,
    })
  }
  _handleClickSearch(e) {
    e.preventDefault()
    this.setState({
      isSearchOpened: true,
    })
  }
  render() {
    const { pageTheme } = this.props
    const { isSearchOpened } = this.state
    return (
      <IconsContainer>
        <DisplayOnDesktop
          onClick={this._handleClickSearch}
          isSearchOpened={isSearchOpened}
        >
          <SearchIcon />
          <span>{ICON_ALT_TEXT.SEARCH}</span>
        </DisplayOnDesktop>
        <SearchBox
          isSearchOpened={isSearchOpened}
          closeSearchBox={this._closeSearchBox}
          pageTheme={pageTheme}
        />
        <HideOnDesktop>
          <Link to={`/${searchConfigs.path}`}>
            <SearchIcon />
          </Link>
        </HideOnDesktop>
      </IconsContainer>
    )
  }
}

Icons.propTypes = {
  pageTheme: PropTypes.string.isRequired,
}

export default Icons
