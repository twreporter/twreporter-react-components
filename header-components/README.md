# twreporter-react-header-components

## INSTALL

Need Peer Dependencies: 

```
yarn add lodash react react-dom lodash prop-types react-router react-transition-group styled-components
```

Install:

```
yarn add twreporter-react-header-components
```

## USE

ES6:

```javascript
import Header from 'twreporter-react-header-components/lib/components/header'

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

* `isIndex`: (boolean) The Component is used on index page or not.
* `pageTheme`: (string) The page theme passed by `twreporter-react`. `DARK` or `BRIGHT`.
* `pathName`: (string) The pathname passed by `twreporter-react`. With format likes `/categories/inforgraphic`, `/photography` .

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
npm publish
```
