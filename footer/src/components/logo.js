import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import GrayableSVG from './utils/grayable-svg'
import React from 'react'
import ReporterLogo from '../../static/logo-horizontal02.svg'
import styled from 'styled-components'

const Container = styled.div `
  position: relative;
`

const HoveredLogo = styled.div `
  opacity: 0;
  ${Container}:hover & {
    opacity: 1;
  }
`

const LogoOverLay = styled.div `
  position: absolute;
  top: 0;
  opacity: ${props => props.defaultOpacity};
  ${Container}:hover & {
    opacity: 0;
  }
`

const StyledReporterLogo = styled.div `
  transform: translateX(-25px);
  svg {
    width: ${styles.reporterLogo.width.mobile}px;
    height: ${styles.reporterLogo.height.mobile}px;
  }
  ${screen.tabletAbove`
    svg {
      width: ${styles.reporterLogo.width.desktop}px;
      height: ${styles.reporterLogo.height.desktop}px;
    }
  `}
  ${screen.hdAbove`
    svg {
      width: ${styles.reporterLogo.width.hd}px;
      height: ${styles.reporterLogo.height.hd}px;
    }
  `}
`

class Logo extends React.PureComponent {
  render() {
    return (
      <Container>
        <HoveredLogo>
          <StyledReporterLogo >
            <ReporterLogo />
          </StyledReporterLogo>
        </HoveredLogo>
        <LogoOverLay
          defaultOpacity={styles.grayScaleOpacity.pureBlackWhiteSrc}
        >
          <GrayableSVG
            identity={'reporterlogo'}
          >
            <StyledReporterLogo >
              <ReporterLogo />
            </StyledReporterLogo>
          </GrayableSVG>
        </LogoOverLay>
      </Container>
    )
  }
}

export default Logo
