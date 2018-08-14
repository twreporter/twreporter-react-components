import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import chunk from 'lodash/chunk'
import FBIcon from '../../static/fb-logo_hover.svg'
import GithubIcon from '../../static/github-logo_hover.svg'
import IGIcon from '../../static/ig-logo_hover.svg'
import LineIcon from '../../static/line-icon_hover.svg'
import map from 'lodash/map'
import MediumIcon from '../../static/Medium-logo_hover.svg'
import PropTypes from 'prop-types'
import React from 'react'
import RSSIcon from '../../static/rss-logo_hover.svg'
import styled from 'styled-components'

const totalIconNumber = 6

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
  filter: grayscale(100%);
  opacity: ${props => props.defaultOpacity};
  &:hover{
    filter: none;
    opacity: 1;
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
  opacity: 0.8;
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
      isIconOnHover: _.map([...Array(totalIconNumber)], () => { return false }),
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
  _getIconByHoverState(name) {
    switch (name) {
      case 'facebook':
        return (
          <FBIcon />
        )
      case 'instagram':
        return (
          <IGIcon />
        )
      case 'line':
        return (
          <LineIcon />
        )
      case 'medium':
        return (
          <MediumIcon />
        )
      case 'github':
        return (
          <GithubIcon />
        )
      case 'rss':
        return (
          <RSSIcon />
        )
      default:
        return null
    }
  }
  render() {
    const { list } = this.props
    const selectIcon = (name, index) => {
      const onHover = this.state.isIconOnHover[index]
      return this.getIconByHoverState(name, onHover)
    }
    return (
      <Icons
        onMouseLeave={this.handleMouseLeave}
      >
        {
          _.map(list, (icon, indexofIcon) => {
            return (
              <StyledIcon
                key={indexofIcon}
                href={icon.link}
                target={icon.target}
                defaultOpacity={icon.logoInPureBlackWhite ? 0.4 : 0.8}
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

IconList.propTypes = {
  list: PropTypes.array.isRequired,
}

IconList.defaultProps = {
  list: [],
}

export default IconList
