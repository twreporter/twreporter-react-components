import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import map from 'lodash/map'
import { channelConfigs, channels } from 'shared/configs'
import { arrayToCssShorthand, linkUnderline, screen } from 'shared/style-utils'
import { colors, fonts } from 'shared/common-variables'
import { selectTextColor } from '../styles/theme'
import { Link } from 'react-router'

const _ = {
  get,
  map,
}

const styles = {
  channelsPositionTop: {
    desktop: 30, // px
  },
  channelsPositionLeft: {
    desktop: 352, // px
    hd: 389, // px
  },
  channelsPadding: {
    mobile: [5, 24], // px
    tablet: [5, 220], // px
  },
  itemMargin: {
    mobile: 0, // px
    tablet: 0, // px
    desktop: [0, 41, 0, 0], // px
    hd: [0, 68, 0, 0], // px
  },
  itemPadding: {
    mobile: [5, 1], // px
    tablet: [5, 1], // px
    desktop: [8, 1], // px
  },
  channelsContainerMaxWidth: 1440, // px
}

const ChannelsContainer = styled.div`
  width: 100%;
  ${screen.hdAbove`
    max-width: ${styles.channelsContainerMaxWidth}px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `}
`

const ChannelsContent = styled.ul`
  justify-content: space-between;
  padding: ${arrayToCssShorthand(styles.channelsPadding.mobile)};
  background-color: ${colors.white};
  ${screen.tabletOnly`
    justify-content: space-around;
    padding: ${arrayToCssShorthand(styles.channelsPadding.tablet)};
  `}
  ${screen.desktopAbove`
    justify-content: space-around;
    position: absolute;
    top: ${styles.channelsPositionTop.desktop}px;
    left: ${styles.channelsPositionLeft.desktop}px;
    background-color: transparent;
  `}
  ${screen.hdAbove`
    left: ${styles.channelsPositionLeft.hd}px;
  `}
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  list-style-type: none;
  margin: 0;
`

const ChannelContainer = styled.li`
  padding: ${arrayToCssShorthand(styles.itemPadding.mobile)};
  margin: ${arrayToCssShorthand(styles.itemMargin.mobile)};
  color: ${colors.black};
  a {
    &, :hover, :active, :link, :visited {
      color: inherit;
      text-decoration: none;
    }
  }
  ${screen.tabletOnly`
    padding: ${arrayToCssShorthand(styles.itemPadding.tablet)};
    margin: ${arrayToCssShorthand(styles.itemMargin.tablet)};
  `}
  ${screen.desktopAbove`
    padding: ${arrayToCssShorthand(styles.itemPadding.desktop)};
    margin: ${arrayToCssShorthand(styles.itemMargin.desktop)};
    color: ${props => selectTextColor(props.pageTheme)};
    &:hover {
      color: ${colors.hoverCategories};
    }
  `}
  position: relative;
  font-size: ${fonts.size.medium};
  font-weight: ${fonts.weight.bold};
  letter-spacing: .5px;
  cursor: pointer;
  &::after {
    ${props => (props.isActive ? linkUnderline : '')}
  }
`

class Channels extends React.PureComponent {
  static _pathToActiveChannel(pathName) {
    const currentPaths = pathName.split('/')
    switch (true) {
      case (currentPaths[1] === channelConfigs.photography.path):
        return 'photography' // key of channelConfigs
      case (currentPaths[1] === channelConfigs.topics.path):
        return 'topics' // key of channelConfigs
      case (currentPaths[1] === 'categories'):
        switch (true) {
          case (currentPaths[2] === channelConfigs.infographic.path):
            return 'infographic' // key of channelConfigs
          case (currentPaths[2] === channelConfigs.review.path):
            return 'review' // key of channelConfigs
          default:
            return 'none'
        }
      default:
        return 'none'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      activeChannel: Channels._pathToActiveChannel(this.props.pathName),
    }
    this._handleClickChannel = this._handleClickChannel.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const nextPathName = nextProps.pathName
    const nextActiveChannel = Channels._pathToActiveChannel(nextPathName)
    if (nextActiveChannel !== this.state.activeChannel && this.props.pathName !== nextPathName) {
      this.setState({
        activeChannel: nextActiveChannel,
      })
    }
  }

  _handleClickChannel(e) {
    e.preventDefault()
    const data = e.currentTarget.dataset
    const channelType = _.get(data, 'channelType', '')
    const channelName = _.get(data, 'channelName', '')
    if (channelType === 'submenu') {
      this.props.handleToggleCategoriesMenu()
      if (this.props.categoriesIsOpen && channelName === 'categories') {
        this.setState({
          activeChannel: 'none',
        })
      } else {
        this.setState({
          activeChannel: channelName,
        })
      }
    } else {
      this.props.handleToggleCategoriesMenu('close')
      this.setState({
        activeChannel: channelName,
      })
    }
  }

  render() {
    const { pageTheme } = this.props
    const { activeChannel } = this.state
    const channelsJSX = _.map(channels, (channelName) => {
      const channelConfig = _.get(channelConfigs, channelName, {})
      const channelType = _.get(channelConfig, 'type', '')
      const channelPath = _.get(channelConfig, 'path', '')
      const channelPrefix = _.get(channelConfig, 'prefix', '')
      const channelText = _.get(channelConfig, 'text', '')
      const isActive = (channelName === activeChannel)
      return (
        <ChannelContainer
          key={channelName}
          isActive={isActive}
          onClick={this._handleClickChannel}
          data-channel-type={channelType}
          data-channel-name={channelName}
          pageTheme={pageTheme}
        >
          <Link to={channelType !== 'link' ? null : `${channelPrefix}${channelPath}`}>
            {channelText}
          </Link>
        </ChannelContainer>
      )
    })
    return (
      <ChannelsContainer>
        <ChannelsContent pageTheme={pageTheme}>
          {channelsJSX}
        </ChannelsContent>
      </ChannelsContainer>
    )
  }
}

Channels.propTypes = {
  handleToggleCategoriesMenu: PropTypes.func.isRequired,
  pageTheme: PropTypes.string.isRequired,
  pathName: PropTypes.string.isRequired,
  categoriesIsOpen: PropTypes.bool.isRequired,
}

export default Channels
