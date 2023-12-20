<script setup lang="ts">
import {onMounted} from 'vue';
import {useSettingsStore} from '@stores/Settings';
import StudentList from '@/views/students/StudentList.vue';
import StudentFilter from '@views/students/StudentFilter.vue';

const settings = useSettingsStore();

onMounted(() => {
  settings.background = "BG_View_Kivotos.jpg";
});
</script>

<template>
  <div class="test">
    <student-filter />
    <student-list :width="860" :height="800" />
  </div>
</template>

<style scoped lang="scss">
.test {
  display: flex;
  flex-direction: column;
}
</style>