import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import TRLink from './common-utils/twreporter-link'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import get from 'lodash/get'
import sectionStrings from '../constants/section-strings'
import strings from '../constants/strings'
import styled from 'styled-components'
import topicPropType from './prop-types/topic'
import { breakPoints, finalMedia, truncate } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'
import { getHref } from '../utils/getHref'
import { itemWidthPct } from '../constants/mobile-mockup-specification'

const _ = {
  get,
}

const mockup = {
  img: {
    sizes: {
      desktop: '426px',
      tablet: '220px',
      mobile: '279px',
    },
  },
}

const categoryPrefix = strings.topic + strings.fullShapeDot
const mobileWidth = breakPoints.mobileMaxWidth
const Container = styled.div`
  background-color: #f2f2f2;
`

const ContentContainer = Section.extend`
  text-align: center;
`

const TopicFrame = styled.div`
  width: 447px;
  margin: 0 auto;
  ${finalMedia.mobile`
    width: 100%;
  `}
`

const Title = styled.div`
  width: 374px;
  font-size: ${fonts.size.title.large};
  font-weight: ${fonts.weight.bold};
  line-height: 1.25;
  color: ${colors.textGrey};
  text-align: center;
  margin: 2px auto 0 auto;
  ${finalMedia.mobile`
    font-size: ${fonts.size.title.medium};
    width: ${itemWidthPct}%;
  `}
`

const Description = styled.div`
  margin-top: 12px;
  width: 447px;
  font-size: ${fonts.size.medium};
  line-height: 1.5;
  text-align: justify;
  color: ${colors.textGrey};
  ${finalMedia.mobile`
    width: ${itemWidthPct}%;
    margin: 6px auto 0 auto;
    font-size: ${fonts.size.large};
  `}
`

// container for relateds FlexItem
const FlexBox = styled.div`
  margin-top: 48px;
  min-height: 335px;
  padding: 0 48px;
  display: flex;
  justify-content: center;
  ${finalMedia.desktop`
    padding: 0 49px;
  `}
  ${finalMedia.tablet`
    padding: 0 34px;
  `}
  ${finalMedia.mobile`
    display: none;
  `}
`

// container for each related articles
const FlexItem = styled.div`
  min-height: 335px;
  width: 426px;
  &:nth-child(2) {
    margin: 0 33px;
  }
  ${finalMedia.desktop`
    width: 290px;
    &:nth-child(2) {
      margin: 0 28px;
    }
  `}
  ${finalMedia.tablet`
    width: 220px;
    &:nth-child(2) {
      margin: 0 20px;
    }
  `}
  ${finalMedia.mobile`
    width: 100%;
  `}
`

const MobileList = MobileListUtils.extend`
  margin-top: 30px;
`

const RelatedsContentFrame = styled.div`
  width: 100%;
  height: auto;
  padding: 0 8px 0 8px;
`

const RelatedCategory = CategoryName.extend`
  text-align: left;
  margin: 12px 0 2px 0;
`

const RelatedTitle = styled.div`
  font-size: ${fonts.size.title.base};
  font-weight: ${fonts.weight.bold};
  color: ${colors.textGrey};
  line-height: 1.5;
`

const RelatedDescription = styled.div`
  margin-top: 8px;
  height: auto;
  font-size: ${fonts.size.medium};
  line-height: 20px;
  color: ${colors.textGrey};
  ${truncate('relative', 1.43, 4, '#f2f2f2')};
  ${finalMedia.mobile`
    font-size: ${fonts.size.large};
  `}
`
const MoreFrame = styled.div`
  margin: 60px auto 0 auto;
  @media (max-width: ${mobileWidth}) {
    margin: 40px auto 0 auto;
  }
`

const ImgFrame = styled.div`
  height: 274px;
  ${finalMedia.desktop`
    height: 186px;
  `}
  ${finalMedia.tablet`
    height: 140px;
  `}
  ${finalMedia.mobile`
    height: 186px;
  `}
`

class LatestTopic extends React.PureComponent {
  render() {
    const { data, useTinyImg } = this.props
    const maxSwipableItems = 2
    const relateds = _.get(data, 'relateds', []).slice(0, 3).map((post) => {
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      return (
        <FlexItem
          key={_.get(post, 'id')}
          mobileWidth={mobileWidth}
        >
          <TRLink href={href} redirect={style === 'interactive'}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(post, 'hero_image.description')}
                src={_.get(post, ['hero_image', 'resized_targets', useTinyImg ? 'tiny' : 'mobile', 'url'])}
                srcSet={_.get(post, 'hero_image.resized_targets', '')}
                sizes={
                  `(min-width: ${breakPoints.desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${breakPoints.tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImgFrame>
            <RelatedsContentFrame>
              <RelatedCategory>
                {`${categoryPrefix}${_.get(data, 'topic_name', '')}`}
              </RelatedCategory>
              <RelatedTitle>
                {_.get(post, 'title', '')}
              </RelatedTitle>
              <RelatedDescription>
                {_.get(post, 'og_description', '')}
              </RelatedDescription>
            </RelatedsContentFrame>
          </TRLink>
        </FlexItem>
      )
    })

    return (
      <Container>
        <ContentContainer
          mobileWidth={mobileWidth}
        >
          <SectionName
            mobileWidth={mobileWidth}
          >
            <span>{sectionStrings.latestTopic}</span>
          </SectionName>
          <TopicFrame>
            <CategoryName>{`${categoryPrefix}${_.get(data, 'topic_name', '')}`}</CategoryName>
            <Title>{_.get(data, 'title', '')}</Title>
            <Description>{_.get(data, 'og_description', '')}</Description>
          </TopicFrame>
          <FlexBox>
            {relateds}
          </FlexBox>
          <MobileList
            maxWidth={mobileWidth}
          >
            <MobileFlexSwipeable.SwipableFlexItems
              alignItems={'flex-start'}
              mobileWidth={mobileWidth}
              maxSwipableItems={maxSwipableItems}
            >
              {relateds}
            </MobileFlexSwipeable.SwipableFlexItems>
          </MobileList>
          <MoreFrame>
            <BottomLink
              text={`更多${_.get(data, 'topic_name', '')}文章`}
              path={`topics/${_.get(data, 'slug', '')}`}
            />
          </MoreFrame>
        </ContentContainer>
      </Container>
    )
  }
}

LatestTopic.defaultProps = {
  data: {},
  useTinyImg: false,
}

LatestTopic.propTypes = {
  data: topicPropType(),
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(LatestTopic)
