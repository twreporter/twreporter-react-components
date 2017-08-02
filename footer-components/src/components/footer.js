import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { footerSections } from '../configs.js'
import map from 'lodash/map'
import { Link } from 'react-router'
import DonateIcon from '../../static/donate-icon.svg'
import ReporterLogo from '../../static/reporter-large.svg'
import SnsIcon from '../../static/sns-icon.svg'
import SubscribeIcon from '../../static/subscribe-icon.svg'
import { colors, fonts } from 'shared/common-variables'
import { arrayToCssShorthand, screen } from 'shared/style-utils'
import { selectBgColor, selectTextColor } from '../styles/theme'

const _ = {
  map,
}

const styles = {
  iconWidth: 32, // px
  iconHeight: 32, // px
  footerContentPadding: {
    desktop: [72, 45, 45, 45], // px
    mobile: [60, 43, 70, 43], // px
  },
  sectionWidth: {
    desktop: '10rem',
    mobile: '6rem',
  },
  footerContentMaxWidth: {
    mobile: 273, // px
    desktop: 1440, // px
  },
  sectionMargin: {
    mobile: [0, 0, 65, 0],
    desktop: [0, 50],
  },
}

const FooterContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  background-color: ${props => selectBgColor(props.pageTheme)};
  padding: ${arrayToCssShorthand(styles.footerContentPadding.mobile)};
  ${screen.tabletAbove`
    padding: ${arrayToCssShorthand(styles.footerContentPadding.desktop)};
  `}
`

const FooterContent = styled.div`
  max-width: ${styles.footerContentMaxWidth.desktop}px;
  ${screen.mobileOnly`
    max-width: ${styles.footerContentMaxWidth.mobile}px;
  `}

  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  ${screen.tabletAbove`
    flex-wrap: nowrap;
    justify-content: center;
  `}
  align-items: flex-start;
`

const SectionContainer = styled.div`
  box-sizing: border-box;
  width: ${styles.sectionWidth.mobile};
  ${screen.tabletAbove`
    width: ${styles.sectionWidth.desktop};
  `}
  margin: ${arrayToCssShorthand(styles.sectionMargin.desktop)};
  ${screen.mobileOnly`
    margin: ${arrayToCssShorthand(styles.sectionMargin.mobile)};
  `}
`

const SectionContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  ${screen.tabletAbove`
    flex-direction: row;
  `}
  ${screen.mobileOnly`
    text-align: center;
  `}
`

const SectionTitle = styled.div`
  svg {
    width: ${styles.iconWidth}px;
    height: ${styles.iconHeight}px;
  }
`

const SectionItems = styled.ul`
  box-sizing: border-box;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${screen.tabletAbove`
    margin-left: 1em;
  `}
  a {
    cursor: pointer;
    color: ${props => selectTextColor(props.pageTheme)};
    text-decoration: none;
    &:link, :active, :visited, :focus {
      color: ${props => selectTextColor(props.pageTheme)};
      text-decoration: none;
    }
    &:hover {
      color: ${colors.primaryColor};
      text-decoration: underline;
    }
  }
`

const SectionItem = styled.li`
  display: block;
  box-sizing: border-box;
  height: ${styles.iconHeight}px;
  line-height: ${styles.iconHeight}px;
  letter-spacing: .3px;
  font-size: ${fonts.size.medium};
`

const selectIcon = (name) => {
  switch (name) {
    case 'about':
      return (<ReporterLogo />)
    case 'donation':
      return (<DonateIcon />)
    case 'sns':
      return (<SnsIcon />)
    case 'newsletter':
      return (<SubscribeIcon />)
    default:
      return null
  }
}

class EnhancedLink extends React.PureComponent {
  render() {
    const { to } = this.props
    if (typeof to === 'string' && (to.startsWith('http://') || (to.startsWith('https://')))) {
      return <a href={to} {...this.props} /> // eslint-disable-line jsx-a11y/anchor-has-content
    }
    return <Link {...this.props} />
  }
}

EnhancedLink.propTypes = {
  to: PropTypes.string.isRequired,
}

const buildSectionsJSX = (sections, pageTheme) => _.map(sections, (section) => {
  const sectionName = section.name
  const sectionItems = section.items
  return (
    <SectionContainer key={sectionName}>
      <SectionContent>
        <SectionTitle>
          {selectIcon(sectionName)}
        </SectionTitle>
        <SectionItems pageTheme={pageTheme} >
          {_.map(sectionItems, item => (
            <EnhancedLink to={item.link} target={item.target || null} key={item.slug}>
              <SectionItem>
                {item.text}
              </SectionItem>
            </EnhancedLink>
          ))}
        </SectionItems>
      </SectionContent>
    </SectionContainer>
  )
})

class Footer extends React.PureComponent {
  render() {
    const { pageTheme } = this.props
    return (
      <FooterContainer pageTheme={pageTheme}>
        <FooterContent>
          {buildSectionsJSX(footerSections, pageTheme)}
        </FooterContent>
      </FooterContainer>
    )
  }
}

Footer.propTypes = {
  pageTheme: PropTypes.string,
}

Footer.defaultProps = {
  pageTheme: 'BRIGHT',
}

export default Footer
