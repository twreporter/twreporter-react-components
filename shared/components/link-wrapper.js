import Link from 'react-router-dom/Link'

/*
* Since the `to` property is required in react-router v4,
* the anchor tag with no specified `href` will be transformed
* to `a` tag in this wrapper function.
*/
const LinkWrapper = (props) => {
  const Component = props.to ? Link : 'a'
  return (
    <Component {...props}>
      { props.children }
    </Component>
  )
}

export default LinkWrapper

