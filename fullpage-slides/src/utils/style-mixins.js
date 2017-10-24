import { keyframes } from 'styled-components'
import * as time from '../constants/time'

const slideUpStartPoint = '50px'
const slideDownStartPoint = '-30px'

const slideFadeIn = startPoint => keyframes`
  from {
    opacity: 0;
    transform: translateY(${startPoint}) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
`

/*
  Firefox and safari won't pause css animation when display:none.
  So we need to add animation paroperty only when we want to trigger it.
  https://stackoverflow.com/a/24589834/5814542
*/

export const slideUpFadeInWhenFocus = (isFocus, display = 'block') =>
  (!isFocus ? 'display: none;' : `
    display: ${display};
    animation: ${slideFadeIn(slideUpStartPoint)} ${time.pageItemEntranceDuration}ms ease ${time.pageItemEntranceDelay}ms both;
  `)

const slideDownFadeInAnimation = (duration = 0, delay = 0) =>
  `animation: ${slideFadeIn(slideDownStartPoint)} ${duration}ms ease ${delay}ms both;`

export const goNextBtnEntranceAnimation = slideDownFadeInAnimation(time.goNextBtnEntranceDuration, time.goNextBtnEntranceDelay)
export const firstPageBtnEntranceAnimation = slideDownFadeInAnimation(time.firstPageBtnEntranceDuration, time.firstPageBtnEntranceDelay)

export const fadeInOutKeyframes = (fadeInTime, fadeOutTime, duration) => keyframes`
  from, to {
    opacity: 0;
  }
  ${parseInt(100 * fadeInTime / duration, 10)} {
    opacity: 1;
  }
  ${parseInt(100 * fadeOutTime / duration, 10)} {
    opacity: 1;
  }
`
