<script setup lang="ts">
import {onMounted} from 'vue';
import {useSettingsStore} from '@stores/Settings';

const settings = useSettingsStore();

onMounted(() => {
  settings.background = "BG_MainOffice_Night.jpg";
});
</script>

<template>
  <div class="home">
    <div class="module students">
      <span>学生</span>
    </div>
    <div class="module items">
      <span>物品</span>
    </div>
    <div class="module levels">
      <span>关卡</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .module {
    margin-top: 16px;
    background-color: rgba(50, 84, 106, 0.8);
    width: 960px;
    padding: 8px;

    color: white;
  }
}
</style>