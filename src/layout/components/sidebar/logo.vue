<script setup lang="ts">
import { getTopMenu } from "@/router/utils";
import { useNav } from "@/layout/hooks/useNav";
import { useI18n } from "vue-i18n";
// pinia记录当前是水表/热表
import { useStore } from "@/store/logo/state";
import { storeToRefs } from "pinia";
const { t } = useI18n();

const props = defineProps({
  collapse: Boolean
});

const { title } = useNav();
// pinia保存当前状态值
const name = useStore();
const { showname } = storeToRefs(name); //解构出来的值变为ref对象
console.log(showname, "logo的值");
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapses: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="props.collapse"
        :title="title"
        class="sidebar-logo-link"
        :to="getTopMenu()?.path ?? '/'"
      >
        <img src="/logo.svg" alt="logo" v-if="showname == 'water'" />
        <img
          src="../../../assets/fire.png"
          alt="logo"
          v-else-if="showname == 'fire'"
        />
        <span class="sidebar-title">{{ t("maintitle.title") }}</span>
      </router-link>
      <router-link
        v-else
        key="expand"
        :title="title"
        class="sidebar-logo-link"
        :to="getTopMenu()?.path ?? '/'"
      >
        <img src="/logo.svg" alt="logo" v-if="showname == 'water'" />
        <img
          src="../../../assets/fire.png"
          alt="logo"
          v-else-if="showname == 'fire'"
        />
        <span class="sidebar-title">{{ t("maintitle.title") }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;

  .sidebar-logo-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100%;

    img {
      display: inline-block;
      height: 32px;
    }

    .sidebar-title {
      display: inline-block;
      height: 32px;
      margin: 2px 0 0 12px;
      overflow: hidden;
      font-size: 18px;
      font-weight: 600;
      line-height: 32px;
      color: $subMenuActiveText;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
