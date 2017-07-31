import { css } from 'styled-components'

export const categoriesMenuEffect = css`
  .effect-enter {
    max-height: 0;
    opacity: .5;
  }

  .effect-enter.effect-enter-active {
    max-height: 400px;
    opacity: 1;
    transition: max-height 300ms ease-in 100ms, opacity 400ms ease-out;
  }

  .effect-leave {
    max-height: 400px;
    opacity: 1;
  }

  .effect-leave.effect-leave-active {
    max-height: 0;
    opacity: .6;
    transition: max-height 400ms ease-out, opacity 200ms ease-out 200ms;
  }
`

export const searchBoxEffect = css`
  .effect-enter {
    opacity: 0;
    right: -20px;
  }

  .effect-enter.effect-enter-active {
    opacity: 1;
    right: 0;
    transition: opacity 500ms ease, right 500ms ease;
  }

  .effect-leave {
    opacity: 1;
    right: 0;
  }

  .effect-leave.effect-leave-active {
    opacity: 0;
    right: -20px;
    transition: opacity 200ms ease, right 200ms ease;
  }
`
