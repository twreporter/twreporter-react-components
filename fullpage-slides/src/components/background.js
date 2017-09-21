import { pageTransitionDuration } from '../constants/time'
import { screen } from 'shared/style-utils'
import { zIndex } from '../constants/style-variables'
import * as BG_TYPES from '../constants/background-types'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Cinemagraph } from 'cinemagraph'
import { warning } from 'shared/utils/warning'

const parallelBlockRelativeStartpoint = '-200px'
const parallelBlockHeightAdjustment = '50px'

const BackgroundContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${props => props.backgroundColor};
  z-index: ${zIndex.background};
  ${props => (!props.isParallel ? '' : `
    height: calc(100% + ${parallelBlockHeightAdjustment});
    top: ${props.isPreParallel ? parallelBlockRelativeStartpoint : '0'};
    transition: top ${pageTransitionDuration}ms ease;
  `)}
`

const ContainerWithImage = BackgroundContainer.extend`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ${props => `
    background-image: url(${props.mobileImage});
    ${screen.tabletOnly`
      background-image: url(${props.tabletImage});
    `}
    ${screen.desktopAbove`
      background-image: url(${props.desktopImage});
    `}
  `}
`

const Background = (props) => {
  const { bgColor, backgroundType, isParallel } = props
  let isPreParallel
  if (isParallel) {
    const { currentIndex, index, isChanging } = props
    const isPrevious = (index - currentIndex === 1)
    isPreParallel = isPrevious && !isChanging
  }
  switch (backgroundType) {
    case BG_TYPES.COLOR: {
      return (
        <BackgroundContainer
          isPreParallel={isPreParallel}
          isParallel={isParallel}
          backgroundColor={bgColor}
        />
      )
    }
    case BG_TYPES.IMAGE: {
      const { bgImage } = props
      if (bgImage && bgImage.resizedTargets) {
        const images = bgImage.resizedTargets
        return (
          <ContainerWithImage
            isPreParallel={isPreParallel}
            isParallel={isParallel}
            backgroundColor={bgColor}
            mobileImage={images.mobile || ''}
            tabletImage={images.tablet || ''}
            desktopImage={images.desktop || ''}
          />
        )
      }
      warning(`<Missing image paths in the Background component with \`${BG_TYPES.IMAGE}\` background type.`)
      return (
        <BackgroundContainer
          isPreParallel={isPreParallel}
          isParallel={isParallel}
          backgroundColor={bgColor}
        />
      )
    }
    case BG_TYPES.CINEMAGRAPH: {
      const { cinemagraphLayers, currentIndex, index, isChanging } = props
      const isFocus = (index === currentIndex)
      const isBeside = Math.abs(index - currentIndex) === 1
      const isAnimationOn = isFocus || (isBeside && isChanging)
      return (
        <BackgroundContainer
          isPreParallel={isPreParallel}
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
}

Background.defaultProps = {
  bgColor: 'transparent',
  bgImage: {},
  bgType: '',
  cinemagraphLayers: [],
  isParallel: false,
}

export default Background
