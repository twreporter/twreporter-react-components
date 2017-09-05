import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { linkPrefix } from 'shared/configs'
import FetchingWrapper from 'shared/components/is-fetching-wrapper'

import PageContent from './page-content'
import { TopSection, ListSection } from './section'
import PostsContainer from './posts'
import PostItem from './post-item'
import TopicItem from './topic-item'

import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}


class Topics extends Component {
  _buildRelatedPosts(posts) {
    const _buildPostJSX = (post) => {
      const { id, linkTarget, linkTo, title, imgUrl } = post
      return (
        <PostItem
          key={`post-${id}`}
          title={title}
          imgUrl={imgUrl}
          linkTo={linkTo}
          linkTarget={linkTarget}
        />
      )
    }
    return _.map(posts, _buildPostJSX)
  }

  _buildTopicBoxes(topics) {
    const _buildTopicBox = (item, index) => {
      const { id, linkTo, title, updatedAt, description, imgUrl, imgAlt } = item
      return (
        <TopicItem
          key={`topic-${id}`}
          title={title}
          updatedAt={updatedAt}
          description={description}
          imgUrl={imgUrl}
          imgAlt={imgAlt}
          isTop={index === 0}
          linkTo={linkTo}
        />
      )
    }
    return _.map(topics, _buildTopicBox)
  }


  render() {
    const { topics, currentPage } = this.props
    const isFirstPage = currentPage === 1
    /* Build PageContent */
    const topicsJSX = this._buildTopicBoxes(topics)
    let topTopicJSX = null
    let listedTopicsJSX = null
    let topRelatedPosts = null
    let topTopicName = null
    let topTopicSlug = null
    let topSectionJSX = null
    if (isFirstPage) {
      topTopicJSX = topicsJSX[0]
      listedTopicsJSX = topicsJSX.slice(1)
      topRelatedPosts = _.get(topics, [0, 'relateds'], []).slice(0, 3) /* take 3 posts */
      topTopicName = _.get(topics, [0, 'topic_name'], '')
      topTopicSlug = _.get(topics, [0, 'slug'], '')
      topSectionJSX = (
        <TopSection topicName={topTopicName} topicUrl={`${linkPrefix.TOPICS}${topTopicSlug}`}>
          {topTopicJSX}
          <PostsContainer>
            {this._buildRelatedPosts(topRelatedPosts)}
          </PostsContainer>
        </TopSection>
      )
    } else {
      listedTopicsJSX = topicsJSX
    }

    return (
      <PageContent>
        {topSectionJSX}
        <ListSection>
          {listedTopicsJSX}
        </ListSection>
      </PageContent>
    )
  }
}

Topics.propTypes = {
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      linkTo: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      topic_name: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      imgAlt: PropTypes.string.isRequired,
      relateds: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          imgUrl: PropTypes.string.isRequired,
          linkTarget: PropTypes.string,
          linkTo: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  currentPage: PropTypes.number.isRequired,
}

Topics.defaultProps = {
  topics: [],
  currentPage: 1,
}

export default FetchingWrapper(Topics)
