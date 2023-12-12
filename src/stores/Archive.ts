import {defineStore} from 'pinia';
import Student from '@domains/Student';

interface State {
  students: Student[];
}

export const useArchiveStore = defineStore('archives', {
  state: (): State => ({
    students: [],
  }),
  getters: {
    getStudentById(state) {
      return (id: number) => state.students.find((s) => s.id == id);
    }
  },
  actions: {}
});