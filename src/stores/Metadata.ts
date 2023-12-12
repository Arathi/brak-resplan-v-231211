import {defineStore} from 'pinia';
import Student from '@domains/metadata/Student';

interface State {
  students: Student[];
}

export const useMetadataStore = defineStore('metadata', {
  state: (): State => ({
    students: [],
  }),
  getters: {
    getStudentById(state) {
      return (id: number) => state.students.find((s) => s.id == id);
    },
  },
  actions: {},
});