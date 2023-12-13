<script setup lang="ts">
import {computed} from 'vue';

interface Props {
  value: string|number;
  status: boolean;
  text?: string;
  icon?: string;
  color?: string;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
});

const emit = defineEmits<{
  (e: 'toggle', value: string|number): void
}>();

const widthPx = computed(() => {
  if (props.width != undefined) return `${props.width}px`;
  return undefined;
});

const heightPx = computed(() => {
  if (props.height != undefined) return `${props.height}px`;
  return undefined;
});

const brightness = computed(() => {
  if (props.status) return 1;
  return 0.25;
});

function toggle() {
  console.info(`切换${props.value}`);
  emit('toggle', props.value);
}
</script>

<template>
  <div class="filter-button" @click="toggle">
    <img v-if="icon != undefined"
         :src="icon"
         :width="widthPx"
         :height="heightPx"
         :alt="text"
    />
    <span v-if="icon == undefined && text != undefined">
      {{ text }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.filter-button {
  background-color: v-bind(color);
  filter: brightness(v-bind(brightness));
}
</style>