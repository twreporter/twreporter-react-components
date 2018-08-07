import { arrayToCssShorthand, screen } from 'shared/style-utils'
import { colors, fonts } from 'shared/common-variables'
import { footerItemList, footerIconList, DonateUSText, CopyRightText, donatePage } from '../configs.js'
import appConfig from '../../../index-page/src/conf/app-config.json'
import chunk from 'lodash/chunk'
import FBIcon from '../../static/fb-logo_hover@2x.svg'
import FBIconDefault from '../../static/fb-logo_default@2x.svg'
import GithubIcon from '../../static/github-logo_hover@2x.svg'
import GithubIconDefault from '../../static/github-logo_default@2x.svg'
import IGIcon from '../../static/IG-logo_hover.svg'
import IGIconDefault from '../../static/IG-logo_default@2x.svg'
import LineIcon from '../../static/Line-icon_hover@2x.svg'
import LineIconDefault from '../../static/Line-icon_default@2x.svg'
import map from 'lodash/map'
import MediumIcon from '../../static/medium-logo_hover@2x.svg'
import MediumIconDefault from '../../static/medium-logo-default@2x.svg'
import PropTypes from 'prop-types'
import React from 'react'
import ReporterLogo from '../../static/logo-horizontal02.svg'
import RSSIcon from '../../static/rss-logo_hover@2x.svg'
import RSSIconDefault from '../../static/rss-logo_default@2x.svg'
import styled from 'styled-components'

const _ = {
  map, chunk,
}

const styles = {
  reporterLogo: {
    width: {
      desktop: 258, // px
      hd: 300, // px
    },
    height: {
      desktop: 45, // px
      hd: 55, // px
    },
  },
  icon: {
    width: {
      tabletAbove: 30, // px
      mobile: 40, // px
    },
    height: {
      tabletAbove: 30, // px
      mobile: 40, // px
    },
  },
  footerHeight: {
    desktop: 309, // px
  },
  footerContentPadding: {
    hd: [60, 60, 41, 60], // px
    desktop: [60, 50, 40, 50], // px
    tablet: [50, 35, 0, 35], // px
    mobile: [60, 40, 60, 35], // px
  },
  footerContentMaxWidth: {
    desktop: 1024, // px
    hd: 1440, // px
  },
  contentRow: {
    width: {
      tablet: 531, // px
      desktop: 682, // px
      hd: 908, // px
    },
    height: {
      desktop: 123, // px
      hd: 96, // px
    },
  },
}

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

const StyledReporterLogo = styled.div`
  transform: translateX(-25px);
  svg {
    filter: ${props => (props.onHover ? 'none' : 'grayscale(100%)')};
    opacity: ${props => (props.onHover ? '1' : '0.4')};
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

const StyledIcon = styled.a`
  display: inline-block;
  margin-right: 11px;
  svg {
    width: ${styles.icon.width.tabletAbove}px;
    height: ${styles.icon.height.tabletAbove}px;
  }
  ${screen.mobileOnly`
    margin-right: 0;
    svg {
      width: ${styles.icon.width.mobile}px;
      height: ${styles.icon.height.mobile}px;
    }
  `}
`

const Intro = styled.p`
  width: 100%;
  font-size: ${fonts.size.small};
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.4px;
  color: ${colors.footerGray};
  ${screen.mobileOnly`
    font-size: ${fonts.size.medium};
    line-height: 1.63;
    letter-spacing: 0.6px;
  `}  
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

const Icons = styled.div`
  margin-top: 20px;
  transform: translateX(-5px);
  ${screen.mobileOnly`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `}
`

const ContentRow = styled.div`
  ${screen.hdAbove`
    width: ${styles.contentRow.width.hd}px;
    height: ${styles.contentRow.height.hd}px; 
  `}
  ${screen.desktopOnly`
    width: ${styles.contentRow.width.desktop}px;
    height: ${styles.contentRow.height.desktop}px; 
  `}
  ${screen.tabletOnly`
    width: ${styles.contentRow.width.tablet}px;
  `}
`

const Column = styled.div`
  display: inline-block;
  height: 100%;
`

const FirstColumn = Column.extend`
  ${screen.desktopAbove`
    padding-right: 60px;
  `}
  ${screen.hdAbove`
    width: 510px;
  `}
  ${screen.desktopOnly`
    width: 290px;
  `}
  ${screen.tabletOnly`
    width: 260px;
  `}
`

const SecondColumn = Column.extend`
  padding-left: 40px;
  ${screen.hdAbove`
    width: 397px;
  `}
  ${screen.desktopOnly`
    width: 392px;
  `}
  ${screen.tabletAbove`
    float: right;
    border-left: solid 0.25px ${colors.lineGrey};
  `}
  ${screen.tabletOnly`
    width: 270px;
    padding-left: 31px;
  `}
  ${screen.mobileOnly`
    margin-top: 60px;
    padding-left: 0;
  `}
`

const StyledItemList = styled.div`
  width: 100%;
  height: 100%;
`

const StyledItemGroup = styled.div`
  display: inline-block;
  width: calc(100% / 3);
  white-space: nowrap;
  ${screen.tabletBelow`
    width: calc(100% / 2);
    &:last-child{
      margin-top: 35px;
    }
  `}
`

const StyledItem = styled.a`
  display: block;
  width: 100%;
  p{
    display: inline;
    font-size: ${fonts.size.base};
    font-weight: ${fonts.weight.bold};
    letter-spacing: 1.3px;
    color: ${props => (props.onHover ? `${colors.black}` : `${colors.footerGray}`)};
  }
  span{
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    background: ${props => (props.onHover ? `${colors.footerNewsFlagRed}` : `${colors.footerGray}`)};
    color: ${colors.white};
    font-size: ${fonts.size.xsmall};
    font-family: Roboto;
    margin-right: 5px;
    padding: 1px 5px;
  }
  ${screen.desktopAbove`
    height: calc(${styles.contentRow.height.hd}px / 3);
  `}
  ${screen.mobileOnly`
    p{
      font-size: ${fonts.size.large};
      letter-spacing: 1.6px;
      line-height: 2;
    }
  `}
`

const DonateusButton = styled.a`
  width: 140px;
  height: 55px;
  background-color: ${props => (props.onHover ? `${colors.pageMain}` : `${colors.white}`)};
  border: solid 0.5px ${colors.pageMain};
  display: table;
  p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: ${props => (props.onHover ? `${colors.white}` : `${colors.pageMain}`)};
    font-size: ${fonts.size.base};
    font-weight: ${fonts.weight.bold};
    letter-spacing: 1.3px;
  }
  ${screen.tabletAbove`
    position: absolute;
    right: 0;
    top: 0;
  `}
  ${screen.desktopAbove`
    margin-top: ${styles.footerContentPadding.desktop[0]}px;
    margin-right: ${styles.footerContentPadding.desktop[1]}px;
  `}
  ${screen.tabletOnly`
    margin-top: ${styles.footerContentPadding.tablet[0]}px;
    margin-right: ${styles.footerContentPadding.tablet[1]}px;
  `}
  ${screen.mobileOnly`
    width: 100%;
    margin: 60px auto 40px auto;
  `}
`

const selectIcon = (name, onHover) => {
  switch (name) {
    case 'facebook':
      return (
        onHover ?
          <FBIcon />
          : <FBIconDefault />
      )
    case 'instagram':
      return (
        onHover ?
          <IGIcon />
          : <IGIconDefault />
      )
    case 'line':
      return (
        onHover ?
          <LineIcon />
          : <LineIconDefault />
      )
    case 'medium':
      return (
        onHover ?
          <MediumIcon />
          : <MediumIconDefault />
      )
    case 'github':
      return (
        onHover ?
          <GithubIcon />
          : <GithubIconDefault />
      )
    case 'rss':
      return (
        onHover ?
          <RSSIcon />
          : <RSSIconDefault />
      )
    default:
      return null
  }
}

const ItemList = (itemGroup, onHover) => _.map(itemGroup, (group, indexofGroup) => {
  return (
    <StyledItemGroup key={indexofGroup}>
      {
        _.map(group, (item, indexofItem) => {
          return (
            <StyledItem
              key={`${indexofGroup}-${indexofItem}`}
              visible={item.newFlag}
              onHover={onHover}
              href={item.link}
              target={item.target}
            >
              <span>New</span>
              <p>{item.text}</p>
            </StyledItem>
          )
        })
      }
    </StyledItemGroup>
  )
})

const IconList = (iconlist, onHover) => _.map(iconlist, (icon, indexofIcon) => {
  return (
    <StyledIcon
      key={indexofIcon}
      href={icon.link}
      target={icon.target}
    >
      {selectIcon(icon.slug, onHover)}
    </StyledIcon>
  )
})

class Footer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      onHover: false,
    }
    this.handleMouseEnter = this._handleMouseEnter.bind(this)
    this.handleMouseLeave = this._handleMouseLeave.bind(this)
  }
  _handleMouseEnter() {
    if (!this.state.onHover) {
      this.setState({
        onHover: true,
      })
    }
  }
  _handleMouseLeave() {
    if (this.state.onHover) {
      this.setState({
        onHover: false,
      })
    }
  }
  render() {
    const description = appConfig.description
    const groupedItemList = _.chunk(footerItemList, 3)
    const { bgColor } = this.props
    const { onHover } = this.state
    return (
      <FooterContainer
        bgColor={bgColor}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <FooterContent>
          <ContentRow>
            <FirstColumn>
              <StyledReporterLogo
                onHover={onHover}
              >
                <ReporterLogo />
              </StyledReporterLogo>
              <Intro>{description}</Intro>
            </FirstColumn>
            <SecondColumn>
              <StyledItemList>
                {ItemList(groupedItemList, onHover)}
              </StyledItemList>
            </SecondColumn>
            <DonateusButton
              onHover={onHover}
              href={donatePage.link}
              target={donatePage.target}
            >
              <p>{DonateUSText}</p>
            </DonateusButton>
          </ContentRow>
          <Icons>
            {IconList(footerIconList, onHover)}
          </Icons>
          <CopyRight>{CopyRightText}</CopyRight>
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
