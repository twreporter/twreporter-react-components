import { colors, fontSizes, fontWeight } from '../../../constants/style-variables'
import { screen } from 'shared/style-utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  ${screen.mobileOnly`
    display: none;
  `} 
  }
`

const Title = styled.div`
  color: ${colors.white};
  letter-spacing: 1.7px;
  font-weight: ${fontWeight.medium};
  font-size: ${fontSizes.colophonTitle.mobile};
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;
  ${screen.tabletAbove`
    font-size: ${fontSizes.colophonTitle.tablet};
    margin-bottom: 20px;
  `}
`
const Icon = styled.a`
  display: block;
  position: relative;
  margin: 0 auto;
  height: 24px;
  width: auto;
  svg {
    height: 100%;
  }
`

function Button(props) {
  const { title, children } = props
  return (
    <Container>
      <Title>{title}</Title>
      <Icon>{children}</Icon>
    </Container>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default Button
