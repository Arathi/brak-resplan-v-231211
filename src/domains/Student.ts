/**
 * 学生数据
 */
export default interface Student {
  /**
   * 编号
   */
  id: number;

  /**
   * 星级
   */
  rank: number;

  /**
   * 等级
   */
  level: number;

  /**
   * 关系
   */
  relation: number;

  /**
   * 装备
   */
  equipmentTiers: number[];

  /**
   * Ex技能等级
   */
  skillLevelEx: number;

  /**
   * 普通技能等级
   */
  skillLevelNormal: number;

  /**
   * 被动技能等级
   */
  skillLevelPassive: number;

  /**
   * 辅助技能等级
   */
  skillLevelSub: number;
}
