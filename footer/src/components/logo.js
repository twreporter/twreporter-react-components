import { screen } from 'shared/style-utils'
import { STATICFILEPREFIX } from '../configs'
import { styles } from '../styles/theme'
import React from 'react'
import styled from 'styled-components'

const REPORTERLOGOSLUG = 'reporter-logo-horizontal'
const REPORTERLOGOFILENAME = 'logo-horizontal02.svg'

const Container = styled.div `
  position: relative;
`

const StyledReporterLogo = styled.div `
  transform: translateX(-25px);
  width: ${styles.reporterLogo.width.mobile}px;
  height: ${styles.reporterLogo.height.mobile}px;
  img {
    width: 100%;
    filter: grayscale(100%);
    opacity: ${styles.grayScaleOpacity.pureBlackWhiteSrc};
  }
  img:hover {
    filter: none;
    opacity: 1;
  }
  ${screen.tabletAbove`
    width: ${styles.reporterLogo.width.desktop}px;
    height: ${styles.reporterLogo.height.desktop}px;
  `}
  ${screen.hdAbove`
    width: ${styles.reporterLogo.width.hd}px;
    height: ${styles.reporterLogo.height.hd}px;
  `}
`

class Logo extends React.PureComponent {
  render() {
    return (
      <Container>
        <StyledReporterLogo >
          <img
            alt={REPORTERLOGOSLUG}
            src={`${STATICFILEPREFIX}${REPORTERLOGOFILENAME}`}
          />
        </StyledReporterLogo>
      </Container>
    )
  }
}

export default Logo
