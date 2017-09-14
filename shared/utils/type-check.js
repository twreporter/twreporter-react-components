import { warning } from './warning'

const chooseArticle = (string = '') => {
  const vowels = ['u', 'o', 'i', 'e', 'a']
  if (vowels.findIndex(string.substr(0, 1)) !== -1) {
    return 'an'
  }
  return 'a'
}

export const checkTypeof = (target, type, paraName = 'parameter') => {
  const typeOfTarget = typeof target
  if (typeof target !== type) {
    warning(`${paraName} should be ${chooseArticle(type)} ${type}, but is ${chooseArticle(typeOfTarget)} ${typeOfTarget}.`)
    return false
  }
  return true
}
