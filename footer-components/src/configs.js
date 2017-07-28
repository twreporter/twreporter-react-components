import { externalLinks, linkPrefix } from 'shared/configs'

export const footerSections = [
  {
    name: 'about',
    items: [
      {
        slug: 'about',
        text: '關於我們',
        link: `${linkPrefix.article}about-us-footer`,
      },
      {
        slug: 'contact',
        text: '聯絡我們',
        link: `${linkPrefix.article}contact-footer`,
      },
      {
        slug: 'privacy',
        text: '隱私政策',
        link: `${linkPrefix.article}privacy-footer`,
      },
      {
        slug: 'license',
        text: '許可協議',
        link: externalLinks.ccLicense,
      },
    ],
  },
  {
    name: 'donation',
    items: [
      {
        slug: 'once',
        text: '單筆贊助',
        link: externalLinks.onceDonation,
        target: '_blank',
      },
      {
        slug: 'monthly',
        text: '定期定額',
        link: externalLinks.monthlyDonation,
        target: '_blank',
      },
    ],
  },
  {
    name: 'sns',
    items: [
      {
        slug: 'facebook',
        text: 'Facebook',
        link: externalLinks.facebook,
        target: '_blank',
      },
      {
        slug: 'instagram',
        text: 'Instagram',
        link: externalLinks.instagram,
        target: '_blank',
      },
      {
        slug: 'line',
        text: 'Line',
        link: externalLinks.line,
        target: '_blank',
      },
      {
        slug: 'github',
        text: 'Github',
        link: externalLinks.github,
        target: '_blank',
      },
      {
        slug: 'rss',
        text: 'RSS',
        link: externalLinks.rss,
        target: '_blank',
      },
    ],
  },
  {
    name: 'newsletter',
    items: [
      {
        slug: 'subcribe',
        text: '訂閱電子報',
        link: '',
      },
    ],
  },
]
