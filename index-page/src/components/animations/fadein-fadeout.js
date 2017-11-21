import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { VelocityComponent } from 'velocity-react'

// Prequeisite: in editor-picks section,
// there are multiple description and image divs are setted to absolute.
// they are overlaied at same place relatively based on their category(image or description).

// TODO: The fadein-fadeout should be refactored as a handy library.

const _ = {
  get,
}

class FadeInFadeOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onAnimate: false,
    }
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // when user click on button and start animation to change the selected div.
    if (_.get(nextProps, 'isSelected') !== _.get(this.props, 'isSelected')) {
      this.setState({
        onAnimate: true,
      })
    }
  }

  _onAnimationFinish() {
    if (this.state.onAnimate) {
      this.setState({
        onAnimate: false,
      })
    }
    if (!this.props.isSelected) {
      this.Node.style.display = 'none'
    }
  }

  render() {
    const { isSelected } = this.props
    // only show selected or onAnimate one.
    const style = isSelected || this.state.onAnimate ? { display: 'inline' } : { display: 'none' }
    return (
      <VelocityComponent
        animation={
          isSelected
            ?
            (() => {
            // Previously, the node is unselected one, so display in none.
              if (this.Node) {
                this.Node.style.display = 'inline'
              }
              return { opacity: 1 }
            })()
            :
            { opacity: 0 }
        }
        duration={500}
        complete={this.onAnimationFinish}
        runOnMount={false}
      >
        <div
          ref={(node) => { this.Node = node }}
          style={style}
        >
          {this.props.children}
        </div>
      </VelocityComponent>
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
