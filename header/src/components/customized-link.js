import React from 'react'
import PropTypes from 'prop-types'
import { linkType } from 'shared/configs'
import { Link } from 'react-router'

const CustomizedLink = ({ children, currentLinkType, path, onClick }) => {
  if (currentLinkType === linkType.external) {
    return (
      <a href={path} target="_blank">
        {children}
      </a>
    )
  }
  return (
    <Link to={path} onClick={onClick}>
      {children}
    </Link>
  )
}

CustomizedLink.defaultProps = {
  path: '',
  onClick: () => {},
}

CustomizedLink.propTypes = {
  children: PropTypes.element.isRequired,
  currentLinkType: PropTypes.string.isRequired,
  path: PropTypes.string,
  onClick: PropTypes.func,
}

export default CustomizedLink
