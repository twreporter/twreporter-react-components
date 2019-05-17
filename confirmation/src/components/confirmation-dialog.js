import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import WarningSign from '../../static/delete-warning-sign.svg'
import { screen } from 'shared/style-utils'
import { fonts, colors } from 'shared/common-variables'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(115, 115, 115, 0.8);
`

const Dialog = styled.div`
  width: ${props => props.width};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 75px 60px 58px 60px;
  background-color: white;
  text-align: center;
  ${screen.mobileOnly`
    width: 100%;
    padding: 47px 17px 37px 17px;
  `}
`

const Content = styled.div`
  width: 100%;
  margin-bottom: 52px;
  font-size: ${fonts.size.xlarge};
  font-weight: ${fonts.weight.bold};
  ${screen.mobileOnly`
    font-size: ${fonts.size.medium};
  `}
`

const FuncitonArea = styled.div``

const FunctionButton = styled.button`
  cursor: pointer;
  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.large};
  width: 127px;
  height: 46.7px;
  border-radius: 40px;
  background-color: Transparent;
  outline: 0;
  ${screen.mobileOnly`
    font-size: ${fonts.size.medium};
  `}
  letter-spacing: 1.6px;
`

const Cancel = styled(FunctionButton)`
  border: solid 2px #3e3f3f;
  margin-right: 25px;
`

const Confirm = styled(FunctionButton)`
  border: solid 2px #e60013;
  color: ${colors.bookmarkIcon};
`

const IconContainer = styled.div`
  display: inline-block;
  position: relative;
  top: 8px;
  margin-right: 10px;
`

const TextContainer = styled.span`
  letter-spacing: 2.6px;
`

const Confirmation = (props) => {
  const { width, content, cancel, confirm, onConfirm, onCancel, toShowWarningIcon } = props
  const iconJSX = toShowWarningIcon ? (
    <IconContainer>
      <WarningSign />
    </IconContainer>
  ) : null
  return (
    <Container>
      <Dialog width={width}>
        <Content>
          {iconJSX}
          <TextContainer>
            {content}
          </TextContainer>
        </Content>
        <FuncitonArea>
          <Cancel onClick={onCancel}>
            {cancel}
          </Cancel>
          <Confirm onClick={onConfirm}>
            {confirm}
          </Confirm>
        </FuncitonArea>
      </Dialog>
    </Container>
  )
}

Confirmation.defaultProps = {
  content: '',
  cancel: 'Cancel',
  confirm: 'Confirm',
  width: '490px',
  toShowWarningIcon: true,
}

Confirmation.propTypes = {
  width: PropTypes.string,
  content: PropTypes.string,
  cancel: PropTypes.string,
  confirm: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  toShowWarningIcon: PropTypes.bool,
}
export default Confirmation
