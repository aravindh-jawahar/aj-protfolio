<script setup lang="ts">
import type { Span } from '../data/types';

defineProps<{ span: Span; range: string }>();
</script>

<template>
  <div :id="`detail-${span.id}`" class="span-detail" :data-stack="span.stackColour">
    <p class="span-detail__range mono">{{ range }}</p>
    <p v-if="span.summary">{{ span.summary }}</p>
    <p v-if="span.stack" class="span-detail__stack">{{ span.stack.join(', ') }}</p>
    <template v-for="(group, i) in span.details" :key="i">
      <h3 v-if="group.heading">{{ group.heading }}</h3>
      <ul>
        <li v-for="point in group.points" :key="point">{{ point }}</li>
      </ul>
    </template>
  </div>
</template>
