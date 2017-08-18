import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'

const _ = {
  get,
}

const ImgObjectFit = styled.div`
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImgFallback = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: ${(props) => {
    return `url(${_.get(props, 'url')})`
  }};
  background-position: center center;
`

class Image extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isObjectFit: true,
    }
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        isObjectFit: 'objectFit' in _.get(document, 'documentElement.style'),
      })
    }
  }

  render() {
    const { src, alt, srcSet } = this.props
    const isObjectFit = this.state.isObjectFit

    return isObjectFit ? (
      <ImgObjectFit>
        <img
          alt={alt}
          src={src}
          srcSet={srcSet}
        />
      </ImgObjectFit>
    ) : (
      <ImgFallback
        url={src}
      />
    )
  }
}

Image.defaultProps = {
  alt: '',
  src: '',
  srcSet: '',
}

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
}

export default Image
