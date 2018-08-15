import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import chunk from 'lodash/chunk'
import FBIcon from '../../static/fb-logo_hover.svg'
import GithubIcon from '../../static/github-logo_hover.svg'
import GrayableSVG from './utils/grayable-svg'
import IGIcon from '../../static/ig-logo_hover.svg'
import LineIcon from '../../static/line-icon_hover.svg'
import map from 'lodash/map'
import MediumIcon from '../../static/Medium-logo_hover.svg'
import PropTypes from 'prop-types'
import React from 'react'
import RSSIcon from '../../static/rss-logo_hover.svg'
import styled from 'styled-components'

const _ = {
  map, chunk,
}

const IconLink = styled.a`
  position: relative;
  display: inline-block;
  margin-right: 11px;
  ${screen.mobileOnly`
    margin-right: 0;
  `}
`

const SVGHovered = styled.div`
  opacity: 0;
  ${IconLink}:hover & {
    opacity: 1;
  }
`

const SVGOverlay = styled.div`
  position: absolute;
  top: 0;
  opacity: ${props => props.defaultOpacity};
  ${IconLink}:hover & {
    opacity: 0;
  }
`

const StyledIcon = styled.div`
  svg{
    width: ${styles.icon.width.tabletAbove}px;
    height: ${styles.icon.height.tabletAbove}px;
  }
  ${screen.mobileOnly`
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
    this.selectIcon = this._selectIcon.bind(this)
  }
  _selectIcon(name) {
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
    return (
      <Icons>
        {
          _.map(list, (icon, indexofIcon) => {
            return (
              <IconLink
                key={`${icon.slug}-${indexofIcon}`}
                href={icon.link}
                target={icon.target}
              >
                <SVGHovered>
                  <StyledIcon>
                    {this.selectIcon(icon.slug)}
                  </StyledIcon>
                </SVGHovered>
                <SVGOverlay
                  defaultOpacity={icon.logoInPureBlackWhite ? styles.grayScaleOpacity.pureBlackWhiteSrc : styles.grayScaleOpacity.normal}
                >
                  <GrayableSVG
                    identity={`${icon.slug}-${indexofIcon}`}
                  >
                    <StyledIcon>
                      {this.selectIcon(icon.slug)}
                    </StyledIcon>
                  </GrayableSVG>
                </SVGOverlay>
              </IconLink>
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
