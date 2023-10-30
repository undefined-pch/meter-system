<template>
  <div class="es-screen-header">
    <h1 class="es-screen-logo">
      <span>{{ t("abc") }}</span>
      <span>&nbsp;&nbsp;当前水司</span>
      <vxe-select
        v-model="companyKey"
        placeholder="请输入要查找的水司"
        :options="companyKeyList"
        filterable
        @focus="searchCompanyList"
        @change="geteffortlist()"
        @clear="clearCompanyKey()"
      />
    </h1>
    <div class="es-screen-header-title">{{ store.title }}</div>
    <div class="es-screen-header-right">
      <img class="theme-change" :src="icon" @click="handleChangeTheme" />
      <span class="datetime">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import dayjs from "dayjs";
import { useScreenStore } from "../../../store/scene";
import darkIcon from "@/assets/images/screen/qiehuan_dark.png";
import lightIcon from "@/assets/images/screen/qiehuan_light.png";
import { useI18n } from "vue-i18n";
import { getcompany } from "@/api/effort";

const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      abc: "zhongpei"
    },
    zh: {
      abc: "中沛"
    }
  }
});

const store = useScreenStore();
const icon = computed(() => (store.theme === "dark" ? darkIcon : lightIcon));

const currentTime = ref("");
const timeId = ref();
function handleChangeTheme() {
  store.$patch({
    theme: store.theme === "dark" ? "light" : "dark"
  });
}

function startTime() {
  timeId.value = setTimeout(() => {
    currentTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");
    startTime();
  }, 1000);
}

const companyKey = ref(""); // 所属水司搜索词
const companyKeyList = ref([]); // 所属水司搜索列表
// 查询水司列表信息
const searchCompanyList = () => {
  const data = {
    company: ""
  };
  getcompany(data).then(res => {
    if (res.retcode == 200) {
      // loading.value = false;
      companyKeyList.value = res.data.data.map(item => {
        return { value: item.name, label: item.name };
      });
    }
  });
};
// 清除查询水司关键词
const clearCompanyKey = () => {
  companyKey.value = "";
  regionKey.value = "";
  CommunityKey.value = "";
  geteffortlist();
};

onBeforeUnmount(() => {
  clearTimeout(timeId.value);
});

startTime();
</script>

<style lang="scss" scoped>
.es-screen-header {
  position: relative;
  width: 100%;
  height: var(--es-header-height);
  background-image: url("@/assets/images/screen/header_border_dark.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: fade 3s;

  &-title {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 487px;
    height: var(--es-header-height);
    font-size: 30px;
    font-weight: 500;
    text-shadow: 0 2px 20px rgb(222 171 155 / 60%);
    letter-spacing: 7px;
    transform: translate(-50%, -50%);
  }

  .es-screen-logo {
    display: flex;
    align-items: center;
    height: calc(var(--es-header-height) - 20px);
  }

  &-right {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    align-items: center;
    transform: translateY(-80%);

    img {
      width: 30px;
      margin-right: 16px;
      cursor: pointer;
      transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
