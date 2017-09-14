import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { screen } from 'shared/style-utils'
import { fonts } from 'shared/common-variables'

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
`

const Content = styled.div`
  margin-bottom: 52px;
  font-size: ${fonts.size.xlarge};
  font-weight: ${fonts.weight.bold};
  ${screen.mobileOnly`
    font-size: ${fonts.size.large};
  `}
`

const FuncitonArea = styled.div``

const FunctionButton = styled.button`
  font-size: ${fonts.size.large};
  width: 127px;
  height: 46.7px;
  border-radius: 40px;
  background-color: Transparent;
  outline: 0;
  ${screen.mobileOnly`
    font-size: ${fonts.size.medium};
  `}
`

const Cancel = FunctionButton.extend`
  border: solid 2px #3e3f3f;
  margin-right: 25px;
`

const Confirm = FunctionButton.extend`
  border: solid 2px #e60013;
`

const Confirmation = (props) => {
  const { width, content, cancel, confirm, onConfirm, onCancel } = props
  return (
    <Container>
      <Dialog width={width}>
        <Content>
          {content}
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
  content: 'testing content',
  cancel: 'Cancel',
  confirm: 'Confirm',
  width: '490px',
}

Confirmation.propTypes = {
  width: PropTypes.string,
  content: PropTypes.string,
  cancel: PropTypes.string,
  confirm: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
export default Confirmation
