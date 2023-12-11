<script setup lang="ts">
import {onMounted} from 'vue';
import {useSettingsStore} from '@stores/Settings';
import StudentList from '@/views/students/StudentList.vue';

const settings = useSettingsStore();

onMounted(() => {
  settings.background = "BG_View_Kivotos.jpg";
});
</script>

<template>
  <div class="test">
    <student-list :width="960" :height="800" />
  </div>
</template>

<style scoped lang="scss">
.test {

}
</style>