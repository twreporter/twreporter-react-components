import { pageThemes } from 'shared/configs'
import { colors } from 'shared/common-variables'

export const selectTextColor = (pageTheme) => {
  switch (pageTheme) {
    case pageThemes.dark:
      return colors.footerTextLight
    case pageThemes.bright:
    default:
      return colors.footerTextDark
  }
}

export const selectBgColor = (pageTheme) => {
  switch (pageTheme) {
    case pageThemes.dark:
      return colors.photographyBg
    case pageThemes.bright:
    default:
      return colors.footerBg
  }
}
