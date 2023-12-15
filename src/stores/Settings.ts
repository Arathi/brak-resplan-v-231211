import {defineStore} from 'pinia';

export enum Server {
  Japan = "jp",
  Global = "global",
  China = "cn",
}

export enum Language {
  Japanese = "jp",
  English = "en",
  ChineseTraditional = "tw",
  ChineseSimplifiedUnofficial = "zh",
  ChineseSimplified = "cn",
}

interface State {
  cdn: string;
  server: Server;
  language: Language;
  useMin: boolean;
  background: string|undefined;
}

export const useSettingsStore = defineStore("settings", {
  state: (): State => ({
    cdn: "https://schale.gg",
    server: Server.Japan,
    language: Language.ChineseSimplified,
    useMin: false,
    background: undefined,
  }),
});