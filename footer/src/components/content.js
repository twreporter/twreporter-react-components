import { colors, fonts } from 'shared/common-variables'
import { footerItemList, donateUSText, donatePage } from '../configs.js'
import { screen } from 'shared/style-utils'
import { styles } from '../styles/theme'
import appConfig from '../../../index-page/src/conf/app-config.json'
import chunk from 'lodash/chunk'
import Logo from './logo'
import map from 'lodash/map'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const _ = {
  map, chunk,
}

const groupNumOfChunk = 3

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
  ${screen.mobileOnly`
    max-width: 100%;
  `}
`

const IntroColumn = Column.extend `
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

const LinksColumn = Column.extend `
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

const flickerAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }

  50% {
    opacity: .6;
  }
`

const StyledItem = styled.a`
  display: block;
  width: 100%;
  p{
    display: inline;
    font-size: ${fonts.size.base};
    font-weight: ${fonts.weight.medium};
    letter-spacing: 1.3px;
    color: ${colors.footerGray};
  }
  span{
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    background: ${colors.footerNewsFlagRed};
    color: ${colors.white};
    font-size: ${fonts.size.xsmall};
    font-family: Roboto;
    margin-right: 5px;
    padding: 0 5px;
    vertical-align: middle;
    animation: ${flickerAnimation} .7s infinite;    
  }
  &:hover{
    p{
      color: ${colors.black};
    }
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

const DonateButton = styled.a`
  width: 140px;
  height: 55px;
  background-color: ${colors.white};
  border: solid 0.5px ${colors.pageMain};
  display: table;
  &:hover{
    background-color: ${colors.pageMain};
  }
  p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    color: ${colors.pageMain};
    font-size: ${fonts.size.base};
    font-weight: ${fonts.weight.medium};
    letter-spacing: 1.3px;
    &:hover{
      color: ${colors.white};
    }
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

const ItemList = itemGroup => _.map(itemGroup, (group, indexofGroup) => {
  return (
    <StyledItemGroup key={indexofGroup}>
      {
        _.map(group, (item, indexofItem) => {
          return (
            <StyledItem
              key={`${indexofGroup}-${indexofItem}`}
              visible={item.newFlag}
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

class Content extends React.PureComponent {
  render() {
    const description = appConfig.description
    const groupedItemList = _.chunk(footerItemList, groupNumOfChunk)
    return (
      <ContentRow>
        <IntroColumn>
          <Logo />
          <Intro>{description}</Intro>
        </IntroColumn>
        <LinksColumn>
          <StyledItemList>
            {ItemList(groupedItemList)}
          </StyledItemList>
        </LinksColumn>
        <DonateButton
          href={donatePage.link}
          target={donatePage.target}
        >
          <p>{donateUSText}</p>
        </DonateButton>
      </ContentRow>
    )
  }
}

export default Content
