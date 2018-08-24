import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const IconLink = styled.a`
  position: relative;
  display: inline-block;
  margin-right: 11px;
  ${screen.tabletAbove`
    width: ${styles.icon.width.tabletAbove}px;
    height: ${styles.icon.height.tabletAbove}px;  
  `}
  ${screen.mobileOnly`
    margin-right: 0;
    width: 30px;
    height: 30px;
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
  render() {
    const { list, staticFilePrefix } = this.props
    return (
      <Icons>
        {
          _.map(list, (icon, indexofIcon) => {
            const url = `${staticFilePrefix}${icon.slug}-logo-default.svg`
            const url_hover = `${staticFilePrefix}${icon.slug}-logo-hover.svg`
            return (
              <IconLink
                key={`${icon.slug}-${indexofIcon}`}
                href={icon.link}
                target={icon.target}
              >
                <img
                  alt={icon.slug}
                  src={url}
                  onMouseOver={(e) => { e.currentTarget.src = url_hover }}
                  onMouseOut={(e) => { e.currentTarget.src = url }}
                />
              </IconLink>
            )
          })
        }
      </Icons>
    )
  }
}

IconList.propTypes = {
  list: PropTypes.array,
  staticFilePrefix: PropTypes.string.isRequired,
}

IconList.defaultProps = {
  list: [],
  staticFilePrefix: '',
}

export default IconList
