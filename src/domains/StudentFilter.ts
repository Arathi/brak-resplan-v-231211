import {
  ArmorType,
  AttackType,
  CombatClass,
  Position,
  Role,
  School
} from '@domains/metadata/Student';

export default interface StudentFilter {
  rarities: number[];
  schools: School[];
  combatClasses: CombatClass[];
  roles: Role[];
  positions: Position[];
  attackTypes: AttackType[];
  armorTypes: ArmorType[];
}