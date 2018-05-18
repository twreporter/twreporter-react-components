import PropTypes from 'prop-types'
import React from 'react'

// Prequeisite: in editor-picks section,
// there are multiple description and image divs are setted to absolute.
// they are overlaied at same place relatively based on their category(image or description).

// TODO: The fadein-fadeout should be refactored as a handy library.

class FadeInFadeOut extends React.Component {
  render() {
    const { isSelected } = this.props
    const style = { opacity: isSelected ? 1 : 0, zIndex: isSelected ? '1' : '0', transition: 'opacity .5s' }
    return (
      <div
        style={style}
      >
        {this.props.children}
      </div>
    )
  }
}

FadeInFadeOut.defaultProps = {
  isSelected: false,
  children: null,
}

FadeInFadeOut.propTypes = {
  isSelected: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
}

export default FadeInFadeOut
