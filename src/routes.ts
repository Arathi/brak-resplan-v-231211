import {RouteRecordRaw} from 'vue-router';
import Home from '@/views/home/Home.vue';
import Test from '@/views/test/Test.vue';

export default [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "test",
    path: "/test",
    component: Test,
  }
] as RouteRecordRaw[];