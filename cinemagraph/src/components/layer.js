import { animationsToCss, screen } from 'shared/style-utils'
import { layerPropTypes } from './prop-types'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import get from 'lodash/get'

const _ = {
  get,
}

const LayerContent = styled.div`
  will-change: transform;
  position: absolute;
  z-index: ${props => props.index};
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-repeat: no-repeat;
  ${screen.mobileOnly`
    background-size: ${props => _.get(props, 'bgSize.mobile')};
    background-image: url(${props => _.get(props, 'url.mobile')});
    background-position: ${props => _.get(props, 'bgPosition.mobile')};
  `}
  ${screen.tabletOnly`
    background-size: ${props => _.get(props, 'bgSize.tablet')};
    background-image: url(${props => _.get(props, 'url.tablet')});
    background-position: ${props => _.get(props, 'bgPosition.tablet')};
  `}
  ${screen.desktopAbove`
    background-size: ${props => _.get(props, 'bgSize.desktop')};
    background-image: url(${props => _.get(props, 'url.desktop')});
    background-position: ${props => _.get(props, 'bgPosition.desktop')};
  `}
  ${props => (!props.animationOn ? '' : animationsToCss(props.animation))}
`

class Layer extends Component {
  render() {
    const { layer, index, animationOn } = this.props
    const bgPosition = _.get(layer, 'bgPosition', {})
    const bgSize = _.get(layer, 'bgSize', {})
    const url = _.get(layer, 'image.resizedTargets', '')
    const animation = _.get(layer, 'animation', '')
    return (
      <LayerContent
        animation={animation}
        bgPosition={bgPosition}
        bgSize={bgSize}
        index={index}
        url={url}
        animationOn={animationOn}
      />
    )
  }
}

Layer.propTypes = {
  index: PropTypes.number.isRequired,
  layer: layerPropTypes.isRequired,
  animationOn: PropTypes.bool,
}

Layer.defaultProps = {
  animationOn: false,
}

export default Layer
