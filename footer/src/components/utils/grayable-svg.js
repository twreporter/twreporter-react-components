import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const xmlns = 'http://www.w3.org/2000/svg'

const SVGWrapper = styled.div``

class GrayableSVG extends React.PureComponent {
  constructor(props) {
    super(props)
    this.addGrayScaleFilter = this._addGrayScaleFilter.bind(this)
  }
  componentDidMount() {
    this.addGrayScaleFilter()
  }
  _addGrayScaleFilter() {
    const svgNode = this.svgoverlay.childNodes[0].childNodes[0]
    const svgFilterNode = document.createElementNS(xmlns, 'filter')
    svgFilterNode.setAttribute('id', `grayscale-${this.props.identity}`)
    const feCompositeNode = document.createElementNS(xmlns, 'feComposite')
    feCompositeNode.setAttribute('result', 'inputTo_38')
    feCompositeNode.setAttribute('in', 'SourceGraphic')
    feCompositeNode.setAttribute('in2', 'SourceGraphic')
    feCompositeNode.setAttribute('operator', 'arithmetic')
    feCompositeNode.setAttribute('k1', '0')
    feCompositeNode.setAttribute('k2', '1')
    feCompositeNode.setAttribute('k3', '0')
    feCompositeNode.setAttribute('k4', '0')
    const feColorMatrixNode = document.createElementNS(xmlns, 'feColorMatrix')
    feColorMatrixNode.setAttribute('type', 'saturate')
    feColorMatrixNode.setAttribute('values', '0')
    svgFilterNode.appendChild(feCompositeNode)
    svgFilterNode.appendChild(feColorMatrixNode)
    svgNode.insertBefore(svgFilterNode, svgNode.firstChild)
    const graphNode = svgNode.getElementsByTagName('g')[0]
    const imageNode = svgNode.getElementsByTagName('image')[0]
    if (graphNode) {
      graphNode.setAttribute('filter', `url(#grayscale-${this.props.identity})`)
    } else if (imageNode) {
      imageNode.setAttribute('filter', `url(#grayscale-${this.props.identity})`)
    }
  }
  render() {
    return (
      <SVGWrapper
        innerRef={(node) => { this.svgoverlay = node }}
      >
        {this.props.children}
      </SVGWrapper>
    )
  }
}

GrayableSVG.propTypes = {
  identity: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

GrayableSVG.defaultProps = {
  identity: '0',
}

export default GrayableSVG
