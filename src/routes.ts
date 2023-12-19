import {RouteRecordRaw} from 'vue-router';
import Home from '@/views/home/Home.vue';
import Test from '@/views/test/Test.vue';
import Items from '@/views/items/ItemList.vue';

export default [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "items",
    path: '/items',
    component: Items,
  },
  {
    name: "test",
    path: "/test",
    component: Test,
  }
] as RouteRecordRaw[];