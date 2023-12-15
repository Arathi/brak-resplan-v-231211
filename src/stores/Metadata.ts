import {defineStore} from 'pinia';
import Student from '@domains/metadata/Student';
import Item from '@domains/metadata/Item';

interface State {
  students: Student[];
  items: Item[];
}

export const useMetadataStore = defineStore('metadata', {
  state: (): State => ({
    students: [],
    items: [],
  }),
  getters: {
    getStudentById(state) {
      return (id: number) => state.students.find((s) => s.id == id);
    },
    getItemById(state) {
      return (id: number) => state.items.find((it) => it.id == id);
    },
  },
  actions: {},
});