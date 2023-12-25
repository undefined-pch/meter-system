import { useI18n } from "vue-i18n"; // 表头翻译

export const { t } = useI18n({
  locale: "en",
  messages: {
    en: {
      company: "company",
      firecompany: "company",
      areaname: "areaname",
      communityname: "community",
      address: "adress",
      postcode: "postcode",
      communityarea: "communityarea",
      buildings: "buildings",
      households: "households",
      // Ownedproperty: "Ownedproperty",
      watercompany: "watercompany",
      founder: "founder",
      creationtime: "creationtime",
      lastupdater: "lastupdateer",
      lastupdated: "last updated by",
      operate: "operate",
      search: "search",
      add: "add",
      editsave: "edit&save",
      addsave: "add&save",
      jd: "longitude",
      wd: "latitude",
      pitture: "icon",
      tipbutton: "Upload icon",
      tips: "The size of the jpg/png file is less than 500KB.",
      submit: "submit",
      reset: "reset",
      batchimport: "batchimport",
      download: "Download",
      batchDelete: "BatchDelete"
    },
    zh: {
      company: "所属水司",
      areaname: "区域名称",
      communityname: "小区名称",
      address: "地址",
      postcode: "邮编",
      communityarea: "小区面积",
      buildings: "楼栋数",
      households: "户数",
      // Ownedproperty: "所属物业",
      watercompany: "所属自来水公司",
      founder: "创建人",
      creationtime: "创建时间",
      lastupdater: "最近更新人",
      lastupdated: "最近更新时间",
      operate: "操作",
      search: "搜索",
      add: "新增",
      editsave: "编辑&保存",
      addsave: "新增&保存",
      jd: "经度",
      wd: "纬度",
      pitture: "小区图片",
      tipbutton: "上传小区图片",
      tips: "jpg/png文件,大小小于500KB",
      sumit: "提交",
      reset: "重置",
      batchimport: "批量导入",
      download: "下载模板",
      batchDelete: "批量删除"
    }
  }
});