import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  lang: 'zh-CN',
  title: "MysGln's Wiki",
  description: '学习笔记、实践经验和日常记录',
  base,
  srcExclude: ['README.md', 'AGENTS.md', 'templates/**', 'drafts/**'],
  head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '学习笔记', link: '/notes/' },
      { text: '实践经验', link: '/experience/' },
      { text: '归档', link: '/archive' }
    ],
    sidebar: false,
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '外观',
    darkModeSwitchTitle: '切换为深色',
    lightModeSwitchTitle: '切换为浅色',
    socialLinks: [{ icon: 'github', link: 'https://github.com/MysGln' }],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: (text) => Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text.toLowerCase()))
              .filter(segment => segment.isWordLike).map(segment => segment.segment)
          },
          searchOptions: { combineWith: 'AND', prefix: true, fuzzy: false }
        },
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索笔记' },
              modal: { noResultsText: '没有找到相关记录', resetButtonTitle: '清空', displayDetails: '显示详情', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } }
            }
          }
        }
      }
    },
    footer: { message: "MysGln's Wiki · 学习与记录" }
  }
})
