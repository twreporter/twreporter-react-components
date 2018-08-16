import { screen } from 'shared/style-utils'
import { STATICFILEPREFIX } from '../configs'
import { styles } from '../styles/theme'
import chunk from 'lodash/chunk'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import React from 'react'
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

const StyledIcon = styled.div`
  width: ${styles.icon.width.tabletAbove}px;
  height: ${styles.icon.height.tabletAbove}px;
  ${screen.mobileOnly`
    width: ${styles.icon.width.mobile}px;
    height: ${styles.icon.height.mobile}px;
  `}
  img {
    width: 100%;
  }
`

class IconList extends React.PureComponent {
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
                <StyledIcon>
                  <img
                    alt={icon.slug}
                    src={`${STATICFILEPREFIX}${icon.slug}-logo-default.svg`}
                    onMouseOver={(e) => { e.currentTarget.src = `${STATICFILEPREFIX}${icon.slug}-logo-hover.svg` }}
                    onMouseOut={(e) => { e.currentTarget.src = `${STATICFILEPREFIX}${icon.slug}-logo-default.svg` }}
                  />
                </StyledIcon>
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
}

IconList.defaultProps = {
  list: [],
}

export default IconList
