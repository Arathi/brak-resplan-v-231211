import Axios, {AxiosInstance} from 'axios';
import {useSettingsStore} from '@stores/Settings';
import Student from './schemas/Student';
import StudentMetadata, {
  CombatClass,
  Role,
  Position,
  AttackType,
  ArmorType,
  WeaponType,
  EquipmentType,
} from '@/domains/metadata/Student';
import {Exception} from 'sass';
import {useMetadataStore} from '@stores/Metadata.ts';

enum Server {
  Japan = "jp",
  Global = "global",
  China = "cn",
}

enum Language {
  Japanese = "jp",
  English = "en",
  ChineseTraditional = "tw",
  ChineseSimplifiedUnofficial = "zh",
  ChineseSimplified = "cn",
}

export default class SchaleApi {
  axios: AxiosInstance;

  constructor() {
    // const settings = useSettingsStore();
    this.axios = Axios.create({});
  }

  async reloadDatas(server: Server = Server.Japan, lang: Language = Language.ChineseSimplified) {
    const settings = useSettingsStore();
    const metadataStore = useMetadataStore();
    this.reloadStudents(settings.cdn, server, lang, false).then((students) => {
      metadataStore.students = students;
      console.info("学生信息更新完成：", students);
    });
  }

  async reloadStudents(cdn: string, server: Server, lang: Language, useMin: boolean = false): Promise<StudentMetadata[]> {
    const results: StudentMetadata[] = [];
    const dotMin = useMin ? ".min" : "";
    const url = `${cdn}/data/${lang}/students${dotMin}.json`;
    const resp = await this.axios.get<Student[]>(url);
    if (resp.status !== 200) {
      console.error(`获取学生数据（${url}）发生错误，状态码：${resp.status} (${resp.statusText})`);
      return results;
    }

    const students: Student[] = resp.data;
    console.debug(`获取学生数据${students.length}条：`, students);

    for (const student of students) {
      try {
        const combatClass = this.toCombatClass(student.SquadType);
        const role = this.toRole(student.TacticRole);
        const attackType = this.toAttackType(student.BulletType);
        const armorType = this.toArmorType(student.ArmorType);

        const metadata = {
          id: student.Id,
          name: student.Name,
          rarity: student.StarGrade,
          school: student.School,
          combatClass,
          role,
          position: student.Position as Position,
          attackType,
          armorType,
          weaponType: student.WeaponType,
          equipmentTypes: student.Equipment,
        } as StudentMetadata;

        results.push(metadata);
      }
      catch (ex) {
        console.warn("数据转换出错：", ex);
      }
    }

    return results;
  }

  toCombatClass(value: string): CombatClass {
    switch (value) {
      case "Main": return CombatClass.Striker;
      case "Support": return CombatClass.Special;
    }
    throw new Exception(`${value}无法转换为CombatClass`);
  }

  toRole(value: string): Role {
    switch (value) {
      case "Tanker": return Role.Tank;
      case "DamageDealer": return Role.Attacker;
      case "Healer": return Role.Healer;
      case "Supporter": return Role.Support;
      case "Vehicle": return Role.TacticalSupport;
    }
    throw new Exception(`${value}无法转换为Role`);
  }

  toAttackType(value: string): AttackType {
    switch (value) {
      case "Explosion": return AttackType.Explosive;
      case "Pierce": return AttackType.Penetration;
      case "Mystic": return AttackType.Mystic;
      case "Sonic": return AttackType.Sonic;
    }
    throw new Exception(`${value}无法转换为AttackType`);
  }

  toArmorType(value: string): ArmorType {
    switch (value) {
      case "LightArmor": return ArmorType.Light;
      case "HeavyArmor": return ArmorType.Heavy;
      case "Unarmed": return ArmorType.Special;
      case "ElasticArmor": return ArmorType.Elastic;
    }
    throw new Exception(`${value}无法转换为ArmorType`);
  }
}