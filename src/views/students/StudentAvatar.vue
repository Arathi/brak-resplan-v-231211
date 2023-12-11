<script setup lang="ts">
import {computed} from 'vue';
import Student from '@/domains/Student';
import Metadata from '@/domains/metadata/Student';
import {useSettingsStore} from '@stores/Settings';

const props = defineProps<{
  metadata: Metadata;
  student?: Student;
}>();

const settings = useSettingsStore();

const id = computed<number>(() => props.metadata.id);
const owned = computed(() => props.student != undefined);

const iconURL = computed<string>(() =>
  `${settings.cdn}/images/student/icon/${id.value}.webp`
);

const name = computed<string>(() => props.metadata.name ?? "");
</script>

<template>
  <div class="student-avatar">
    <div :class="`icon ${owned?'owned':'not-owned'}`">
      <img
        :src="iconURL"
        :width="120"
        :height="120"
        :alt="name"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.student-avatar {
  position: relative;
  width: 120px;
  height: 120px;

  .not-owned {
    filter: brightness(0.25);
  }
}
</style>