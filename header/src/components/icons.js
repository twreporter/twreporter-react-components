import BookmarkListIcon from '../../static/bookmark-list-icon.svg'
import PropTypes from 'prop-types'
import React from 'react'
import SearchBox from './search-box'
import SearchIcon from '../../static/search-icon.svg'
import SignInIcon from '../../static/member-icon.svg'
import SignOutIcon from '../../static/signout.svg'
import styled from 'styled-components'
import { Link } from 'react-router'
import { colors, fonts } from 'shared/common-variables'
import { screen } from 'shared/style-utils'
import { searchConfigs, memberConfigs, bookmarkConfigs } from 'shared/configs'

// import DonateIcon from '../../static/donate-icon.svg'

const styles = {
  iconContainerSize: 3, // em
}

/* Icon alt text takes 2 fullwidth characters specifically */
const ICON_ALT_TEXT = {
  SEARCH: '搜尋',
  SIGN_OUT: '登出',
  MEMBER: '會員',
  BOOKMARK: '書籤',
}

const IconsContainer = styled.div`
  position: relative;
  display: table;
  ${screen.mobileOnly`
    display: none;
  `}
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
    const { isSearchOpened } = this.state
    const { ifAuthenticated, signOutAction } = this.props
    const Member = (
      <Link
        to={`/${memberConfigs.path}`}
        onClick={() => {
          signOutAction()
        }}
      >
        {ifAuthenticated ? <SignOutIcon /> : <SignInIcon />}
        <span>{ifAuthenticated ? `${ICON_ALT_TEXT.SIGN_OUT}` : `${ICON_ALT_TEXT.MEMBER}` }</span>
      </Link>
    )
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
        />
        <HideOnDesktop>
          <Link to={`/${searchConfigs.path}`}>
            <SearchIcon />
          </Link>
        </HideOnDesktop>
        <IconContainer>
          <Link to={`/${bookmarkConfigs.path}`}>
            <BookmarkListIcon />
            <span>{ICON_ALT_TEXT.BOOKMARK}</span>
          </Link>
        </IconContainer>
        <IconContainer>
          {Member}
        </IconContainer>
      </IconsContainer>
    )
  }
}

Icons.propTypes = {
  ifAuthenticated: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired,
}

export default Icons
