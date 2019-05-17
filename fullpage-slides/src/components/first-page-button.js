import { firstPageBtnEntranceAnimation } from '../utils/style-mixins'
import { screen } from 'shared/style-utils'
import { zIndex } from '../constants/style-variables'
import ClickIcon from '../../static/click.svg'
import ArrowDownIcon from '../../static/arrow-down.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  background-color: transparent;
  cursor: pointer;
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
  ${firstPageBtnEntranceAnimation};
`

const ClickButtonContainer = styled(ButtonContainer)`
  width: 36px;
`

const FirstPageButton = (props) => {
  if (!props.isFirstPage || props.isChanging) return null
  if (props.canPlayWithoutGesture) {
    return (
      <ButtonContainer onClick={props.handleCanPlay}>
        <ArrowDownIcon />
      </ButtonContainer>
    )
  }
  return (
    <ClickButtonContainer onClick={props.handleCannotPlay}>
      <ClickIcon />
    </ClickButtonContainer>
  )
}

FirstPageButton.propTypes = {
  isFirstPage: PropTypes.bool.isRequired,
  isChanging: PropTypes.bool.isRequired,
  canPlayWithoutGesture: PropTypes.bool.isRequired,
  handleCannotPlay: PropTypes.func.isRequired,
  handleCanPlay: PropTypes.func.isRequired,
}

export default FirstPageButton
