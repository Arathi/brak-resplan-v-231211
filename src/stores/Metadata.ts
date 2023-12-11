import {defineStore} from 'pinia';
import Student from '@/domains/metadata/Student';

interface State {
  students: Student[];
}

export const useMetadataStore = defineStore('metadata', {
  state: (): State => ({
    students: [{
      id: 10000,
      name: '爱露',
    },{
      id: 10001,
      name: "艾米",
    },{
      id: 10002,
      name: "晴奈",
    },{
      id: 10003,
      name: "日富美",
    },{
      id: 10004,
      name: "日奈",
    }],
  }),
  getters: {
    getStudentById(state) {
      return (id: number) => state.students.find((s) => s.id == id);
    },
  },
  actions: {},
});