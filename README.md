[![Tag](https://img.shields.io/github/tag/twreporter/twreporter-react-components.svg)](https://github.com/twreporter/twreporter-react-components/tags)
[![NPM version](https://img.shields.io/npm/v/@twreporter/react-components.svg)](https://www.npmjs.com/package/@twreporter/react-components)

# @twreporter/react-components

## INSTALL

Need Peer Dependencies:

```
yarn add react react-dom react-router
```

Install:

```
yarn add @twreporter/react-components
```

## Usage
@twreporter/react-components pkg provides many react components we are using in our website.
It contains 
- [index-component](https://github.com/twreporter/twreporter-react-components#index-components)
- [header](https://github.com/twreporter/twreporter-react-components#header) 
- [footer](https://github.com/twreporter/twreporter-react-components#footer)
- [pagination](https://github.com/twreporter/twreporter-react-components#pagination)
- [listing-page](https://github.com/twreporter/twreporter-react-components#listing-page)
- [fullpage-slides](https://github.com/twreporter/twreporter-react-components#fullpage-slides)
- [cinemagraph](https://github.com/twreporter/twreporter-react-components#cinemagraph)
- [confirmation](https://github.com/twreporter/twreporter-react-components#confirmation)

### index-components
These components are used to render [twreporter main site homepage](https://www.twreporter.org).

Check [source code](https://github.com/twreporter/twreporter-react/tree/master/src/containers/Home.js) to understand how to use it.

### header
[Our main site](https://www.twreporter.org) uses `header` component to render the header.

Check [source code](https://github.com/twreporter/twreporter-react/blob/master/src/helpers/with-layout.js) to understand how to use it well.

### footer
[Our main site](https://www.twreporter.org) uses `footer` component to render the footer.

### pagination 
[Topic listing page](https://www.twreporter.org/topics) uses `pagination` component to show the page list.

Check [source code](https://github.com/twreporter/twreporter-react/blob/master/src/containers/Topics.js) here.

### listing-page
`listing-page` contains two different lists, one is [topic list](https://www.twreporter.org/topics), another is [post list](https://www.twreporter.org/categories/reviews).

Check [topic list source code](https://github.com/twreporter/twreporter-react/blob/master/src/containers/Topics.js) and [post list source code](https://github.com/twreporter/twreporter-react/blob/master/src/containers/Category.js) to know how to use it.

### fullpage-slides
This [high-risk-youth-life-is-a-struggle multimedia work](https://www.twreporter.org/i/high-risk-youth-life-is-a-struggle) is using `fullpage-slides` to render.

Check out the [source code](https://github.com/twreporter/static-fe-boilerplate/blob/master/child-in-relic/src/components/root.js)

### cinemagraph
In [high-risk-youth-life-is-a-struggle multimedia work](https://www.twreporter.org/i/high-risk-youth-life-is-a-struggle), you will see two images sliding from different direction to compose a single full image. That tech is using `cinemagraph` component.

Checkout the [source code](https://github.com/twreporter/static-fe-boilerplate/blob/master/child-in-relic/src/data/cinemagraph.js) here.

### confirmation-components
```javascript
import { Confirmation } from '@twreporter/react-components'


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
