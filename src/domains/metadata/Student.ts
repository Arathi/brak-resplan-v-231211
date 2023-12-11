export type School = string;

export enum CombatClass {
  Striker = "striker",
  Special = "special",
}

export enum Role {
  Tank = "tank",
  Attacker = "attacker",
  Healer = "healer",
  Support = "support",
  TacticalSupport = "tactical_support",
}

// export enum Position {
//   Front = "Front",
//   Middle = "Middle",
//   Back = "Back",
// }
export type Position = "Front" | "Middle" | "Back" | string;

export enum AttackType {
  Explosive = "explosive",
  Penetration = "penetration",
  Mystic = "mystic",
  Sonic = "sonic",
}

export enum ArmorType {
  Light = "light",
  Heavy = "heavy",
  Special = "special",
  Elastic = "elastic"
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
