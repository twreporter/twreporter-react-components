import Layer from './layer'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { layerPropTypes } from './prop-types'

import map from 'lodash/map'

const _ = {
  map,
}

const CinemagraphContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor};
`

class Wrapper extends Component {
  render() {
    const { layers, cinemagraphId, backgroundColor, animationOn } = this.props
    const layersJSX = _.map(layers, (layer, i) => (
      <Layer
        key={`${cinemagraphId}-${layer.id}`}
        index={i}
        layer={layer}
        animationOn={animationOn}
      />))
    return (
      <CinemagraphContainer
        id={cinemagraphId}
        backgroundColor={backgroundColor}
      >
        {layersJSX}
      </CinemagraphContainer>
    )
  }
}

Wrapper.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  cinemagraphId: PropTypes.string.isRequired,
  layers: PropTypes.arrayOf(layerPropTypes).isRequired,
  animationOn: PropTypes.bool,
}

Wrapper.defaultProps = {
  backgroundColor: 'black',
  cinemagraphId: 'cinemagraph',
  layers: [],
  animationOn: false,
}

export default Wrapper
