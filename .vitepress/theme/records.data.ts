import { createContentLoader } from 'vitepress'

export interface RecordEntry {
  title: string
  url: string
  date: string
  description: string
  category: 'notes' | 'experience'
}

declare const data: RecordEntry[]
export { data }

export default createContentLoader(['notes/**/*.md', 'experience/**/*.md'], {
  transform(pages): RecordEntry[] {
    return pages.filter(page => page.frontmatter.record === true).map(page => ({
      title: String(page.frontmatter.title || '未命名记录'),
      url: page.url,
      date: String(page.frontmatter.date || '').slice(0, 10),
      description: String(page.frontmatter.description || ''),
      category: page.url.startsWith('/experience/') ? 'experience' : 'notes'
    })).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'))
  }
})
