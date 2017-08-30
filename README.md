# twreporter-react-components

## INSTALL

Need Peer Dependencies: 

```
yarn add react react-dom react-router
```

Install:

```
yarn add twreporter-react-components
```

## USE

### index-components

```javascript
import { IndexPageComposite } from 'twreporter-react-components'

const { CategorySection, EditorPicks, Header, InforgraphicSection,
  LatestSection, LatestTopicSection, NewsLetterSection, PhotographySection,
  ReporterIntro,  ReviewsSection, SideBar, TopicsSection } = IndexPageComposite.components
```

### header-components

```javascript
import { Header } from 'twreporter-react-components'

const Page = (props) => (
  <div>
    <Header
      isIndex
      pageTheme={props.pageTheme}
      pathName={props.pathName}
    />
    {props.children}
  </div>
)
```

**Props:**

* `isIndex`: (boolean) The Component is used on index page or not. (default: `false`)
* `pageTheme`: (string) The page theme passed by `twreporter-react`. `DARK` or `BRIGHT`. (default: `'BRIGHT'`)
* `pathName`: (string) The pathname passed by `twreporter-react`. With format likes `/categories/inforgraphic`, `/photography` . (default: `''`)

### footer-components

```javascript
import { Footer } from 'twreporter-react-components'

const Page = (props) => (
  <div>
    {props.children}
    <Footer />
  </div>
)
```

**Props:**

none

### listing-components

#### Topics

```javascript
import { TopicsComposite } from 'twreporter-react-components'

const { PageContent, TopSection, ListSection, PostsContainer, PostItem, TopicItem, LoadMore } = TopicsComposite

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

### Dev

`npm run dev` will build the package into the customer folder, and start watching the `.js` files change.

If any `.js` file has been changed, `gulp` will babel changed files into the customer folder automatically.

```
cd twreporter-react-components
npm run dev
```

### Build (pre-publish)

```
cd twreporter-react-components
npm run build
```

### Pubish

```
cd twreporter-react-components
npm publish
```
