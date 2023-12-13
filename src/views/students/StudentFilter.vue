<script setup lang="ts">
import {ArmorType, AttackType, School} from '@domains/metadata/Student';
import FilterButton from './FilterButton.vue';
import {useStudentFilterStore} from '@stores/StudentFilter';
import {useSettingsStore} from '@stores/Settings.ts';

const settings = useSettingsStore();
const store = useStudentFilterStore();

const Red = '#930008';
const Yellow = '#BF8901';
const Blue = '#226F9C';
const Purple = '#794394';

const attackTypes = [
  {text: '爆发', key: AttackType.Explosive, color: Red},
  {text: '贯穿', key: AttackType.Piercing, color: Yellow},
  {text: '神秘', key: AttackType.Mystic, color: Blue},
  {text: '音波', key: AttackType.Sonic, color: Purple},
];

const armorTypes = [
  {text: '轻型', key: ArmorType.Light, color: Red},
  {text: '重型', key: ArmorType.Heavy, color: Yellow},
  {text: '特殊', key: ArmorType.Special, color: Blue},
  {text: '弹力', key: ArmorType.Elastic, color: Purple},
];

const schools = [
  {text: '阿拜多斯', key: 'Abydos', icon: 'School_Icon_ABYDOS_W.png'},
  {text: '阿里乌斯', key: 'Arius', icon: 'School_Icon_ARIUS_W.png'},
  // {text: '其他', key: 'ETC', icon: 'School_Icon_ETC_W.png'},
  {text: '歌赫娜', key: 'Gehenna', icon: 'School_Icon_GEHENNA_W.png'},
  {text: '百鬼夜行', key: 'Hyakkiyako', icon: 'School_Icon_HYAKKIYAKO_W.png'},
  {text: '千禧年', key: 'Millennium', icon: 'School_Icon_MILLENNIUM_W.png'},
  {text: '红冬', key: 'RedWinter', icon: 'School_Icon_REDWINTER_W.png'},
  {text: '山海经', key: 'Shanhaijing', icon: 'School_Icon_SHANHAIJING_W.png'},
  {text: 'SRT', key: 'SRT', icon: 'School_Icon_SRT_W.png'},
  // {text: '常盘台', key: 'Tokiwadai', icon: 'School_Icon_TOKIWADAI_W.png'},
  {text: '崔尼蒂', key: 'Trinity', icon: 'School_Icon_TRINITY_W.png'},
  {text: '瓦尔基丽', key: 'Valkyrie', icon: 'School_Icon_VALKYRIE_W.png'},
];

function onToggleAttackType(key: string) {
  const type: AttackType = key as AttackType;
  store.toggleAttackType(type);
}

function onToggleArmorType(key: string) {
  const type: ArmorType = key as ArmorType;
  store.toggleArmorType(type);
}

function onToggleSchool(key: string) {
  // const school = key;
  store.toggleSchool(key as School);
}
</script>

<template>
  <div class="student-filter-simple">
    <div class="group attack-types">
      <filter-button
              class="attack-type"
              v-for="t in attackTypes"
              :key="t.key"
              :value="t.key"
              :status="store.hasAttackType(t.key)"
              :text="t.text"
              :color="t.color"
              @toggle="onToggleAttackType"
      />
    </div>
    <div class="group armor-types">
      <filter-button
              class="armor-type"
              v-for="t in armorTypes"
              :key="t.key"
              :value="t.key"
              :status="store.hasArmorType(t.key)"
              :text="t.text"
              :color="t.color"
              @toggle="onToggleArmorType"
      />
    </div>
    <div class="group schools">
      <filter-button
              class="school"
              v-for="s in schools"
              :key="s.key"
              :value="s.key"
              :status="store.hasSchool(s.key)"
              :text="s.text"
              :icon="`${settings.cdn}/images/schoolicon/${s.icon}`"
              :width="32"
              :height="32"
              @toggle="onToggleSchool"
      />
    </div>
    <div class="group schools">

    </div>
  </div>
  <div class="student-filter-complex">

  </div>
</template>

<style scoped lang="scss">
.student-filter-simple {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;

    .attack-type {
      padding: 6px;
      margin: 2px;
    }

    .armor-type {
      padding: 6px;
      margin: 2px;
    }
  }
}

.student-filter-complex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>