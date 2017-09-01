import BottomTRLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileList from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import sectionStrings from '../constants/section-strings'
import strings from '../constants/strings'
import styled from 'styled-components'
import topicPropType from './prop-types/topic'
import { breakPoints, finalMedia, truncate } from '../utils/style-utils'
import { fonts, colors } from '../styles/common-variables'

const _ = {
  forEach,
  get,
}

const mockup = {
  hd: {
    width: {
      default: 543,
    },
  },
  desktop: {
    width: {
      default: 369,
      desc: 340,
    },
  },
  tablet: {
    width: {
      default: 280,
    },
  },
}

const Container = styled.div`
  background-color: #f2f2f2;
`

const Rows = styled.div`
  margin-bottom: 70px;

  ${finalMedia.mobile`
    display: none;
  `}
`

const Row = styled.div`
  display: flex;
  text-align: center;
`

const TopicNameRow = Row.extend`
  align-items: flex-end;
  justify-content: center;
`

const TitleRow = Row.extend`
  align-items: center;
  justify-content: center;
`

const ImgRow = Row.extend`
  align-items: flex-start;
  justify-content: center;
`

const DescRow = Row.extend`
  align-items: flex-start;
  justify-content: center;
  text-align: justify;
`

const Column = styled.div`
  flex: 0 0 ${mockup.hd.width.default}px;
  margin-bottom: 12px;
  cursor: pointer;
  &:first-child {
    margin-right: 30px;
  }

  opacity: ${props => (props.ifHover ? 0.7 : 1)};
  transition: .2s opacity linear;

  ${finalMedia.desktop`
    flex: 0 0 ${mockup.desktop.width.default}px;
  `}

  ${finalMedia.tablet`
    flex: 0 0 ${mockup.tablet.width.default}px;
    &:first-child {
      margin-right: 20px;
    }
  `}
`

const TopicNameColumn = Column.extend`
  margin-bottom: 0;
  font-size: ${fonts.size.small};
  color: ${colors.primaryColor};
`

const TitleColumn = Column.extend`
  font-size: ${fonts.size.title.large};
  font-weight: 600;
`

const Title = styled.div`
  color: ${colors.textGrey};
  line-height: 1.25;
`

const ImgColumn = Column.extend`
  height: 364px;
  flex: 0 0 ${mockup.hd.width.default}px;

  ${finalMedia.desktop`
    height: 247px;
  `}

  ${finalMedia.tablet`
    height: 186px;
  `}
`

const DescColumn = Column.extend`
  font-size: ${fonts.size.medium};
  line-height: 1.5
`

const Desc = styled.div`
  width: ${(mockup.desktop.width.desc / mockup.desktop.width.default) * 100}%;
  margin: 0 auto;
  color: ${colors.textGrey};
`

const Mobile = {
  TopicName: CategoryName.extend`
    text-align: center;
  `,
  Item: styled.div`
    padding-bottom: 40px;
    width: 100%;
  `,
  Title: Title.extend`
    line-height: 1.33;
    text-align: center;
    font-weight: 600;
    font-size: ${fonts.size.title.medium};
    margin-bottom: 15px;
    margin-top: 4px;
  `,
  Img: styled.div`
    height: 186px;
    width: 100%;
    margin: 0 auto;
  `,
  DescFrame: styled.div`
    width: 100%;
    height: 165px;
    margin-top: 15px;
  `,
  Desc: Desc.extend`
    width: 100%;
    font-size: ${fonts.size.large};
    ${truncate('relative', 1.5, 6, colors.sectionGrey)}
    margin-left: 0;
  `,
}

const More = styled.div`
  text-align: center;
`


class MobileTopic extends React.PureComponent {
  render() {
    const { title, topicName, desc, imgObj, slug } = this.props
    const href = `topics/${slug}`
    return (
      <Mobile.Item>
        <TRLink href={href} plain>
          <Mobile.TopicName>{`${strings.topic}${strings.fullShapeDot}${topicName}`}</Mobile.TopicName>
          <Mobile.Title>
            {title}
          </Mobile.Title>
          <Mobile.Img>
            <ImgWrapper
              src={imgObj.src}
              alt={imgObj.alt}
              srcSet={imgObj.srcSet}
            />
          </Mobile.Img>
          <Mobile.DescFrame>
            <Mobile.Desc>
              {desc}
            </Mobile.Desc>
          </Mobile.DescFrame>
        </TRLink>
      </Mobile.Item>
    )
  }
}

MobileTopic.defaultProps = {
  title: '',
  topicName: '',
  desc: '',
  imgObj: {},
  slug: '',
}

MobileTopic.propTypes = {
  title: PropTypes.string,
  topicName: PropTypes.string,
  desc: PropTypes.string,
  imgObj: PropTypes.object,
  slug: PropTypes.string,
}

class TopicsInARow extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      indexHovered: -1,
    }
    this.handleHover = this._handleHover.bind(this)
  }

  _handleHover(index) {
    this.setState({
      indexHovered: index,
    })
  }

  render() {
    const { data, useTinyImg } = this.props
    const { indexHovered } = this.state
    const topicNameColumns = []
    const titleColumns = []
    const imgColumns = []
    const descColumns = []

    _.forEach(data, (topic, index) => {
      const slug = _.get(topic, 'slug')
      const href = `topics/${slug}`
      const id = _.get(topic, 'id')
      const topicName = _.get(topic, 'topic_name', '')
      const title = _.get(topic, 'title', '')
      const imgObj = _.get(topic, 'leading_image') || _.get(topic, 'og_image')
      const desc = _.get(topic, 'og_description', '')

      topicNameColumns.push(
        <TopicNameColumn key={id}>{topicName}</TopicNameColumn>,
      )

      titleColumns.push(
        <TitleColumn
          key={id}
          ifHover={indexHovered === index}
          onMouseOver={() => { this.handleHover(index) }}
          onMouseLeave={() => { this.handleHover(-1) }}
        >
          <TRLink href={href} plain><Title>{title}</Title></TRLink>
        </TitleColumn>,
      )

      imgColumns.push(
        <ImgColumn
          key={id}
          ifHover={indexHovered === index}
          onMouseOver={() => { this.handleHover(index) }}
          onMouseLeave={() => { this.handleHover(-1) }}
        >
          <TRLink href={href} plain>
            <ImgWrapper
              src={_.get(imgObj, ['resized_targets', useTinyImg ? 'tiny' : 'mobile', 'url'])}
              alt={_.get(imgObj, 'description')}
            />
          </TRLink>
        </ImgColumn>,
      )

      descColumns.push(
        <DescColumn
          key={id}
          ifHover={indexHovered === index}
          onMouseOver={() => { this.handleHover(index) }}
          onMouseLeave={() => { this.handleHover(-1) }}
        >
          <TRLink href={href} plain>
            <Desc>{desc}</Desc>
          </TRLink>
        </DescColumn>,
      )
    })

    return (
      <Rows>
        <TopicNameRow>{topicNameColumns}</TopicNameRow>
        <TitleRow>{titleColumns}</TitleRow>
        <ImgRow>{imgColumns}</ImgRow>
        <DescRow>{descColumns}</DescRow>
      </Rows>
    )
  }
}

TopicsInARow.defaultProps = {
  data: [],
  useTinyImg: false,
}

TopicsInARow.propTypes = {
  data: PropTypes.arrayOf(topicPropType()),
  useTinyImg: PropTypes.bool,
}

class TopicsSection extends React.PureComponent {
  render() {
    const totalTopics = 4
    const { data, useTinyImg, moreURI } = this.props
    if (!Array.isArray(data) || _.get(data, 'length', 0) === 0) {
      return null
    }

    const mobileTopicComps = data.map((item) => {
      const desc = _.get(item, 'og_description')
      const imgObj = _.get(item, 'leading_image') || _.get(item, 'og_image')
      return (
        <MobileTopic
          key={_.get(item, 'id')}
          title={_.get(item, 'title')}
          topicName={_.get(item, 'topic_name')}
          desc={desc}
          imgObj={{
            alt: _.get(imgObj, 'description'),
            src: _.get(imgObj, ['resized_targets', useTinyImg ? 'tiny' : 'mobile', 'url']),
          }}
          slug={_.get(item, 'slug')}
        />
      )
    })

    return (
      <Container>
        <Section>
          <SectionName>
            <span>{sectionStrings.topic}</span>
          </SectionName>
          <TopicsInARow data={data.slice(0, 2)} useTinyImg={useTinyImg} />
          <TopicsInARow data={data.slice(2, totalTopics)} useTinyImg={useTinyImg} />
          <MobileList
            maxWidth={breakPoints.mobileMaxWidth}
          >
            <MobileFlexSwipeable.SwipableFlexItems
              mobileWidth={breakPoints.mobileMaxWidth}
              maxSwipableItems={totalTopics - 1}
            >
              {mobileTopicComps}
            </MobileFlexSwipeable.SwipableFlexItems>
          </MobileList>
          <More><BottomTRLink text="更多報導者專題" path={moreURI} /></More>
        </Section>
      </Container>
    )
  }
}

TopicsSection.defaultProps = {
  data: [],
  moreURI: 'topics',
  useTinyImg: false,
}

TopicsSection.propTypes = {
  data: PropTypes.arrayOf(topicPropType()),
  moreURI: PropTypes.string,
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(TopicsSection)
