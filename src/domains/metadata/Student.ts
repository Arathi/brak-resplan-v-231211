export type School = string;

/**
 * 部队类型
 */
export enum CombatClass {
  Striker = "Striker",
  Special = "Special",
}

/**
 * 职责
 */
export enum Role {
  Tank = "Tank",
  Dealer = "Dealer",
  Healer = "Healer",
  Support = "Support",
  TacticalSupport = "TacticalSupport",
}

/**
 * 站位
 */
export enum Position {
  Front = "Front",
  Middle = "Middle",
  Back = "Back",
}

/**
 * 攻击类型
 */
export enum AttackType {
  Explosive = "Explosive",
  Piercing = "Piercing",
  Mystic = "Mystic",
  Sonic = "Sonic",
}

/**
 * 护甲类型
 */
export enum ArmorType {
  Light = "Light",
  Heavy = "Heavy",
  Special = "Special",
  Elastic = "Elastic"
}

/**
 * 武器类型
 */
export type WeaponType = string;

/**
 * 装备类型
 */
export type EquipmentType = string;

/**
 * 学生元数据
 */
export default interface Student {
  /**
   * 编号
   */
  id: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 稀有度
   */
  rarity: number;

  /**
   * 学校
   */
  school: School;

  /**
   * 部队类型
   */
  combatClass: CombatClass;

  /**
   * 职责
   */
  role: Role;

  /**
   * 站位
   */
  position: Position;

  /**
   * 攻击类型
   */
  attackType: AttackType;

  /**
   * 护甲类型
   */
  armorType: ArmorType;

  /**
   * 武器类型
   */
  weaponType: WeaponType;

  /**
   * 装备类型
   */
  equipmentTypes: EquipmentType[];
}
