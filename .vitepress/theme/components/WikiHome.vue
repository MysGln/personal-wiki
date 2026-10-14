<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import RecordList from './RecordList.vue'

const selected = ref<undefined | 'notes' | 'experience'>()
const filters = [
  { label: '全部', value: undefined },
  { label: '学习笔记', value: 'notes' as const },
  { label: '实践经验', value: 'experience' as const }
]
</script>

<template>
  <div class="topic-index" aria-label="记录分类">
    <a :href="withBase('/notes/')">
      <span class="topic-title">学习笔记 <span aria-hidden="true">↗</span></span>
      <span class="topic-detail">知识、阅读与学习中的理解</span>
    </a>
    <a :href="withBase('/experience/')">
      <span class="topic-title">实践经验 <span aria-hidden="true">↗</span></span>
      <span class="topic-detail">尝试、问题与可复用的方法</span>
    </a>
  </div>

  <section class="recent-records">
    <div class="records-heading">
      <h2>最近记录</h2>
      <a :href="withBase('/archive.html')">查看归档 →</a>
    </div>
    <div class="record-filters" role="group" aria-label="筛选记录分类">
      <button v-for="filter in filters" :key="filter.label" type="button" :aria-pressed="selected === filter.value" @click="selected = filter.value">{{ filter.label }}</button>
    </div>
    <RecordList :category="selected" :limit="6" />
  </section>
</template>
