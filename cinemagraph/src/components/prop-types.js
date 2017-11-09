import PropTypes from 'prop-types'

const animationPropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    timingFunction: PropTypes.string,
    delay: PropTypes.string,
    iterationCount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    direaction: PropTypes.string,
    fillMode: PropTypes.string,
    playState: PropTypes.string,
  }),
])

const animationsPropTypes = PropTypes.shape({
  mobile: animationPropTypes,
  tablet: animationPropTypes,
  desktop: animationPropTypes,
})

export const layerPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  animation: animationsPropTypes.isRequired,
  bgPosition: PropTypes.shape({
    desktop: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    tablet: PropTypes.string.isRequired,
  }),
  bgSize: PropTypes.shape({
    mobile: PropTypes.string.isRequired,
    tablet: PropTypes.string.isRequired,
    desktop: PropTypes.string.isRequired,
  }),
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    resizedTargets: PropTypes.shape({
      desktop: PropTypes.string,
      mobile: PropTypes.string,
      tablet: PropTypes.string,
      tiny: PropTypes.string,
    }).isRequired,
  }),
})
