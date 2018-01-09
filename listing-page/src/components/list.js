import ListItem from './list-item'
import FetchingWrapper from 'shared/components/is-fetching-wrapper'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import mockup from '../constants/mockup-spec'
import styled from 'styled-components'
import { colors, fonts } from 'shared/common-variables'
import { date2yyyymmdd } from 'shared/utils'
import { linkPrefix } from 'shared/configs'
import { screen } from 'shared/style-utils'


const _ = {
  forEach,
  get,
  map,
}

const Container = styled.div`
  margin: 45px auto 0 auto;
`

const Header = styled.div`
  font-size: ${fonts.size.title.xlarge};
  font-weight: ${fonts.weight.bold};
  color: ${colors.ListHeader};
  margin: 0 auto 45px auto;
  text-align: center;

  ${screen.mobileOnly`
    width: ${(mockup.mobile.cardWidth / mockup.mobile.maxWidth) * 100}%;
    text-align: left;
  `}
`

const FlexItems = styled.div`
  width: ${mockup.hd.maxWidth}px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  > div:nth-child(odd) {
    margin-right: ${mockup.marginBetweenItems}px;
  }

  ${screen.desktopOnly`
    width: ${mockup.desktop.maxWidth}px;
  `}

  ${screen.tabletOnly`
    width: ${mockup.tablet.maxWidth}px;
  `}

  ${screen.mobileOnly`
    width: 100%;
    > div:nth-child(odd) {
      margin-right: 0;
    }
    justify-content: center;
  `}
`

class List extends PureComponent {
  render() {
    const { data, catName, tagName } = this.props
    const listJSX = []
    _.forEach(data, (item) => {
      const style = _.get(item, 'style')
      const slug = _.get(item, 'slug')
      // TODO extract interactive as to a const file
      const to = style === 'interactive' ? linkPrefix.interactiveArticle + slug : linkPrefix.article + slug

      const tags = _.map(_.get(item, 'tags'), (tag) => {
        if (_.get(tag, 'name') === tagName) {
          return {
            id: tag.id,
            name: tag.name,
            selected: true,
          }
        }
        return {
          id: _.get(tag, 'id'),
          name: _.get(tag, 'name', ''),
        }
      })

      listJSX.push(
        <ListItem
          key={_.get(item, 'id')}
          title={_.get(item, 'title', '')}
          desc={_.get(item, 'og_description', '')}
          img={{
            alt: _.get(item, 'hero_image.description'),
            src: _.get(item, 'hero_image.resized_targets.mobile.url'),
          }}
          category={_.get(item, 'categories.0.name', '')}
          pubDate={date2yyyymmdd(_.get(item, 'published_date', ''), '.')}
          tags={tags}
          link={{
            to,
            target: style === 'interactive' ? '_blank' : '',
          }}
        />,
      )
    })

    return (
      <Container>
        <Header>
          {catName || `#${tagName}`}
        </Header>
        <FlexItems>
          {listJSX}
        </FlexItems>
      </Container>
    )
  }
}

List.defaultProps = {
  data: [],
  catName: '',
  tagName: '',
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      og_description: PropTypes.string.isRequired,
      hero_image: PropTypes.object.isRequired,
      categories: PropTypes.array,
      published_date: PropTypes.string.isRequired,
      tags: PropTypes.array,
      style: PropTypes.string,
    }),
  ),
  tagName: PropTypes.string,
  catName: PropTypes.string,
}

export default FetchingWrapper(List)
