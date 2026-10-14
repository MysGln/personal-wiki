<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data } from '../records.data'

const props = defineProps<{ category?: 'notes' | 'experience'; limit?: number; archive?: boolean }>()
const records = computed(() => {
  const entries = props.category ? data.filter(entry => entry.category === props.category) : data
  return props.limit ? entries.slice(0, props.limit) : entries
})
const groups = computed(() => {
  if (!records.value.length) return []
  if (!props.archive) return [{ label: '', entries: records.value }]
  const years = new Map<string, typeof data>()
  for (const entry of records.value) {
    const year = entry.date ? entry.date.slice(0, 4) : '未标日期'
    if (!years.has(year)) years.set(year, [])
    years.get(year)!.push(entry)
  }
  return Array.from(years, ([label, entries]) => ({ label, entries }))
})
</script>

<template>
  <p v-if="!records.length" class="record-empty">这里还没有记录。</p>
  <section v-for="group in groups" :key="group.label" class="record-group">
    <h2 v-if="group.label">{{ group.label }}</h2>
    <ul class="record-list">
      <li v-for="entry in group.entries" :key="entry.url">
        <div class="record-title-row">
          <a :href="withBase(entry.url)">{{ entry.title }}</a>
          <time v-if="entry.date" :datetime="entry.date">{{ entry.date }}</time>
        </div>
        <p v-if="entry.description" class="record-description">{{ entry.description }}</p>
      </li>
    </ul>
  </section>
</template>
