import ImgWrapper from './image'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import mockup from '../constants/mockup-spec'
import styled from 'styled-components'
import { Link } from 'react-router'
import { colors, fonts } from 'shared/common-variables'
import { linkPrefix } from 'shared/configs'
import { screen } from 'shared/style-utils'

const _ = {
  forEach,
  get,
}

const Container = styled.div`
  width: ${mockup.hd.cardWidth}px;
  ${screen.desktopOnly`
    width: ${mockup.desktop.cardWidth}px;
  `}
  ${screen.tabletOnly`
    width: ${mockup.tablet.cardWidth}px;
  `}
  ${screen.mobileOnly`
    width: ${(mockup.mobile.cardWidth / mockup.mobile.maxWidth) * 100}%;
  `}

  a {
    color: ${colors.textGrey};
  }
`

const HoverEffect = styled.div`
  opacity: 1;
  ${screen.tabletAbove`
    &:hover {
      opacity: 0.7;
    }
    transition: 200ms opacity linear;
  `}
`

const ImgFrame = styled.div`
  height: ${mockup.hd.imgHeight}px;
  ${screen.desktopOnly`
    height: ${mockup.desktop.imgHeight}px;
  `}
  ${screen.tabletOnly`
    height: ${mockup.tablet.imgHeight}px;
  `}
  ${screen.mobileOnly`
    height: ${mockup.mobile.imgHeight}px;
  `}
`

const TextBlock = styled.div`
  width: ${(mockup.desktop.textWidth / mockup.desktop.cardWidth) * 100}%;
  margin: 12px auto 0 auto;
  cursor: pointer;
  ${screen.mobileOnly`
    width: 100%;
  `}
`

const Category = styled.div`
  color: ${colors.primaryColor};
  font-size: ${fonts.size.small};
  line-height: 1.33;
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: ${fonts.size.title.base};
  font-weight: ${fonts.weight.bold};
  line-height: 1.4;
  color: ${colors.textGrey};
  margin-bottom: 10px;
`

const Desc = styled.div`
  position: relative;
  font-size: ${fonts.size.medium};
  line-height: 1.5;
  text-align: justify;
  padding-bottom: 30px;
`

const Tags = styled.ul`
  list-style: none;
  width: ${(mockup.desktop.tagsWidth / mockup.desktop.cardWidth) * 100}%;
  margin-bottom: 40px;
  padding-left: 15px;
  line-height: 1;

  ${screen.mobileOnly`
    width: ${(mockup.mobile.tagsWidth / mockup.mobile.cardWidth) * 100}%;
    padding-left: 0;
  `}
`

const PubDate = styled.div`
  position: absolute;
  bottom: -20px;
  font-size: ${fonts.size.small};
  right: 0;
`

const Tag = styled.li`
  background-color: ${(props) => { return props.selected ? colors.primaryColor : colors.bodyBgWhite }};
  border: 2px solid ${colors.primaryColor};
  border-radius: 68px;
  color: ${(props) => { return props.selected ? colors.white : colors.primaryColor }};
  display: inline-block;
  text-decoration: none;
  line-height: 1.45;
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.bold};
  padding: 2px 10px;
  margin-right: 13px;
  margin-bottom: 10px;
`

class ListItem extends PureComponent {
  render() {
    const { title, desc, img, link, category, tags, pubDate } = this.props
    const tagsJSX = []
    _.forEach(tags, (tag) => {
      const id = _.get(tag, 'id')
      const name = _.get(tag, 'name')
      if (id && name) {
        tagsJSX.push(
          <Link
            key={id}
            to={linkPrefix.tag + id}
          >
            <Tag
              selected={_.get(tag, 'selected')}
            >
              {name}
            </Tag>
          </Link>,
        )
      }
    })
    return (
      <Container>
        <Link
          {...link}
        >
          <HoverEffect>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(img, 'alt', '')}
                src={_.get(img, 'src', '')}
              />
            </ImgFrame>
            <TextBlock>
              <Category>
                {category}
              </Category>
              <Title>
                {title}
              </Title>
              <Desc>
                {desc}
                <PubDate>{pubDate}</PubDate>
              </Desc>
            </TextBlock>
          </HoverEffect>
        </Link>
        <Tags>
          {tagsJSX}
        </Tags>
      </Container>
    )
  }
}

ListItem.defaultProps = {
  tags: [],
  link: {
    to: '',
    target: '',
  },
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
  }).isRequired,
  link: PropTypes.shape({
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
  }),
  category: PropTypes.string.isRequired,
  pubDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  })),
}

export default ListItem
