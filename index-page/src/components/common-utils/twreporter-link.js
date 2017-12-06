import styled from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'
import HoverEffect from './hover-effect'
// import { colors } from '../../styles/common-variables'
import { Link } from 'react-router'

const A = styled.a`
  text-decoration: none;
`

const PlainContainer = styled.div`
  width:100%;
  height: 100%;
`

// noTxtDec = noTextDecoration
const TRLink = (props) => {
  const { href, redirect, plain } = props
  let ContentContainer
  if (plain) {
    ContentContainer = PlainContainer
  } else {
    ContentContainer = HoverEffect
  }
  if (redirect) {
    return (
      <A href={`https://www.twreporter.org/${href}`} target="_blank" rel="noreferrer noopener">
        <ContentContainer>
          {props.children}
        </ContentContainer>
      </A>
    )
  }
  return (
    <Link to={`/${href}`}>
      <ContentContainer>
        {props.children}
      </ContentContainer>
    </Link>
  )
}

TRLink.defaultProps = {
  href: '',
  redirect: false,
  plain: false,
}

TRLink.propTypes = {
  href: PropTypes.string,
  plain: PropTypes.bool,
  children: PropTypes.any.isRequired,
  redirect: PropTypes.bool,
}


export default TRLink
