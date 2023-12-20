<script setup lang="ts">
import ItemDetails from './ItemDetails.vue';
import ItemList from './ItemList.vue';
</script>

<template>
  <div class="items">
    <div class="details">
      <item-details />
    </div>
    <div class="list">
      <item-list />
    </div>
  </div>
</template>

<style scoped lang="scss">
.items {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .details {
    flex: 1;
  }

  .list {
    flex: 1;
  }
}
</style>