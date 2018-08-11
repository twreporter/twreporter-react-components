import { footerIconList } from '../configs.js'
import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import chunk from 'lodash/chunk'
import map from 'lodash/map'
import React from 'react'
import styled from 'styled-components'
import FBIcon from '../../static/fb-logo_hover.svg'
import FBIconDefault from '../../static/fb-logo_default.svg'
import GithubIcon from '../../static/github-logo_hover.svg'
import GithubIconDefault from '../../static/github-logo_default.svg'
import IGIcon from '../../static/ig-logo_hover.svg'
import IGIconDefault from '../../static/ig-logo_default.svg'
import LineIcon from '../../static/line-icon_hover.svg'
import LineIconDefault from '../../static/line-icon_default.svg'
import MediumIcon from '../../static/Medium-logo_hover.svg'
import MediumIconDefault from '../../static/Medium-logo_default.svg'
import RSSIcon from '../../static/rss-logo_hover.svg'
import RSSIconDefault from '../../static/rss-logo_default.svg'

const _ = {
  map, chunk,
}

const StyledIcon = styled.a`
  display: inline-block;
  margin-right: 11px;
  svg {
    width: ${styles.icon.width.tabletAbove}px;
    height: ${styles.icon.height.tabletAbove}px;
  }
  ${screen.mobileOnly`
    margin-right: 0;
    svg {
      width: ${styles.icon.width.mobile}px;
      height: ${styles.icon.height.mobile}px;
    }
  `}
`

const Icons = styled.div`
  margin-top: 20px;
  transform: translateX(-5px);
  ${screen.mobileOnly`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `}
`

class IconList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isIconOnHover: _.map(footerIconList, () => { return false }),
    }
    this.handleMouseEnter = this._handleMouseEnter.bind(this)
    this.handleMouseLeave = this._handleMouseLeave.bind(this)
    this.getIconByHoverState = this._getIconByHoverState.bind(this)
  }
  _handleMouseEnter(e, indexofIcon) {
    const { isIconOnHover } = this.state
    const newOnHoverArray = [...isIconOnHover]
    if (!newOnHoverArray[indexofIcon]) {
      newOnHoverArray[indexofIcon] = true
      this.setState({
        isIconOnHover: newOnHoverArray,
      })
    }
  }
  _handleMouseLeave() {
    const { isIconOnHover } = this.state
    const newOnHoverArray = _.map(isIconOnHover, () => { return false })
    this.setState({
      isIconOnHover: newOnHoverArray,
    })
  }
  _getIconByHoverState(name, onHover) {
    switch (name) {
      case 'facebook':
        return (
          onHover ?
            <FBIcon />
            : <FBIconDefault />
        )
      case 'instagram':
        return (
          onHover ?
            <IGIcon />
            : <IGIconDefault />
        )
      case 'line':
        return (
          onHover ?
            <LineIcon />
            : <LineIconDefault />
        )
      case 'medium':
        return (
          onHover ?
            <MediumIcon />
            : <MediumIconDefault />
        )
      case 'github':
        return (
          onHover ?
            <GithubIcon />
            : <GithubIconDefault />
        )
      case 'rss':
        return (
          onHover ?
            <RSSIcon />
            : <RSSIconDefault />
        )
      default:
        return null
    }
  }
  render() {
    const selectIcon = (name, index) => {
      const onHover = this.state.isIconOnHover[index]
      return this.getIconByHoverState(name, onHover)
    }
    return (
      <Icons
        onMouseLeave={this.handleMouseLeave}
      >
        {
          _.map(footerIconList, (icon, indexofIcon) => {
            return (
              <StyledIcon
                key={indexofIcon}
                href={icon.link}
                target={icon.target}
                onMouseEnter={e => this.handleMouseEnter(e, indexofIcon)}
                onMouseLeave={this.handleMouseLeave}
              >
                {selectIcon(icon.slug, indexofIcon)}
              </StyledIcon>
            )
          })
        }
      </Icons>
    )
  }
}

export default IconList
