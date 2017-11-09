import { colors, zIndex } from '../constants/style-variables'
import { screen } from 'shared/style-utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.ul`
  z-index: ${zIndex.pagination};
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: fixed;
  right: 10px;
  bottom: 20px;
  ${screen.tabletAbove`
    right: 20px;
    bottom: 60px;
  `}
  ${screen.hdAbove`
    right: 40px;
  `}
`

const Icon = styled.li`
  width: 2px;
  height: 6px;
  border-radius: 4.2px;
  background-color: ${colors.white};
  opacity: ${props => (props.isOn ? '0.8' : '0.3')};
  transition: opacity .5s ease;
  margin-bottom: 1.8px;
  ${screen.desktopAbove`
    width: 3px;
    height: 9px;
    border-radius: 6.3px;
    margin-bottom: 1.8px;
  `}
`

const Pagination = (props) => {
  const { currentIndex, total } = props
  const pages = []
  for (let i = 0; i < total; i += 1) {
    pages.push(<Icon isOn={currentIndex === i} key={i} />)
  }
  return (
    <Container>
      {pages}
    </Container>
  )
}

Pagination.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default Pagination
