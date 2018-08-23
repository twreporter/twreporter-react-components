import { mainSite } from 'shared/configs'
import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const REPORTERLOGOSLUG = 'reporter-logo-horizontal'
const REPORTERLOGOFILENAME = 'logo-horizontal02.svg'

const Container = styled.a`
  position: relative;
  cursor: pointer;
`

const StyledReporterLogo = styled.div `
  transform: translateX(-22px);
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
    transform: translateX(-25px);
    width: ${styles.reporterLogo.width.hd}px;
    height: ${styles.reporterLogo.height.hd}px;
  `}
`

class Logo extends React.PureComponent {
  render() {
    const { staticFilePrefix } = this.props
    return (
      <Container
        href={mainSite.url}
      >
        <StyledReporterLogo >
          <img
            alt={REPORTERLOGOSLUG}
            src={`${staticFilePrefix}${REPORTERLOGOFILENAME}`}
          />
        </StyledReporterLogo>
      </Container>
    )
  }
}

Logo.propTypes = {
  staticFilePrefix: PropTypes.string.isRequired,
}

Logo.defaultProps = {
  staticFilePrefix: '',
}

export default Logo
