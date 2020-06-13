import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from 'vue-amap'
import axios from 'axios'
import animated from 'animate.css'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(VueAMap)
Vue.use(Vant)
Vue.use(animated)
Vue.prototype.axios = axios
Vue.prototype.VueAMap = VueAMap
Vue.config.productionTip = false

// VueAMap.initAMapApiLoader({
//   // 高德key
//   key: '2d57dadbf316ebaa5873a3c1b4746f89',
//   // 插件集合 （插件按需引入）
//   plugin: [
//     "VueAMap.Autocomplete", //输入提示插件
//     "VueAMap.PlaceSearch", //POI搜索插件
//     "VueAMap.Scale", //右下角缩略图插件 比例尺
//     "VueAMap.OverView", //地图鹰眼插件
//     "VueAMap.ToolBar", //地图工具条
//     "VueAMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
//     "VueAMap.PolyEditor", //编辑 折线多，边形
//     "VueAMap.CircleEditor", //圆形编辑器插件
//     "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
//   ],
//   uiVersion: "1.0"
// })

VueAMap.initAMapApiLoader({
  // 高德key
  key: '1def3f6e2ece1afa3f0af5f2b6734dee',
  // 插件集合 （插件按需引入）
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.CitySearch",//城市查询，IP定位获取当前城市信息
    'AMap.MapType',// 卫星模式
    'AMap.Walking', // 步行路径规划
    'AMap.Driving', // 驾车路径规划
    'AMap.Transfer', // 公交路径规划
  ],
  uiVersion: "1.0"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
