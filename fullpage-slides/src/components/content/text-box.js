import { colors, fontSizes, fontWeight } from '../../constants/style-variables'
import { screen } from 'shared/style-utils'
import { slideUpFadeInWhenFocus } from '../../utils/style-mixins'
import * as TEXT_BOX_POSITIONS from '../../constants/text-box-positions'
import ContentContainer from './container'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const Title = styled.h3`
  color: ${colors.white};
  font-size: ${fontSizes.textBoxTitle.mobile};
  margin: 0;
  padding: 0;
  ${screen.tabletAbove`
    font-size: ${fontSizes.textBoxTitle.tablet};
  `}
  ${screen.desktopAbove`
    font-size: ${fontSizes.textBoxTitle.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.textBoxTitle.hd};
  `}
`

const Description = styled.div`
  color: ${colors.white};
  ${screen.tabletAbove`
    font-size: ${fontSizes.textBoxDescription.tablet};
  `}
  ${screen.desktopAbove`
    font-size: ${fontSizes.textBoxDescription.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSizes.textBoxDescription.hd};
  `}
  >p {
    margin-bottom: .8em;
  }
  >p:last-child {
    margin-bottom: 0;
  }
`

const positionTypeToCss = (textBoxPosition) => {
  switch (textBoxPosition) {
    case TEXT_BOX_POSITIONS.CENTER_CENTER: {
      return css`
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        >div {
          width: 57%;
          min-width: 264px;
          ${screen.tabletAbove`
            width: 484px;
          `}
          ${screen.hdAbove`
            width: 726px;
          `}
        }
        ${Title} {
          font-weight: ${fontWeight.light};
          text-align: center;
          margin-bottom: 15px;
          letter-spacing: 0.7px
          ${screen.tabletAbove`
            font-weight: ${fontWeight.extraLight};
            margin-bottom: 25px;
            letter-spacing: 0.8px;
          `}
          ${screen.desktopAbove`
            letter-spacing: 1px;
          `}
          ${screen.hdAbove`
            margin-bottom: 37px;
            letter-spacing: 1.5px;
          `}
        }
        ${Description} {
          font-weight: ${fontWeight.extraLight};
          line-height: 1.62;
          letter-spacing: 0.4px;
          ${screen.tabletAbove`
            line-height: 1.67;
            letter-spacing: 0.5px;
          `}
          ${screen.hdAbove`
            letter-spacing: 0.7px;
          `}
        }
      `
    }
    case TEXT_BOX_POSITIONS.RIGHT_BOTTOM:
    case TEXT_BOX_POSITIONS.LEFT_BOTTOM: {
      let justifyContent
      if (textBoxPosition === TEXT_BOX_POSITIONS.RIGHT_BOTTOM) justifyContent = 'flex-end'
      if (textBoxPosition === TEXT_BOX_POSITIONS.LEFT_BOTTOM) justifyContent = 'flex-start'
      return css`
        display: flex;
        flex-wrap: nowrap;
        justify-content: ${justifyContent};
        align-items: flex-end;
        padding: 0 37px 40px 20px;
        ${screen.tabletAbove`
          padding: 60px;
        `}
        ${screen.hdAbove`
          padding: 60px 80px;
        `}
        >div {
          width: 57%;
          min-width: 264px;
          ${screen.tabletAbove`
            width: 390px;
          `}
          ${screen.hdAbove`
            width: 585px;
          `}
        }
        ${Title} {
          font-weight: ${fontWeight.extraLight};
          text-align: left;
          margin-bottom: 15px;
          letter-spacing: 0.7px;
          ${screen.tabletAbove`
            font-weight: ${fontWeight.light};
            margin-bottom: 25px;
            letter-spacing: 1px;
          `}
          ${screen.desktopAbove`
          `}
          ${screen.hdAbove`
            margin-bottom: 37px;
            letter-spacing: 1.5px;
          `}
        }
        ${Description} {
          font-weight: ${fontWeight.light};
          line-height: 1.62;
          letter-spacing: 0.4px;
          ${screen.tabletAbove`
            line-height: 1.78;
            letter-spacing: 0.5px;
          `}
          ${screen.hdAbove`
            letter-spacing: 0.7px;
          `}
        }
      `
    }
    default: {
      return ContentContainer
    }
  }
}

const TextBoxContaniner = styled(ContentContainer)`
  ${props => positionTypeToCss(props.textBoxPosition)}
  >* {
    ${props => slideUpFadeInWhenFocus(props.isFocus)}
  }
`

const TextBox = (props) => {
  const { title, htmlContent, isFocus, textBoxPosition } = props
  return (
    <TextBoxContaniner isFocus={isFocus} textBoxPosition={textBoxPosition}>
      <div>
        <Title>{title}</Title>
        <Description dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </TextBoxContaniner>
  )
}

TextBox.propTypes = {
  title: PropTypes.string.isRequired,
  htmlContent: PropTypes.string.isRequired,
  isFocus: PropTypes.bool.isRequired,
  textBoxPosition: PropTypes.string.isRequired,
}

export default TextBox
