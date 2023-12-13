<script setup lang="ts">
import {computed, onBeforeMount, provide, watch} from 'vue';
import {RouterView} from 'vue-router';
import {useWindowSize} from '@vueuse/core';
import {useSettingsStore} from '@stores/Settings';
import SchaleApi from '@/apis/schale/SchaleApi';
import Navigator from '@components/Navigator.vue';

const bgImageSize = {width: 1024, height: 768};
const bgImageRadio = bgImageSize.width / bgImageSize.height;

const settings = useSettingsStore();

const backgroundURL = computed<string|undefined>(() => {
  if (settings.background != undefined) {
    return `${settings.cdn}/images/background/${settings.background}`;
  }
  return undefined;
});

const size = useWindowSize();
const {width, height} = size;
const radio = computed(() => width.value / height.value);

const schaleApi = new SchaleApi();
provide("schaleApi", schaleApi);

const navigatorWidth = computed(() => {
  if (width.value >= 1900) return 960;
  if (width.value >= 1200 && width.value < 1900) return 720;
  if (width.value >= 960 && width.value < 1200) return 640;
  return 0;
});

watch(backgroundURL, () => {
  document.body.style.backgroundImage = `url("${backgroundURL.value}")`;
});

watch(radio, () => {
  if (bgImageRadio > radio.value) {
    console.info(`屏幕过窄：${radio.value}`);
    const scale = width.value / bgImageSize.width;
    const scaledHeight = bgImageSize.height * scale;
    const offset = height.value - scaledHeight;
    document.body.style.backgroundPositionY = `${offset}px`;
  }
  else {
    console.info(`屏幕过宽：${radio.value}`);
    const scale = height.value / bgImageSize.height;
    const scaledHeight = bgImageSize.height * scale;
    const offset = height.value - scaledHeight;
    document.body.style.backgroundPositionY = `${offset}px`;
  }
});

onBeforeMount(() => {
  console.info("开始加载数据");
  schaleApi.reloadDatas();
});
</script>

<template>
  <div class="app">
    <div class="navigate-bar" v-show="navigatorWidth > 0">
      <navigator :width="navigatorWidth" />
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">
$navigateBarHeight: 60px;
$screenHeight: v-bind("`${height}px`");

.app {
  display: flex;
  flex-direction: column;

  .navigate-bar {
    width: 100vw;
    height: 60px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: rgba(50, 84, 106, 0.8);
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
}
</style>
