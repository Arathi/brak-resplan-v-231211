<script setup lang="ts">
import ItemIcon from '@components/ItemIcon.vue';
</script>

<template>
  <div class="item-list">
    <item-icon
      :item-id="4020"
      :amount="2048"
    />
    <item-icon
      :item-id="4021"
      :amount="256"
    />
    <item-icon
      :item-id="4022"
      :amount="64"
    />
    <item-icon
      :item-id="4023"
      :amount="8"
    />
  </div>
</template>

<style scoped lang="scss">
.item-list {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
}
</style>