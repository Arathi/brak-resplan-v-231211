import Axios, {AxiosInstance} from 'axios';
import {useSettingsStore} from '@stores/Settings';
import Student from './schemas/Student';
import StudentMetadata, {ArmorType, AttackType, CombatClass, Position, Role} from '@domains/metadata/Student';
import {useMetadataStore} from '@stores/Metadata';

enum Server {
  Japan = "jp",
  Global = "global",
  China = "cn",
}

const ServerIndexJapan = 0;
const ServerIndexGlobal = 1;
const ServerIndexChina = 2;

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

    let serverIndex = ServerIndexJapan;
    switch (server) {
      case Server.Japan:
        serverIndex = ServerIndexJapan;
        break;
      case Server.Global:
        serverIndex = ServerIndexGlobal;
        break;
      case Server.China:
        serverIndex = ServerIndexChina;
        break;
    }

    for (const student of students) {
      const id = student.Id;
      try {
        const released: boolean = student.IsReleased[serverIndex];
        if (!released) {
          console.warn(`学生${id}尚未实装`);
          continue;
        }

        const combatClass = this.toCombatClass(student.SquadType);
        const role = this.toRole(student.TacticRole);
        const position = this.toPosition(student.Position);
        const attackType = this.toAttackType(student.BulletType);
        const armorType = this.toArmorType(student.ArmorType);

        const metadata = {
          id,
          name: student.Name,
          rarity: student.StarGrade,
          school: student.School,
          combatClass,
          role,
          position,
          attackType,
          armorType,
          weaponType: student.WeaponType,
          equipmentTypes: student.Equipment,
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
}