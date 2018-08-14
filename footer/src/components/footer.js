import { arrayToCssShorthand, screen } from 'shared/style-utils'
import { colors, fonts } from 'shared/common-variables'
import { footerIconList, copyRightText } from '../configs.js'
import { styles } from '../styles/theme'
import Content from './content'
import IconList from './icon-list'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${props => props.bgColor};
  padding: 0;
  ${screen.tabletAbove`
    min-height: ${styles.footerHeight.desktop}px;
  `}
`

const FooterContent = styled.div`
  position: relative;
  border-top: solid 0.5px ${colors.lineGrey};
  ${screen.mobileOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.mobile)};
  `}
  ${screen.tabletOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.tablet)};
    max-width: 
  `}
  ${screen.desktopOnly`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.desktop)};
    max-width: ${styles.footerContentMaxWidth.desktop}px;  
  `}
  ${screen.hdAbove`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.hd)};
    max-width: ${styles.footerContentMaxWidth.hd}px;
  `}
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const CopyRight = styled.p`
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.medium};
  letter-spacing: 0.4px;
  color: ${colors.footerGray};
  ${screen.mobileOnly`
    text-align: center;
    margin-top: 10px;
  `}
  ${screen.tabletAbove`
    margin-top: 40px;
  `}
  ${screen.hdAbove`
    margin-top: 60px;
  `}  
`

class Footer extends React.PureComponent {
  render() {
    const { bgColor } = this.props
    return (
      <FooterContainer
        bgColor={bgColor}
      >
        <FooterContent>
          <Content />
          <IconList
            list={footerIconList}
          />
          <CopyRight>{copyRightText}</CopyRight>
        </FooterContent>
      </FooterContainer>
    )
  }
}

Footer.propTypes = {
  bgColor: PropTypes.string,
}

Footer.defaultProps = {
  fontColor: colors.footerTextDark,
  bgColor: colors.footerBg,
}

export default Footer
