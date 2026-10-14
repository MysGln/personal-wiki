import DefaultTheme from 'vitepress/theme'
import RecordList from './components/RecordList.vue'
import WikiHome from './components/WikiHome.vue'
import './typography.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('RecordList', RecordList)
    app.component('WikiHome', WikiHome)
  }
}
