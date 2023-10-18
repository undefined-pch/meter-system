import { defineStore } from "pinia";

// 存小区楼栋信息
export const useStore = defineStore("build", {
  state: () => {
    return { count: null };
  },
  actions: {
    change(count: any) {
      this.count = count;
    }
  }
});
// 存小区信息
export const useArea = defineStore("area", {
  state: () => {
    return { area: null };
  },
  actions: {
    savearea(count: any) {
      this.area = count;
    }
  }
});
