function checkIfPropsChanged(propsToBeChecked, prevProps, nextProps) {
  let shouldUpdate = false
  for (let i = 0, l = propsToBeChecked.length; i < l; i += 1) {
    if (prevProps[propsToBeChecked[i]] !== nextProps[propsToBeChecked[i]]) {
      shouldUpdate = true
    }
  }
  return shouldUpdate
}

export default checkIfPropsChanged
