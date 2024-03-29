import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import alarmIcon from "@iconify-icons/icon-park-twotone/alarm";
import tagPriceLinear from "@iconify-icons/solar/tag-price-linear";
import baseInformation from "@iconify-icons/maki/village";
import keyicon from "@iconify-icons/ep/key";
import consticon from "@iconify-icons/ep/wallet-filled";

addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("alarmIcon", alarmIcon);
addIcon("tagPriceLinear", tagPriceLinear);
addIcon("baseInformation", baseInformation);
addIcon("keyicon", keyicon);
addIcon("consticon", consticon);
