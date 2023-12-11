import {defineStore} from 'pinia';

interface State {
  cdn: string;
  background: string|undefined;
}

export const useSettingsStore = defineStore("settings", {
  state: (): State => ({
    cdn: "https://schale.gg",
    background: undefined,
  }),
});