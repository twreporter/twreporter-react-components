import React from 'react'
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
  children: React.PropTypes.element.isRequired,
  currentLinkType: React.PropTypes.string.isRequired,
  path: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

export default CustomizedLink
