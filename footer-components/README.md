# twreporter-react-footer-components

## INSTALL

Need Dependencies: 

```
yarn add lodash react styled-components prop-types
```

Install the package:

```
yarn add twreporter-react-footer-components --save
```

## USE

ES6:

```javascript
import Footer from 'twreporter-react-footer-components/lib/components/footer'

const Page = (props) => (
  <div>
    <Footer />
    {props.children}
  </div>
)
```

**Props:**

none

## Developement

### Source code

* For this package: `/footer-components/src/`
* Shared by all packages under `twreporter-react-components`: `/shared/`

### gulp.watch

Automatically rebuild while files change.

```
cd twreporter-react-components/footer-components
npm run dev
```

### Build (pre-publish)

```
cd twreporter-react-components/footer-components
npm run build
```

### Pubish

```
cd twreporter-react-components/footer-components
yarn publish
```

```
cd twreporter-react-components/footer-components
npm run publish
```