<script setup lang="ts">
import {storeToRefs} from 'pinia';
import ItemIcon from '@components/ItemIcon.vue';
import {useArchiveStore} from '@stores/Archive';

const store = useArchiveStore();
const { items } = storeToRefs(store);
</script>

<template>
  <div class="item-list">
    <item-icon
      v-for="item in items"
      :key="item.itemId"
      :item-id="item.itemId"
      :amount="item.amount"
    />
  </div>
</template>

<style scoped lang="scss">
.item-list {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;

  background-color: #C4CFD3;
  padding: 4px 20px 8px 12px;
  border-radius: 8px;
}
</style>