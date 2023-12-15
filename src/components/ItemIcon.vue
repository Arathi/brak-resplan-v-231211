<script setup lang="ts">
import {computed} from 'vue';
import {storeToRefs} from 'pinia';
import {useSettingsStore} from '@stores/Settings';
import {useMetadataStore} from '@stores/Metadata';

interface Props {
  itemId: number;
  amount?: number;
  scale?: number;
}

const props = withDefaults(defineProps<Props>(), {
  amount: 0,
  scale: 1,
});

const settings = useSettingsStore();
const {cdn} = storeToRefs(settings);

const metadataStore = useMetadataStore();

const itemIconSize = {
  width: 146,
  height: 116,
};

const iconURL = computed(() => {
  const metadata = metadataStore.getItemById(props.itemId);
  if (metadata == undefined) return undefined;
  const fileName = metadata.icon;
  return `${cdn.value}/images/items/icon/${fileName}.webp`;
});

const width = computed(() => itemIconSize.width * props.scale);
const height = computed(() => itemIconSize.height * props.scale);

const xAmount = computed<string|undefined>(() => {
  if (props.amount == undefined) return undefined;
  if (props.amount <= 0) return undefined;
  return `x${props.amount}`;
});
</script>

<template>
  <div class="item-icon">
    <div class="background">
    </div>
    <div class="icon">
      <img
        :src="iconURL"
        :width="width"
        :height="height"
      />
    </div>
    <div class="amount">
      <span>{{xAmount}}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
$width: v-bind("`${width}px`");
$height: v-bind("`${height}px`");

.item-icon {
  .background {}
  .icon {}
  .amount {}
}
</style>