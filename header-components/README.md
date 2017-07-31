# twreporter-react-header-components

## INSTALL

Need Peer Dependencies: 

```
yarn add lodash react styled-components prop-types react-dom react-transition-group
```

Install:

```
yarn add twreporter-react-bookmarks-components --save
```

## USE

ES6:

```javascript
import Header from 'twreporter-react-header-components/lib/components/header'

const Page = (props) => (
  <div>
    <Header isChannelsDisplayed />
    {props.children}
  </div>
)
```

**Props:**

`isChannelsDisplayed`: Config to display channels menu or not.

## Developement

### Source code

* For this package: `/header-components/src/`
* Shared by all packages under `twreporter-react-components`: `/shared/`

### gulp.watch

Automatically rebuild while files change.

```
cd twreporter-react-components/header-components
npm run dev
```

### Build (pre-publish)

```
cd twreporter-react-components/header-components
npm run build
```

### Pubish

```
cd twreporter-react-components/header-components
yarn publish
```

```
cd twreporter-react-components/header-components
npm run publish
```