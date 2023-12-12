<script setup lang="ts">
import {computed} from 'vue';
import {useArchiveStore} from '@stores/Archive';
import {useMetadataStore} from '@stores/Metadata';
import Student from '@/domains/Student';
import Metadata from '@/domains/metadata/Student';
import StudentAvatar from '@/views/students/StudentAvatar.vue';
import StudentBorder from '@/views/students/StudentBorder.vue';

const archiveStore = useArchiveStore();
const metadataStore = useMetadataStore();

const props = defineProps<{
  id: number;
}>();

const student = computed<Student|undefined>(() => {
  return archiveStore.getStudentById(props.id);
});
const owned = computed(() => student.value != undefined);

const metadata = computed<Metadata|undefined>(() => {
  return metadataStore.getStudentById(props.id);
});

const avatarClip = '"M5,0 L115,0 A5 5 90 0 1 120 5 L120,115 L115,120 L5,120 A5 5 90 0 1 0 115 L0,5 L5,0"';

const name = computed(() => {
  return metadata.value?.name ?? "";
});
</script>

<template>
  <div class="student-icon">
    <div class="upper">
      <div class="border">
        <student-border :gap="16" :background-color="`${owned?'white':'gray'}`" />
      </div>
      <div class="avatar">
        <student-avatar :metadata="metadata" :student="student" />
      </div>
    </div>
    <div class="lower">
      <span class="name">{{name}}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
$avatarWidth: 120px;
$avatarHeight: 120px;
$avatarMargin: 6px;
$nameHeight: 28px;

$width: $avatarWidth + 2 * $avatarMargin;
$height: $width + $nameHeight;

$clipPath: path(v-bind(avatarClip));

.student-icon {
  display: flex;
  flex-direction: column;

  width: $width;
  height: 160px;

  margin: 0 4px;

  .upper {
    position: relative;

    width: $width;
    height: $width;

    .border {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    .avatar {
      position: absolute;
      left: 6px;
      top: 6px;

      width: $avatarWidth;
      height: $avatarHeight;
      clip-path: $clipPath;

      z-index: 2;
    }
  }

  .lower {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .name {
      color: #60676F;
      font-weight: bold;
    }
  }
}
</style>