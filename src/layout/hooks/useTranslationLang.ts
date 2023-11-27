import { useNav } from "./useNav";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { watch, onBeforeMount, type Ref } from "vue";
import { initRouter } from "@/router/utils";

export function useTranslationLang(ref?: Ref) {
  const { $storage, changeTitle, handleResize } = useNav();
  const { locale, t } = useI18n();
  const route = useRoute();

  function translationCh() {
    $storage.locale = { locale: "zh" };
    locale.value = "zh";
    ref && handleResize(ref.value);
    // 修改菜单为中文
    // console.log("修改为中文");
    initRouter();
  }

  function translationEn() {
    $storage.locale = { locale: "en" };
    locale.value = "en";
    ref && handleResize(ref.value);
    // 修改菜单为英文
    // console.log("修改为英文");
    initRouter();
  }

  watch(
    () => locale.value,
    () => {
      changeTitle(route.meta);
    }
  );

  onBeforeMount(() => {
    locale.value = $storage.locale?.locale ?? "zh";
  });

  return {
    t,
    route,
    locale,
    translationCh,
    translationEn
  };
}
