import styled, { keyframes } from 'styled-components'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { screen } from '../styles/screen'


const FadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Shrink = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 0;
    height: 0;
  }
`

const FadeOutDuration = 2

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  body: {
    overflow: hidden;
  }
  ${screen.tablet`
    height: 85%;
  `}
  ${screen.mobile`
    height: 79%;
  `}
  animation: ${Shrink} 100ms linear;
  animation-delay: ${props => (props.delay ? `${props.delay}s` : '10s')};
  animation-fill-mode: forwards;
`

const FadeOutContainer = styled.div`
  animation: ${FadeOut} ${FadeOutDuration}s ease-in-out;
  animation-delay: ${props => (props.delay ? `${props.delay}s` : '10s')};
  animation-fill-mode: forwards;
  width: 100%;
  height: 100%;
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => (props.bgColor ? props.bgColor : 'black')};
  position: relative;
`

const FadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const TextFrame = styled.div`
  opacity: 0;
  color: ${props => (props.fontColor ? props.fontColor : 'white')};
  white;
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ${FadeInOut} ${props => (props.duration ? `${props.duration}s` : '3s')} ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: ${props => (props.delay >= 0 ? `${props.delay}s` : '3s')};
  text-align: center;
  width: 88%;
  font-size: 50px;
  font-weight: 200;
  line-height: 1.6;
  text-align: center;
  ${screen.desktop`
    width: 80%;
  `}
  ${screen.mobile`
    font-size: 30px;
    line-height: 1.67;
  `}
`

class FadeText extends PureComponent {
  componentDidMount() {
    const elem = document.getElementById('pageContainer')
    elem.style.overflowY = 'hidden'
    elem.style.height = '100vh'
  }

  render() {
    const { bgColor, duration, textArr, fontColor, bgOutDuration } = this.props

    const textFrames = () => {
      return textArr.map((v, i) => {
        return (
          <TextFrame
            duration={duration}
            delay={i * duration}
            key={`fade_text_${v}`}
            fontColor={fontColor}
          >
            {v}
          </TextFrame>
        )
      })
    }

    return (
      <Container delay={(duration * textArr.length) + bgOutDuration + FadeOutDuration}>
        <FadeOutContainer delay={(duration * textArr.length) + bgOutDuration}>
          <Background bgColor={bgColor}>
            {textFrames()}
          </Background>
        </FadeOutContainer>
      </Container>
    )
  }
}

FadeText.propTypes = {
  bgColor: PropTypes.string.isRequired,
  textArr: PropTypes.array.isRequired,
  fontColor: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  bgOutDuration: PropTypes.number.isRequired,
}

export default FadeText
