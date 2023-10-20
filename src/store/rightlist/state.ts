import { defineStore } from "pinia";

// 存右侧树形组件
export const useStore = defineStore("treestate", {
  state: () => {
    return { isshow: true };
  },
  actions: {
    change() {
      this.isshow = !this.isshow;
    }
  }
});
