import { pageTransitionDuration } from '../constants/time'
import { screen } from 'shared/style-utils'
import { zIndex } from '../constants/style-variables'
import * as BG_TYPES from '../constants/background-types'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Cinemagraph } from 'cinemagraph'

const parallelBlockRelativeStartpoint = '-200px'
const parallelBlockHeightAdjustment = '50px'

const BackgroundContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  z-index: ${zIndex.background};
  ${props => (!props.isParallel ? '' : `
    ${props.readyForParallel ? 'will-change: transform;' : ''}
    height: calc(100% + ${parallelBlockHeightAdjustment});
    transform: translateY(${props.readyForParallel ? parallelBlockRelativeStartpoint : '0'}) translateZ(0);
    transition: transform ${pageTransitionDuration}ms ease;
  `)}
`

const ContainerWithImage = BackgroundContainer.extend`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ${screen.mobileOnly`
    background-image: url(${props => props.mobileImage});
  `}
  ${screen.tabletOnly`
    background-image: url(${props => props.tabletImage});
  `}
  ${screen.desktopAbove`
    background-image: url(${props => props.desktopImage});
  `}
`

class Background extends React.Component {
  render() {
    const { bgColor, backgroundType, isParallel, preload } = this.props
    if (!preload) return <BackgroundContainer />
    let readyForParallel
    if (isParallel) {
      const { currentIndex, index, isChanging } = this.props
      const isPrevious = (index - currentIndex === 1)
      readyForParallel = isPrevious && !isChanging
    }
    switch (backgroundType) {
      case BG_TYPES.COLOR: {
        return (
          <BackgroundContainer
            readyForParallel={readyForParallel}
            isParallel={isParallel}
            backgroundColor={bgColor}
          />
        )
      }
      case BG_TYPES.IMAGE: {
        const { bgImage } = this.props
        if (bgImage && bgImage.resizedTargets) {
          const images = bgImage.resizedTargets
          return (
            <ContainerWithImage
              readyForParallel={readyForParallel}
              isParallel={isParallel}
              backgroundColor={bgColor}
              mobileImage={images.mobile || ''}
              tabletImage={images.tablet || ''}
              desktopImage={images.desktop || ''}
            />
          )
        }
        return (
          <BackgroundContainer
            readyForParallel={readyForParallel}
            isParallel={isParallel}
            backgroundColor={bgColor}
          />
        )
      }
      case BG_TYPES.CINEMAGRAPH: {
        const { cinemagraphLayers, currentIndex, index, isChanging } = this.props
        const isFocus = (index === currentIndex)
        const isBeside = Math.abs(index - currentIndex) === 1
        const isAnimationOn = isFocus || (isBeside && isChanging)
        return (
          <BackgroundContainer
            readyForParallel={readyForParallel}
            isParallel={isParallel}
            backgroundColor={bgColor}
          >
            <Cinemagraph
              layers={cinemagraphLayers}
              animationOn={isAnimationOn}
              backgroundColor={bgColor}
            />
          </BackgroundContainer>
        )
      }
      default: {
        return <BackgroundContainer backgroundColor="transparent" isParallel={false} />
      }
    }
  }
}

Background.propTypes = {
  bgColor: PropTypes.string,
  bgImage: PropTypes.shape({
    resizedTargets: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
      tablet: PropTypes.string.isRequired,
      desktop: PropTypes.string.isRequired,
    }),
  }),
  backgroundType: PropTypes.string.isRequired,
  cinemagraphLayers: PropTypes.array,
  currentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isChanging: PropTypes.bool.isRequired,
  isParallel: PropTypes.bool,
  preload: PropTypes.bool.isRequired,
}

Background.defaultProps = {
  bgColor: 'transparent',
  bgImage: {},
  bgType: '',
  cinemagraphLayers: [],
  isParallel: false,
}

export default Background
