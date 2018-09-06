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

class Icon extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMouseEnter: false,
    }
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter(e) {
    e.preventDefault()
    this.setState({
      isMouseEnter: true,
    })
  }

  handleMouseLeave(e) {
    e.preventDefault()
    this.setState({
      isMouseEnter: false,
    })
  }

  render() {
    const { isMouseEnter } = this.state
    const { icon, staticFilePrefix } = this.props
    const url = `${staticFilePrefix}${icon.slug}-logo-default.svg`
    const url_hover = `${staticFilePrefix}${icon.slug}-logo-hover.svg`
    return (
      <IconLink
        href={icon.link}
        target={icon.target}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          alt={icon.slug}
          src={isMouseEnter ? url_hover : url}
        />
      </IconLink>
    )
  }
}

Icon.propTypes = {
  icon: PropTypes.shape({
    link: PropTypes.string,
    slug: PropTypes.string,
    target: PropTypes.string,
  }).isRequired,
  staticFilePrefix: PropTypes.string.isRequired,
}

class IconList extends React.PureComponent {
  render() {
    const { list, staticFilePrefix } = this.props
    return (
      <Icons>
        {
          _.map(list, (icon, i) => (
            <Icon
              key={`${icon.slug}-${i}}`}
              icon={icon}
              index={i}
              staticFilePrefix={staticFilePrefix}
            />
          ))
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
