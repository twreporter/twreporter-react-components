import React from 'react'
import { colors, zIndex } from '../../../constants/style-variables'
import PropTypes from 'prop-types'

const defaultStyle = {
  position: 'absolute',
  zIndex: zIndex.progress,
  bottom: '0',
  left: '0',
  height: '10px',
  width: '0',
  backgroundColor: colors.black,
  opacity: '.3',
  transition: 'width 100ms ease',
  borderRight: `2px solid ${colors.white}`,
}

const Progress = (props) => {
  const { currentTime, duration } = props
  const percentage = currentTime / duration * 100
  if (typeof percentage !== 'number') return null
  const style = Object.assign({}, defaultStyle, {
    width: `${percentage}%`,
  })
  return (
    <div style={style} />
  )
}

Progress.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
}

export default Progress
