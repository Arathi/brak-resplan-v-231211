import {defineStore} from 'pinia';
import Student from '@/domains/Student';

interface State {
  students: Student[];
}

export const useArchiveStore = defineStore('archives', {
  state: (): State => ({
    students: [
      {id: 10000},
      {id: 10001},
      {id: 10002},
    ],
  }),
  getters: {
    getStudentById(state) {
      return (id: number) => state.students.find((s) => s.id == id);
    }
  },
  actions: {}
});