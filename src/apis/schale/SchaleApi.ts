import Axios, {AxiosInstance} from 'axios';
import StudentSchema from './schemas/Student';
import ItemSchema from './schemas/Item';
import StudentMetadata, {ArmorType, AttackType, CombatClass, Position, Role} from '@domains/metadata/Student';
import ItemMetadata from '@domains/metadata/Item';
import {useSettingsStore, Server, Language} from '@stores/Settings';
import {useMetadataStore} from '@stores/Metadata';

export const ServerIndexes = {
  jp: 0,
  global: 1,
  cn: 2,
}

export default class SchaleApi {
  axios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({});
  }

  async reloadDatas() {
    const settings = useSettingsStore();
    const metadataStore = useMetadataStore();
    this.reloadStudents(settings.cdn, settings.server, settings.language, settings.useMin).then((students) => {
      metadataStore.$patch({students});
      console.info("学生信息加载完成：", students);
    });
    this.reloadItems(settings.cdn, settings.server, settings.language, settings.useMin).then((items) => {
      metadataStore.$patch({items});
      console.info("道具信息加载完成：", items);
    });
  }

  // region Students
  async reloadStudents(cdn: string, server: Server, lang: Language, useMin: boolean = false): Promise<StudentMetadata[]> {
    const results: StudentMetadata[] = [];
    const dotMin = useMin ? ".min" : "";
    const url = `${cdn}/data/${lang}/students${dotMin}.json`;
    const resp = await this.axios.get<StudentSchema[]>(url);
    if (resp.status !== 200) {
      console.error(`获取学生数据（${url}）发生错误，状态码：${resp.status} (${resp.statusText})`);
      return results;
    }

    const students: StudentSchema[] = resp.data;
    console.debug(`获取学生数据${students.length}条：`, students);

    const serverIndex = ServerIndexes[server];
    for (const schema of students) {
      const id = schema.Id;
      try {
        const released: boolean = schema.IsReleased[serverIndex];
        if (!released) {
          console.warn(`学生${id}尚未实装`);
          continue;
        }

        const combatClass = this.toCombatClass(schema.SquadType);
        const role = this.toRole(schema.TacticRole);
        const position = this.toPosition(schema.Position);
        const attackType = this.toAttackType(schema.BulletType);
        const armorType = this.toArmorType(schema.ArmorType);

        const metadata = {
          id,
          name: schema.Name,
          rarity: schema.StarGrade,
          school: schema.School,
          combatClass,
          role,
          position,
          attackType,
          armorType,
          weaponType: schema.WeaponType,
          equipmentTypes: schema.Equipment,
        } as StudentMetadata;

        results.push(metadata);
      }
      catch (ex) {
        console.warn(`学生数据${id}转换出错：`, ex);
      }
    }

    return results;
  }

  toCombatClass(value: string): CombatClass {
    switch (value) {
      case "Main": return CombatClass.Striker;
      case "Support": return CombatClass.Special;
    }
    throw new Error(`${value}无法转换为CombatClass`);
  }

  toRole(value: string): Role {
    switch (value) {
      case "Tanker": return Role.Tank;
      case "DamageDealer": return Role.Dealer;
      case "Healer": return Role.Healer;
      case "Supporter": return Role.Support;
      case "Vehicle": return Role.TacticalSupport;
    }
    throw new Error(`${value}无法转换为Role`);
  }

  toPosition(value: string): Position {
    switch (value) {
      case "Front": return Position.Front;
      case "Middle": return Position.Middle;
      case "Back": return Position.Back;
    }
    throw new Error(`${value}无法转换为Position`);
  }

  toAttackType(value: string): AttackType {
    switch (value) {
      case "Explosion": return AttackType.Explosive;
      case "Pierce": return AttackType.Piercing;
      case "Mystic": return AttackType.Mystic;
      case "Sonic": return AttackType.Sonic;
    }
    throw new Error(`${value}无法转换为AttackType`);
  }

  toArmorType(value: string): ArmorType {
    switch (value) {
      case "LightArmor": return ArmorType.Light;
      case "HeavyArmor": return ArmorType.Heavy;
      case "Unarmed": return ArmorType.Special;
      case "ElasticArmor": return ArmorType.Elastic;
    }
    throw new Error(`${value}无法转换为ArmorType`);
  }
  // endregion

  // region Items
  async reloadItems(cdn: string, server: Server, lang: Language, useMin: boolean = false): Promise<ItemMetadata[]> {
    const results: ItemMetadata[] = [];
    const dotMin = useMin ? ".min" : "";
    const url = `${cdn}/data/${lang}/items${dotMin}.json`;
    const resp = await this.axios.get<ItemSchema[]>(url);
    if (resp.status !== 200) {
      console.error(`获取物品数据（${url}）发生错误，状态码：${resp.status} (${resp.statusText})`);
      return results;
    }

    const serverIndex = ServerIndexes[server];
    for (const schema of resp.data) {
      const id = schema.Id;
      const released = schema.IsReleased[serverIndex];
      if (!released) {
        console.debug(`物品${id}尚未实装`);
        continue;
      }

      const metadata = {
        id: id,
        category: schema.Category,
        rarity: schema.Rarity,
        quality: schema.Quality,
        icon: schema.Icon,
        name: schema.Name,
        description: schema.Desc,
      } as ItemMetadata;

      results.push(metadata);
    }

    return results;
  }
  // endregion
}