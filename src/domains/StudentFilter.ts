import {
  ArmorType,
  AttackType,
  CombatClass,
  Position,
  Role,
  School
} from '@domains/metadata/Student';

export default interface StudentFilter {
  /**
   * 稀有度
   */
  rarities: number[];

  /**
   * 学院
   */
  schools: School[];

  /**
   * 部队类型
   */
  combatClasses: CombatClass[];

  /**
   * 职责
   */
  roles: Role[];

  /**
   * 站位
   */
  positions: Position[];

  /**
   * 攻击类型
   */
  attackTypes: AttackType[];

  /**
   * 护甲类型
   */
  armorTypes: ArmorType[];
}