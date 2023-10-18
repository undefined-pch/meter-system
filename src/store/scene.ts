import { defineStore } from "pinia";

interface ScreenState {
  title: string;
  theme: "dark" | "light";
}

export const useScreenStore = defineStore({
  id: "screen",
  state: (): ScreenState => {
    return {
      title: "分区可视化",
      theme: "dark"
    };
  },
  actions: {
    changetitle(title) {
      this.title = title;
    }
  }
});
