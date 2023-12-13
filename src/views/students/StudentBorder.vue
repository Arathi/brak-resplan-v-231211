<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  size?: number;
  gap?: number;
  radius?: number;
  backgroundColor?: string;
  borderColor?: string;
}

interface Point {
  x: number;
  y: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 132,
  gap: 10,
  radius: 10,
  backgroundColor: 'white',
  borderColor: '#D6DCDC',
});

const viewBox = computed(() => `0 0 ${props.size} ${props.size}`);
const sizePx = computed(() => `${props.size}px`);

const tlUp = computed<Point>(() => ({x: props.gap, y: 1}));
const arcTRStart = computed<Point>(() => ({x: props.size-props.radius, y:1}));
const arcTREnd = computed<Point>(() => ({x: props.size-1, y: props.radius}));
const brUp = computed<Point>(() => ({x: props.size-1, y: props.size-props.gap}));
const brLo = computed<Point>(() => ({x: props.size-props.gap, y: props.size-1}));
const arcBLStart = computed<Point>(() => ({x: props.radius, y: props.size-1}));
const arcBLEnd = computed<Point>(() => ({x: 1, y: props.size-props.radius}));
const tlLo = computed<Point>(() => ({x: 1, y: props.gap}));

const definition = computed(() => `
  M${tlUp.value.x},${tlUp.value.y}
  L${arcTRStart.value.x},${arcTRStart.value.y}
  A${props.radius} ${props.radius} 90 0 1 ${arcTREnd.value.x} ${arcTREnd.value.y}
  L${brUp.value.x},${brUp.value.y}
  L${brLo.value.x},${brLo.value.y}
  L${arcBLStart.value.x},${arcBLStart.value.y}
  A${props.radius} ${props.radius} 90 0 1 ${arcBLEnd.value.x} ${arcBLEnd.value.y}
  L${tlLo.value.x},${tlLo.value.y}
  L${tlUp.value.x},${tlUp.value.y}
`);
</script>

<template>
  <svg :viewBox="viewBox" :width="sizePx" :height="sizePx">
    <g :fill="backgroundColor" :stroke="borderColor">
      <path :d="definition" />
    </g>
  </svg>
</template>