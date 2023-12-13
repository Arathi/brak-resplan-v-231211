import {defineStore} from 'pinia';
import StudentFilter from '@domains/StudentFilter';
import {School, CombatClass, Role, Position, AttackType, ArmorType} from '@domains/metadata/Student.ts';

type State = StudentFilter;

export const useStudentFilterStore = defineStore('student-filter', {
  state: (): State => ({
    rarities: [],
    schools: [],
    combatClasses: [],
    roles: [],
    positions: [],
    attackTypes: [],
    armorTypes: [],
  }),
  getters: {
    hasRarity(state) {
      return (value: number) =>
        state.rarities.findIndex((data) => data == value) != -1;
    },
    hasSchool(state) {
      return (value: School) =>
        state.schools.findIndex((data) => data == value) != -1;
    },
    hasCombatClass(state) {
      return (value: CombatClass) =>
        state.combatClasses.findIndex((data) => data == value) != -1;
    },
    hasRole(state) {
      return (value: Role) =>
        state.roles.findIndex((data) => data == value) != -1;
    },
    hasPosition(state) {
      return (value: Position) =>
        state.positions.findIndex((data) => data == value) != -1;
    },
    hasAttackType(state) {
      return (value: AttackType) =>
        state.attackTypes.findIndex((data) => data == value) != -1;
    },
    hasArmorType(state) {
      return (value: ArmorType) =>
        state.armorTypes.findIndex((data) => data == value) != -1;
    },
  },
  actions: {
    toggleRarity(value: number) {
      const data = this.rarities.find((data) => data == value);
      if (data == undefined) this.rarities.push(value);
      else this.rarities = this.rarities.filter(
        (data) => data != value
      );
    },
    toggleSchool(value: School) {
      const data = this.schools.find((data) => data == value);
      if (data == undefined) this.schools.push(value);
      else this.schools = this.schools.filter(
        (data) => data != value
      );
    },
    toggleCombatClass(value: CombatClass) {
      const data = this.combatClasses.find((data) => data == value);
      if (data == undefined) this.combatClasses.push(value);
      else this.combatClasses = this.combatClasses.filter(
        (data) => data != value
      );
    },
    toggleRole(value: Role) {
      const data = this.roles.find((data) => data == value);
      if (data == undefined) this.roles.push(value);
      else this.roles = this.roles.filter(
        (data) => data != value
      );
    },
    togglePosition(value: Position) {
      const data = this.positions.find((data) => data == value);
      if (data == undefined) this.positions.push(value);
      else this.positions = this.positions.filter(
        (data) => data != value
      );
    },
    toggleAttackType(value: AttackType) {
      const data = this.attackTypes.find((data) => data == value);
      if (data == undefined) this.attackTypes.push(value);
      else this.attackTypes = this.attackTypes.filter(
        (data) => data != value
      );
    },
    toggleArmorType(value: ArmorType) {
      const data = this.armorTypes.find((data) => data == value);
      if (data == undefined) this.armorTypes.push(value);
      else this.armorTypes = this.armorTypes.filter(
        (data) => data != value
      );
    },
  },
});