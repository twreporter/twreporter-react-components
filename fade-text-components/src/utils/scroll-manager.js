const stopPropagation = (e) => {
  e.stopPropagation()
}

const animationStartStoper = (node) => {
  if (node) {
    node.addEventListener('webkitAnimationStart', stopPropagation)
    node.addEventListener('animationstart', stopPropagation)
  }
}

const animationEndStoper = (node) => {
  if (node) {
    node.addEventListener('webkitAnimationEnd', stopPropagation)
    node.addEventListener('animationend', stopPropagation)
  }
}

const childAnimationStoper = (node) => {
  animationStartStoper(node)
  animationEndStoper(node)
}

const screenUnlocker = (e) => {
  e.stopPropagation()
  const body = document.body
  const html = document.documentElement
  body.style.overflow = 'visible'
  body.style.height = 'auto'
  body.style.touchAction = 'auto'
  body.style.position = 'static'
  html.style.overflow = 'visible'
  html.style.height = 'auto'
  html.style.touchAction = 'auto'
  html.style.position = 'static'
}

const unlockAfterAnimation = (node, cb) => {
  if (node) {
    animationStartStoper(node)
    node.addEventListener('webkitAnimationEnd', (e) => {
      screenUnlocker(e)
      if (cb) {
        cb()
      }
    })
    node.addEventListener('animationend', (e) => {
      screenUnlocker(e)
      if (cb) {
        cb()
      }
    })
  }
}

const screenLocker = (e) => {
  e.stopPropagation()
  const body = document.body
  const html = document.documentElement
  body.style.overflow = 'hidden'
  body.style.height = '100%'
  body.style.touchAction = 'manipulation'
  body.style.position = 'relative'
  html.style.overflow = 'hidden'
  html.style.height = '100%'
  html.style.touchAction = 'manipulation'
  html.style.position = 'relative'
}

const lockBeforeAnimation = (node) => {
  if (node) {
    animationEndStoper(node)
    node.addEventListener('webkitAnimationStart', (e) => { screenLocker(e) })
    node.addEventListener('animationstart', (e) => { screenLocker(e) })
  }
}

export default {
  unlockAfterAnimation,
  lockBeforeAnimation,
  childAnimationStoper,
}
