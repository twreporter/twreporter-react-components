# twreporter-react-listing-components

## INSTALL

Need Dependencies: 

```
yarn add react lodash prop-types react-router styled-components
```

Install the package:

```
yarn add twreporter-react-listing-components
```

## USE

### Topics

```javascript
import { TopicsComponents } from 'twreporter-react-listing-components'

const { PageContent, TopSection, ListSection, PostsContainer, PostItem, TopicItem, LoadMore } = TopicsComponents

const Page = (props) =>(
  <div>
    <PageContent>
        <TopSection topicName={props.topTopicName} topicUrl={props.topicUrl}>
          <TopicItem
            key={props.topTopic.key}
            title={props.topTopic.title}
            updatedAt={props.topTopic.updatedAt}
            description={props.topTopic.description}
            imgUrl={props.topTopic.imgUrl}
            imgAlt={props.topTopic.imgAlt}
            isFull={props.topTopic.isFull}
            url={props.topTopic.url}
          />
          <PostsContainer>
            {props.postsArray.map(post => (
              <PostItem
                key={post.key}
                title={post.title}
                imgUrl={post.imgUrl}
                linkTo={post.linkTo}
                linkTarget={post.linkTarget}
              />
            ))}
          </PostsContainer>
        </TopSection>)}
      <ListSection>
        {props.topicsArray.map(topic => (
          <TopicItem
            key={topic.key}
            title={topic.title}
            updatedAt={topic.updatedAt}
            description={topic.description}
            imgUrl={topic.imgUrl}
            imgAlt={topic.imgAlt}
            isFull={topic.isFull}
            url={topic.url}
          />
        ))}
      </ListSection>
    </PageContent>
  </div>
)
```

## Developement

### Source code

* For this package: `/listing-components/src/`
* Shared by all packages under `twreporter-react-components`: `/shared/`

### gulp.watch

Automatically rebuild while files change.

```
cd twreporter-react-components/listing-components
npm run dev
```

### Build (pre-publish)

```
cd twreporter-react-components/listing-components
npm run build
```

### Pubish

```
cd twreporter-react-components/listing-components
npm publish
```