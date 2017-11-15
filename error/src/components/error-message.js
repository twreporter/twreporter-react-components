import { Link } from 'react-router'
import { screen } from 'shared/style-utils'
import Building from '../../static/building.svg'
import Dot from '../../static/dot.svg'
import Eng404 from '../../static/not-found-eng.svg'
import Eng404Mobile from '../../static/not-found-eng-mobile.svg'
import Number404 from '../../static/num404.svg'
import Number500 from '../../static/num500.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  ${screen.mobileOnly`
    margin-top: 25px;
    margin-bottom: 20px;
  `}
  ${screen.tabletOnly`
    padding: 0 55px 0 57px;
    margin-top: 67px;
    margin-bottom: 57px;
  `}
  ${screen.desktopOnly`
    padding: 0 120px 0 122px;
    margin-top: 46px;
    margin-bottom: 77px;
  `}
  ${screen.hdAbove`
    margin-top: 46px;
    margin-bottom: 77px;
  `}
`

const ErrorMessageBlock = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  ${screen.mobileOnly`
    width: 87.5%;
    padding-top: 65px;
    padding-bottom: 20px;
  `}
  ${screen.tabletOnly`
    padding-top: 135px;
    padding-bottom: 185px;
  `}
  ${screen.desktopOnly`
    padding-top: 135px;
    padding-bottom: 185px;
  `}
  ${screen.hdAbove`
    padding-top: 55px;
    padding-bottom: 108px;
    width: 62%;
    min-width: 896px;
  `}
`

const ChineseText = styled.div`
  position: absolute;
  ${screen.mobileOnly`
    top: 0;
    left: 0;
    width: 13px;
    font-size: 13px;
    line-height: 1.62;
    text-align: left;
    color: #000000;
    font-weight: 900;
    ::after {
      content: "";
      display: block;
      width: 14px;
      height: 1px;
      background-color: #000000;
      position: relative;
      top: 6px;
      left: 7px;
    }
  `}
  ${screen.tabletAbove`
    top: 0;
    left: 0;
    width: 18px;
    font-size: 18px;
    line-height: 1.5;
    text-align: left;
    color: #000000;
    font-weight: 900;
    ::after {
      content: "";
      display: block;
      width: 20px;
      height: 1px;
      background-color: #000000;
      position: relative;
      top: 19px;
      left: 11px;
    }
  `}
`

const BuildingStyled = styled(Building)`
  position: relative;
  width: 100%;
  ${screen.desktopOnly`
    width: 84%;
  `}
  ${screen.hdAbove`
    width: 82%;
  `}
`

const DotStyled = styled(Dot)`
  ${screen.mobileOnly`
    width: 3px;
    position: absolute;
    right: 0;
    top: 29.3%;
  `}
  ${screen.tabletOnly`
    width: 5px;
    position: absolute;
    right: 0;
    top: 158px;
  `}
  ${screen.desktopOnly`
    width: 5px;
    position: absolute;
    right: 0;
    top: 54%;
  `}
  ${screen.hdAbove`
    width: 5px;
    position: absolute;
    right: 0;
    top: 50.1%;
  `}
`

const EngishWrapper = styled.div`
  >svg {
    width: 100%;
  }
  .show-mobile {
    display: none;
  }
  .hide-mobile {
    display: inline;
  }
  ${screen.mobileOnly`
    width: 112px;
    position: absolute;
    bottom: 0;
    left: 0;
    .show-mobile {
      display: inline;
    }
    .hide-mobile {
      display: none;
    }
  `}
  ${screen.tabletOnly`
    width: 171px;
    position: absolute;
    bottom: 31px;
    right: 0;
  `}
  ${screen.desktopAbove`
    width: 171px;
    position: absolute;
    bottom: 30px;
    right: 0;
  `}
`

const BackToHomeBtn = styled(Link)`
  display: block;
  cursor: pointer;
  text-align: center;
  background-color: #000000;
  color: #FFFFFF;
  ${screen.mobileOnly`
    margin: 35px auto;
    width: 87.5%;
    height: 76px;
    line-height: 76px;
    position: relative;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2px;
  `}
  ${screen.tabletAbove`
    width: 229px;
    height: 76px;
    line-height: 76px;    
    position: absolute;
    bottom: 0;
    left: 55px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2px;
  `}
  ${screen.desktopOnly`
    left: 120px;
  `}
  ${screen.hdAbove`
    left: 19%;
  `}
  &:hover, &:active, &:focus, &:visited {
    color: #FFFFFF;
    text-decoration: none;
  }
`

const NumberImageWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 10px;
  width: 39.64%;
  ${screen.tabletOnly`
    width: 230px;
  `}
  ${screen.desktopOnly`
    width: 313px;
  `}
  ${screen.hdAbove`
    width: 353px;
  `}
  >svg {
    width: 100%;
  }
`

class ErrorMessage extends React.PureComponent {
  // _selectNumberImage(errorType) {
  //   function stylingImage(Number) {
  //     return styled(Number)`
  //       position: absolute;
  //       right: 0;
  //       top: 10px;
  //       width: 39.64%;
  //       ${screen.tabletOnly`
  //         width: 230px;
  //       `}
  //       ${screen.desktopOnly`
  //         width: 38%;
  //         width: 313px;
  //       `}
  //       ${screen.hdAbove`
  //         width: 353px;
  //       `}
  //     `
  //   }
  //   switch (errorType) {
  //     case '404':
  //       return stylingImage(Number404)
  //     case '500':
  //     default:
  //       return stylingImage(Number500)
  //   }
  // }
  _buildChineseMessageJSX(errorType) {
    switch (errorType) {
      case '404':
        return (<ChineseText>找不到網頁</ChineseText>)
      case '500':
      default:
        return (<ChineseText>網頁錯誤</ChineseText>)
    }
  }
  _buildEnglishMessageJSX(errorType) {
    switch (errorType) {
      case '404':
        return (
          <EngishWrapper>
            <Eng404Mobile className="show-mobile" />
            <Eng404 className="hide-mobile" />
          </EngishWrapper>
        )
      case '500':
      default:
        /* wait for Eng500 implement */
        return (
          <EngishWrapper>
            <Eng404Mobile className="show-mobile" />
            <Eng404 className="hide-mobile" />
          </EngishWrapper>
        )
    }
  }
  _buildErrorNumberJSX(errorType) {
    switch (errorType) {
      case '404':
        return (
          <NumberImageWrapper>
            <Number404 />
          </NumberImageWrapper>
        )
      case '500':
      default:
        return (
          <NumberImageWrapper>
            <Number500 />
          </NumberImageWrapper>
        )
    }
  }
  render() {
    const { errorType } = this.props
    // const ErrorNumber = this._selectNumberImage(errorType)
    return (
      <Container>
        <ErrorMessageBlock>
          <BuildingStyled />
          <DotStyled />
          {this._buildChineseMessageJSX(errorType)}
          {this._buildEnglishMessageJSX(errorType)}
          {this._buildErrorNumberJSX(errorType)}
        </ErrorMessageBlock>
        <BackToHomeBtn to="/">返回首頁</BackToHomeBtn>
      </Container>
    )
  }
}

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOf(['404', '500']),
}

ErrorMessage.defaultProps = {
  errorType: '500',
}

export default ErrorMessage
