import {defineStore} from 'pinia';
import Student from '@domains/Student';
import ItemAmount from '@domains/ItemAmount.ts';

interface State {
  students: Student[];
  items: ItemAmount[];
}

export const useArchiveStore = defineStore('archives', {
  state: (): State => ({
    students: [],
    items: [
      {itemId: 4020, amount: 4096},
      {itemId: 4021, amount: 128},
      {itemId: 4022, amount: 32},
      {itemId: 4023, amount: 4},
    ],
  }),
  getters: {
    getStudentById(state) {
      return (id: number) => state.students.find((s) => s.id == id);
    }
  },
  actions: {}
});