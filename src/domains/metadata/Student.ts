export type School = string;

export enum CombatClass {
  Striker = "Striker",
  Special = "Special",
}

export enum Role {
  Tank = "Tank",
  Dealer = "Dealer",
  Healer = "Healer",
  Support = "Support",
  TacticalSupport = "TacticalSupport",
}

export enum Position {
  Front = "Front",
  Middle = "Middle",
  Back = "Back",
}

export enum AttackType {
  Explosive = "Explosive",
  Piercing = "Piercing",
  Mystic = "Mystic",
  Sonic = "Sonic",
}

export enum ArmorType {
  Light = "Light",
  Heavy = "Heavy",
  Special = "Special",
  Elastic = "Elastic"
}

export type WeaponType = string;

export type EquipmentType = string;

export default interface Student {
  id: number;
  name: string;
  rarity: number;
  school: School;
  combatClass: CombatClass;
  role: Role;
  position: Position;
  attackType: AttackType;
  armorType: ArmorType;
  weaponType: WeaponType;
  equipmentTypes: EquipmentType[];
}
