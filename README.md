[![Tag](https://img.shields.io/github/tag/twreporter/twreporter-react.svg)](https://github.com/twreporter/twreporter-react/tags)
[![NPM version](https://img.shields.io/npm/v/@twreporter/react-components.svg)](https://www.npmjs.com/package/@twreporter/react-components)

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
import { TopicsList } from 'twreporter-react-components'


const Page = (props) =>(
  <div>
    <PageContent>
      <TopicsList
        currentPage={props.page}
        topics={props.data}
        isFetching={props.isFetching}
        />
    </PageContent>
  </div>
)
```

**props:**

`currentPage`(number): current page
`topics`(array): topics data
`isFetching`(boolean): is data ready

### bookmarks-components

#### twreporter-react -> src -> container -> BookmarkList

```javascript
import { Bookmark } from 'twreporter-react-components'


const Page = (props) =>(
  <div>
    <Bookmark
      bookmarkData={bookmarkData}
      handleBookmarkIconOnClick={this.handleBookmarkIconOnClick}
      total={total}
    />
  </div>
)
```

**props:**

* `bookmarkData`(array): array of objs. The obj should has following keys
```javascript
const {
  thumbnail,
  category,
  title,
  desc,
  published_date,
  slug,
  is_external,
  host,
} = _.get(this.props, 'bookmarkData', {})
```
* `handleBookmarkIconOnClick`(func): Each bookmark row contains a bookmark icon. OnClick the icon will trigger the func
* `total`(number): total number of bookmarks of the user.


### confirmation-components

#### twreporter-react -> src -> container -> BookmarkList

```javascript
import { Confirmation } from 'twreporter-react-components'


const Page = (props) =>(
  <div>
    <Confirmation
      onCancel={this.onCancel}
      onConfirm={this.onConfirm}
      content={DIALOG_CONTENT}
      confirm={DIALOG_CONFIRM}
      cancel={DIALOG_CANCEL}
    />
  </div>
)
```

**props:**

* `onCancel`(func): User click on cancel button will trigger onCancel
* `onConfirm`(func): User click on cancel button will trigger onConfirm
* `content`(string): Information in dialog
* `confirm`(string): confirm button text
* `cancel`(string): cancel button text



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
