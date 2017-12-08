import BookmarkListIcon from '../../static/bookmark-list-icon.svg'
import CustomizedLink from './customized-link'
import DonationIcon from '../../static/donate-icon.svg'
import PropTypes from 'prop-types'
import React from 'react'
import SearchIcon from '../../static/search-icon.svg'
import SignInIcon from '../../static/member-icon.svg'
import SignOutIcon from '../../static/signout.svg'
import SubscriptionIcon from '../../static/subscribe-icon.svg'
import get from 'lodash/get'
import serviceStrings, { SERVICE_LABELS } from 'shared/service-strings'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { Link } from 'react-router'
import { channelConfigs, channels } from 'shared/configs'
import { colors } from 'shared/common-variables'
import { screen } from 'shared/style-utils'

const _ = {
  get,
}

const serviceContent = (ifAuthenticated) => {
  return () => {
    const { SIGN_IN, SIGN_OUT, SEARCH, BOOKMARK, DONATION, SUSBSCRIPTION } = serviceStrings
    return [
      { ss: ifAuthenticated ? SIGN_OUT : SIGN_IN, Icon: ifAuthenticated ? SignOutIcon : SignInIcon },
      { ss: SEARCH, Icon: SearchIcon },
      { ss: BOOKMARK, Icon: BookmarkListIcon },
      { ss: DONATION, Icon: DonationIcon },
      { ss: SUSBSCRIPTION, Icon: SubscriptionIcon },
    ]
  }
}

const DEFAULT_HEIGHT_DIVISION = 90
const ROW_PER_COLUMN = 5
const DEFAULT_HEIGHT_FLEX_BOX = DEFAULT_HEIGHT_DIVISION * ROW_PER_COLUMN

const Container = styled.div`
  height: ${DEFAULT_HEIGHT_FLEX_BOX}px;
  margin-top: ${props => (props.showUp ? 0 : `-${DEFAULT_HEIGHT_FLEX_BOX}px`)};
  width: 100%;
  transition: margin-top 600ms ease-in-out;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  background-color: ${props => (props.isIndex ? `${colors.sectionGrey}` : 'white')};
  display: none;
  ${screen.mobileOnly`
    display: flex;
  `}
`

const ColumnFrame = styled.div`
  width: 50%;
`

const Division = styled.div`
  width: 100%;
  height: ${DEFAULT_HEIGHT_DIVISION}px;
  line-height: ${DEFAULT_HEIGHT_DIVISION}px;
  border: 0.5px solid #d8d7d7;
  box-sizing: border-box;
  margin: 0;
  cursor: pointer;
`

const IconFrame = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
  margin-right: 20px;
  svg {
    height: 100%;
    position: absolute;
    left: 50%;
    top: 58%;
    transform: translate(-50%, -50%);
  }
`

const TextFrame = styled.div`
  display: inline-block;
`

const ColumnChannel = ({ handleIssueOnClick, isIndex, handleOnHamburgerClick }) => {
  const divisions = channels.map((channel) => {
    const channelConfig = _.get(channelConfigs, channel, {})
    const channelPath = _.get(channelConfig, 'path', '')
    const channelPrefix = _.get(channelConfig, 'prefix', '')
    const channelText = _.get(channelConfig, 'text', '')
    if (channelPath === '?section=category' && isIndex) {
      return (
        <Division
          onClick={() => {
            handleOnHamburgerClick()
            handleIssueOnClick()
          }}
          key={`Division_${channelText}`}
        >
          <TextFrame>
            {channelText}
          </TextFrame>
        </Division>
      )
    }
    return (
      <Link
        to={`${channelPrefix}${channelPath}`}
        key={`Division_${channelText}`}
      >
        <Division
          onClick={() => {
            handleOnHamburgerClick()
          }}
        >
          <TextFrame>
            {channelText}
          </TextFrame>
        </Division>
      </Link>
    )
  })
  return (
    <ColumnFrame>
      {divisions}
    </ColumnFrame>
  )
}

ColumnChannel.defaultProps = {
  handleOnHamburgerClick: () => {},
}

ColumnChannel.propTypes = {
  handleIssueOnClick: PropTypes.func.isRequired,
  handleOnHamburgerClick: PropTypes.func,
  isIndex: PropTypes.bool.isRequired,
}


const ColumnService = ({ ifAuthenticated, signOutAction, handleOnHamburgerClick }) => {
  const divisions = serviceContent(ifAuthenticated)().map((division) => {
    const { ss, Icon } = division
    return (
      <CustomizedLink
        currentLinkType={ss.type}
        path={ss.path}
        key={`Division_${ss.label}`}
      >
        <Division
          onClick={() => {
            handleOnHamburgerClick()
            if (ss.label === SERVICE_LABELS.SIGN_OUT && ifAuthenticated) signOutAction()
          }}
        >
          <IconFrame>
            <Icon />
          </IconFrame>
          <TextFrame>
            {ss.label}
          </TextFrame>
        </Division>
      </CustomizedLink>
    )
  })
  return (
    <ColumnFrame>
      {divisions}
    </ColumnFrame>
  )
}

ColumnService.defaultProps = {
  handleOnHamburgerClick: () => {},
}

ColumnService.propTypes = {
  ifAuthenticated: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired,
  handleOnHamburgerClick: PropTypes.func,
}


class SlideDownPanel extends React.Component {
  constructor(props) {
    super(props)
    this.handleIssueOnClick = this._handleIssueOnClick.bind(this)
    this.firstScroll = true
  }

  _smoothScroll() {
    if (typeof document !== 'undefined') {
      const { categoryId } = this.props
      const elem = document.getElementById(categoryId)
      const offsetTop = _.get(elem, 'offsetTop', 0)
      if (offsetTop) {
        if (this.firstScroll) {
          this.firstScroll = false
          return smoothScroll(offsetTop - 100)
        }
        return smoothScroll(offsetTop)
      }
    }
    return null
  }

  _handleIssueOnClick() {
    this._smoothScroll()
  }

  render() {
    const { showUp, isIndex, ifAuthenticated, signOutAction, handleOnHamburgerClick } = this.props
    return (
      <Container showUp={showUp} isIndex={isIndex} >
        <ColumnChannel
          handleIssueOnClick={this.handleIssueOnClick}
          isIndex={isIndex}
          handleOnHamburgerClick={handleOnHamburgerClick}
        />
        <ColumnService
          ifAuthenticated={ifAuthenticated}
          signOutAction={signOutAction}
          handleOnHamburgerClick={handleOnHamburgerClick}
        />
      </Container>
    )
  }
}

SlideDownPanel.defaultProps = {
  showUp: false,
  isIndex: false,
  categoryId: '',
  handleOnHamburgerClick: () => {},
}

SlideDownPanel.propTypes = {
  showUp: PropTypes.bool,
  categoryId: PropTypes.string,
  isIndex: PropTypes.bool,
  ifAuthenticated: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired,
  handleOnHamburgerClick: PropTypes.func,
}

export default SlideDownPanel
