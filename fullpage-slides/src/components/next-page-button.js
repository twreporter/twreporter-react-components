import { goNextBtnEntranceAnimation } from '../utils/style-mixins'
import { screen } from 'shared/style-utils'
import { zIndex } from '../constants/style-variables'
import ArrowDown from '../../static/arrow-down.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  background-color: transparent;
  cursor: pointer;
  display: ${props => (props.shouldDisplay ? 'block' : 'none')};
  position: absolute;
  width: 28px;
  z-index: ${zIndex.nextPageBtn};
  left: calc(50% - 14px);
  bottom: 27px;
  ${screen.tabletOnly`
    bottom: 41px;
  `}
  ${screen.hdAbove`
    bottom: 61px;
  `}
  ${goNextBtnEntranceAnimation};
`

const NextPageBtn = (props) => {
  if (!props.shouldMount) return null
  return (
    <ButtonContainer shouldDisplay={props.shouldDisplay} onClick={props.handleClick}>
      <ArrowDown />
    </ButtonContainer>
  )
}

NextPageBtn.propTypes = {
  shouldMount: PropTypes.bool.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default NextPageBtn
