<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import type { Span } from '../data/types';
import { axisFor, formatRange, orderSpans, spanBox, yearTicks } from '../lib/timeline';
import SpanDetail from './SpanDetail.vue';

const props = defineProps<{ spans: Span[]; now: string }>();

const axis = computed(() => axisFor(props.spans, props.now));
const ticks = computed(() => yearTicks(axis.value));
const rows = computed(() =>
  orderSpans(props.spans).map(({ span, depth }, lane) => {
    const box = spanBox(span, axis.value, props.now);
    return { span, depth, lane, box, range: formatRange(span), flip: box.offset > 50 };
  }),
);

const openId = ref<string | null>(null);
const openRow = computed(() => rows.value.find((r) => r.span.id === openId.value));

// Phones put the panel under the whole chart; the label column is too narrow for it.
const narrow = ref(false);
let query: MediaQueryList | undefined;
const syncNarrow = () => (narrow.value = query?.matches ?? false);
onMounted(() => {
  query = window.matchMedia('(max-width: 719px)');
  syncNarrow();
  query.addEventListener('change', syncNarrow);
});
onBeforeUnmount(() => query?.removeEventListener('change', syncNarrow));
const list = ref<HTMLElement | null>(null);
const narrowPanel = ref<{ $el: HTMLElement } | null>(null);

const buttons = () => Array.from(list.value?.querySelectorAll<HTMLButtonElement>('button.span') ?? []);

function toggle(id: string) {
  openId.value = openId.value === id ? null : id;
  // On phones the panel sits under the whole chart, often off-screen.
  if (narrow.value && openId.value) nextTick(() => narrowPanel.value?.$el.scrollIntoView({ block: 'nearest' }));
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && openId.value) {
    const id = openId.value;
    openId.value = null;
    nextTick(() => document.getElementById(`span-${id}`)?.focus());
    return;
  }
  const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
  if (!step) return;
  const all = buttons();
  const current = all.indexOf(document.activeElement as HTMLButtonElement);
  if (current === -1) return;
  event.preventDefault();
  all[Math.min(Math.max(current + step, 0), all.length - 1)].focus();
}
</script>

<template>
  <section class="trace" aria-label="Career timeline" @keydown="onKeydown">
    <ul class="trace__legend" aria-label="Span colours">
      <li><span class="swatch" data-stack="ruby"></span>Rails / Ruby</li>
      <li><span class="swatch" data-stack="node"></span>React / Node / TypeScript</li>
      <li><span class="swatch" data-stack="python"></span>Python</li>
    </ul>

    <div class="trace__chart" :style="{ '--lanes': rows.length }">
      <div class="trace__ticks" aria-hidden="true">
        <span v-for="tick in ticks" :key="tick.year" class="tick mono" :style="{ '--offset': tick.offset }">
          {{ tick.year }}
        </span>
      </div>

      <ol ref="list" class="trace__rows">
        <li
          v-for="row in rows"
          :key="row.span.id"
          class="trace__row"
          :style="{ '--offset': row.box.offset, '--size': row.box.size, '--lane': row.lane, '--depth': row.depth }"
        >
          <div v-if="row.span.parentId === null" class="span span--root" :class="{ flip: row.flip }">
            <span class="span__label">{{ row.span.label }} <span class="span__range mono">{{ row.range }}</span></span>
            <span class="bar live" :data-stack="row.span.stackColour"></span>
          </div>
          <template v-else>
            <button
              :id="`span-${row.span.id}`"
              type="button"
              class="span"
              :class="{ flip: row.flip }"
              :data-depth="row.depth"
              :aria-expanded="openId === row.span.id"
              :aria-controls="openId === row.span.id ? `detail-${row.span.id}` : undefined"
              @click="toggle(row.span.id)"
            >
              <span class="span__label">{{ row.span.label }} <span class="span__range mono">{{ row.range }}</span></span>
              <span class="bar" :class="{ live: row.span.end === null }" :data-stack="row.span.stackColour"></span>
            </button>
            <Transition name="panel">
              <SpanDetail v-if="openId === row.span.id && !narrow" :span="row.span" :range="row.range" />
            </Transition>
          </template>
        </li>
      </ol>
    </div>
    <Transition name="panel">
      <SpanDetail
        v-if="narrow && openRow"
        ref="narrowPanel"
        :key="openRow.span.id"
        :span="openRow.span"
        :range="openRow.range"
        show-label
      />
    </Transition>
  </section>
</template>
