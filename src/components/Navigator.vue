<script setup lang="ts">
import {computed} from 'vue';
import {RouterLink, useRoute} from 'vue-router';

interface Props {
  width: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 1366,
});

const route = useRoute();

const widthPx = computed(() => `${props.width}px`);

const links = [
  { name: 'home', to: '/', title: '首页' },
  { name: 'students', to: '/students', title: '学生' },
  { name: 'items', to: '/items', title: '物品' },
  { name: 'levels', to: '/levels', title: '关卡' },
  { name: 'test', to: '/test', title: '测试' },
];
</script>

<template>
  <div class="navigator">
    <router-link
      v-for="link in links"
      class="link"
      :class="{current: link.name == route.name}"
      :to="link.to"
    >
      {{ link.title }}
    </router-link>
  </div>
</template>

<style scoped>
.navigator {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: v-bind(widthPx);

  .link {
    text-decoration: none;
    color: white;
    margin: 8px 4px;
    padding: 10px;
  }

  .current {
    background-color: #263F4F;
  }
}
</style>