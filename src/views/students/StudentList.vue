<script setup lang="ts">
import {computed} from 'vue';
import Student from '@/domains/Student';
import Metadata from '@/domains/metadata/Student';
import {useArchiveStore} from '@stores/Archive';
import {useMetadataStore} from '@stores/Metadata';
import StudentIcon from './StudentIcon.vue';

interface Props {
  width: number;
  height: number;
}

const props = withDefaults(defineProps<Props>(), {});

const archiveStore = useArchiveStore();
const metadataStore = useMetadataStore();

const widthPx = computed(() => `${props.width}px`);
const heightPx = computed(() => `${props.height}px`);

const owned = computed<number[]>(() => {
  const ids = archiveStore.students.map((s) => s.id);
  return ids;
});

const notOwned = computed<number[]>(() => {
  const ownedSet = new Set();
  owned.value.forEach((id) => ownedSet.add(id));
  return metadataStore.students.filter((s) => !ownedSet.has(s.id)).map((s) => s.id);
});
</script>

<template>
  <div class="student-list">
    <div class="students owned">
      <template v-for="id in owned" :key="id">
        <student-icon :id="id" />
      </template>
    </div>
    <div class="spliter">
      <div class="background"></div>
      <div class="text">未持有</div>
    </div>
    <div class="students not-owned">
      <template v-for="id in notOwned" :key="id">
        <student-icon :id="id" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.student-list {
  width: v-bind(widthPx);
  height: v-bind(heightPx);

  padding: 8px;
  background-color: #F2FAFC;
  overflow: scroll;

  .students {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
  }

  .spliter {
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 32px;

    margin: 8px 0;

    .background {
      position: absolute;
      width: 100%;
      height: 32px;
      background-color: #2C4C72;
      transform: skew(-10deg);
      border-radius: 8px;
      z-index: 0;
    }

    .text {
      position: absolute;
      color: white;
      font-weight: bold;
      z-index: 1;
    }
  }
}
</style>