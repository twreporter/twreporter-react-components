### UNRELEASED
- Upgrade react-router-dom@^4.3.1
- Upgrade react@^16.3.0
- Upgrade react-dom@^16.3.0
- Upgrade styled-components@^4.1.3
- Remove built-in Header in latest-section of index-page

### 5.1.3
- Add url event label to google analysis click event

### 5.1.1
- Update react-ga@^2.5.3
- Fix prop mismatch between client and server in ga Outbound link

### 5.1.0
- Add ga event to donation button in footer and homepage donation section
- Add IJM brochure download link to footer

### 5.0.1
- Upgrade dependencies due to vulnerabilities warning

### 5.0.0
- Update styled-components@^3.0.0

### 4.1.4
- [Bug] Fix block scrolling bug in Footer on Android devices

### 4.1.3
- [Bug] Fix block scrolling bug in Footer

### 4.1.2
- [Bug] Fix wrong height of footer when it is used on sites apart from our main website

### 4.1.1
-  Some updates in the new footer component after testing

### 4.1.0
- Add new Footer
- Add donation section to homepage

### 4.0.11
- Add about-us page link to Footer

### 4.0.10
- [Bug] Modifies the length of truncated title in editor-picks

### 4.0.9
- Remove `velocityComponent` in `editor-picks-mobile` and use css `transition` instead to implement fade-in-fade-out animation

### 4.0.8
- [Bug] Fix the transparency bug of editor-picks on IE and Edge

### 4.0.7
- Remove `velocityComponent` in `fadein-fadeout component` to fix the layout of editor-picks on tablet
- Remove `velocityComponent` in `editor-picks` for wrong positioning of title
- Remove `velocityComponent` and use css `transition` instead to animate the header-slide-down-panel

### 4.0.6
- To provide footer to other projects which doesn't have react-router[#95](https://github.com/twreporter/twreporter-react-components/pull/95)

### 4.0.5
- Bug fix. Replace url prefix of images resources in production state

### 4.0.4
- Add `srcSet` and `sizes` to `img-wrapper.js` so that images of different sizes will be rendered on resolution demand

### 4.0.3
- Changes the text of politicsAndEconomy in categoryConfigs.(政治．經濟 -> 政經．產業)

### 4.0.2
- Update confirmation component. Show warning icon on demand
- Add more side bar handling for edge cases

### 4.0.1
- Update props of `Pagination`
- Update `.babelrc` to remove unsupported svg attributes

### 4.0.0
- Create a Side Bar High Order Component in side-bar/components/side-bar.js
- Delete index-page/src/components/side-bar.js

### 3.0.2
- [Bug] Import Header component the right way

### 3.0.1
- [Bug] Export Header component with back foward compatibly 

### 3.0.0
- Move bookmark to @twreporter/registration
- Update page slides to contain bookmark service
- Add AuthenticationContext which is used as react.context to avoid not re-rendering problem

### 2.1.12
- Refine font-weight settings

### 2.1.11
- Stop using `React.PropTypes`, `import PropTypes from 'prop-types'` instead

### 2.1.10
- Revert `Optimize svg files` commit(in v2.1.8)

### 2.1.9
- Update error 500 English svg

### 2.1.8
- Optimize svg files

### 2.1.7
- Update lience link in the footer. Link to /a/lience-footer

### 2.1.6
- [error] Fixup Error modules

### 2.1.5
- [error] Add ErrorPage

### 2.1.4
- Fix bookmark customized link warning
- Fix redirection of bookmarks page in signin condition (header slide down panel)

### 2.1.3
- Update donation links

### 2.1.2
- Bug fix. Redirect to the page or scroll to the position after clicking link in the header panel.

### 2.1.1
- Make header slide down smoothly
- Reduce bundle size by importing only we need

### 2.1.0
- Upgrade dependencies to support react@^16.0.0

### 2.0.6
- Upgrade peer dependencies, react-router
- Fix content overflow in the editor-pick section of the homepage
- [header] Fix serach box styling errors

### 2.0.5
- Reset h2 margin to 0

### 2.0.4
- Fix header `<a>` font color

### 2.0.3
- Make whole bookmark clickable in the bookmark list
- Give <a> tag a default color

### 2.0.2
- Code adjustments after merging Mobile narvar and Bookmark features

### 2.0.1
- Create Mobile navbar feature

### 1.3.3
- [index-page] Change velocity-react to scoped version

### 1.3.1
- Change hiring wording

### 1.3.0
- Make each sub folder could be required by clients.
  - EX: var Header = require('@twreporter/react-components/lib/header')
  - var Footer = require('@twreporter/react-components/lib/footer')
- Add hiring channel on navigation bar
- Add hiring info block in reporter-intro.js

### 1.2.2
- Update .npmignore

### 1.1.5
- Update fade-text components with new solution for locking scroll.

### 1.1.4
- Update fade-text components to provide screen utility.

### 1.1.2
- Only wrap list section in Topics component for isFetching
- Fix topics linkto bug

### 1.1.1
- Update header component to dynamic
- Add new fade text component

### 1.1.0
- Add theme to header and footer component

### 1.0.11
- Make the text area of editor-picks be swipeable

### 1.0.10
- Remove useless subfolder configs
- Update babelrc
- Change wording from '觀點' to '評論'

### 1.0.9
- Add pagination
- Pack topics components into one topicsList

### 1.0.8
- Update editor-picks truncate number from 28 to 26

### 1.0.7
- Add arrows to editor-picks
- Update style-utils (finalMedia with more options in index-compmonents)
- Update smooth scroll in side-bar
- Solve gutter problem of index page

### 1.0.6
- Change image loading placeholder

### 1.0.5
- Bug fix. Show tags on Category listing page.

### 1.0.4
- Bug fix. Listing page is not center on mobile.

### 1.0.2
- Add shared/components/is-fetching-wrapper.js, which will make wrapped component animated.
- Update gulpfile. Watch ./main.js. Remove copy node_modules when copy-files-to-customer-folder.

### 1.0.1
- [Feature] Category/Tag listing page

### 1.0.0

- Pack all components into one npm package
- Remove articles-components
- Add index-compmonents
