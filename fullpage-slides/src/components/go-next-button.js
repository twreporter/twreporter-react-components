import { goNextBtnEntranceAnimation } from '../utils/style-mixins'
import { screen } from 'shared/style-utils'
import { zIndex } from '../constants/style-variables'
import ArrowDown from '../../static/arrow-down.svg'
import ArrowDownDark from '../../static/arrow-down-dark.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  background-color: transparent;
  cursor: pointer;
  display: ${props => (props.display ? 'block' : 'none')};
  position: absolute;
  width: 28px;
  z-index: ${zIndex.nextPageBtn};
  left: calc(50% - 14px);
  bottom: 27px;
  >svg {
    width: 100%;
  }
  ${screen.tabletOnly`
    bottom: 41px;
  `}
  ${screen.hdAbove`
    bottom: 61px;
  `}
  ${goNextBtnEntranceAnimation};
`

const NextPageBtn = (props) => {
  const { handleClick, shouldDisplay, shouldLoad, buttonTheme } = props
  return (
    <ButtonContainer display={shouldLoad && shouldDisplay} onClick={handleClick}>
      {buttonTheme === 'dark' ? <ArrowDownDark /> : <ArrowDown />}
    </ButtonContainer>
  )
}

NextPageBtn.propTypes = {
  shouldLoad: PropTypes.bool,
  shouldDisplay: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  buttonTheme: PropTypes.oneOf(['dark', 'bright']),
}

NextPageBtn.defaultProps = {
  shouldLoad: false,
  buttonTheme: 'bright',
}

export default NextPageBtn
