# @twreporter/react-article-components

This `articles` branch is used to build up [@twreporter/react-article-components pkg](https://www.npmjs.com/package/@twreporter/react-article-components).

## Why need @twreporter/react-article-components?
The goal is to separate the `react components` from [twreporter-react](https://github.com/twreporter/twreporter-react), 

and make `@twreporter/react-article-components` be able to used by other projects, such as [twreporter-keystone](https://github.com/twreporter/keystone).


## How to use?

### Clone repo
```
git clone https://github.com/twreporter/twreporter-react-components.git
```

### Transpile and webpack
```
npm run build
```

The command above will transpile js files by babel into `dist` folder, 

and webpack the scss, css and svg files into `dist/styles/main.css`

### Tag and publish
```
npm run release
```

This command will create a new git tag according to the version in the package.json,

and npm publish this built pkg.

