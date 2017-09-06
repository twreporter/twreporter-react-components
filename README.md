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
