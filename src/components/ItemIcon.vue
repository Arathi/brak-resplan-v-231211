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
const metadata = computed(() => metadataStore.getItemById(props.itemId));

const itemIconSize = {
  width: 146,
  height: 116,
};

const iconURL = computed(() => {
  if (metadata.value == undefined) return undefined;
  const fileName = metadata.value.icon;
  return `${cdn.value}/images/items/icon/${fileName}.webp`;
});

const width = computed(() => itemIconSize.width * props.scale);
const height = computed(() => itemIconSize.height * props.scale);

const xAmount = computed<string|undefined>(() => {
  if (props.amount == undefined) return undefined;
  if (props.amount <= 0) return undefined;
  return `x${props.amount}`;
});

const rareColor = computed(() => {
  if (metadata.value == undefined) return undefined;
  let color: string | undefined = undefined;
  switch (metadata.value.rarity) {
    case 'N':
      color = "#DBE5EE";
      break;
    case 'R':
      color = "#B8DAFD";
      break;
    case 'SR':
      color = "#F7D17E";
      break;
    case 'SSR':
      color = "#DF99FC";
      break;
  }
  return color;
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
  position: relative;
  width: $width;
  height: $height;
  margin: 4px;

  .background {
    position: absolute;
    width: $width;
    height: $height;
    background-color: v-bind(rareColor);
    transform: skew(-10deg);
    border: 1px solid white;
    border-radius: 10px;
  }

  .icon {
    position: absolute;
  }
  .amount {
    position: absolute;
    right: 15px;
    bottom: 5px;
  }
}
</style>