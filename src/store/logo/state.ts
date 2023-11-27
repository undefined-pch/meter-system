import { defineStore } from "pinia";

// 存右侧树形组件
export const useStore = defineStore("logostate", {
  state: () => {
    return { showname: "water" };
  },
  actions: {
    isfireLogo() {
      this.showname = "fire";
    },
    iswaterLogo() {
      this.showname = "water";
    }
  }
});
