<template>
  <div class="amap-page-container">
    <div :style="{width:'100%',height:'100%'}">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
        <el-amap-circle vid="circle" :center="center" :radius="radius" fill-opacity="0.2" strokeColor="#38f"
          strokeOpacity="0.8" strokeWeight="1" fillColor="#38f"></el-amap-circle>
      </el-amap>
    </div>

    <div class="toolbar">
      <span v-if="loaded">location: lng = {{ lng }} lat = {{ lat }}</span>
      <span v-else>正在定位</span>
    </div>
    <div v-on:click="req_post()">查询周边</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    const self = this;
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      radius: 30,
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          showTraffic: true, //实时交通图层
          pName: "Geolocation",
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                // console.log(result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  methods: {
    req_post () {
      const that = this;
      const registerUrl = "http://restapi.amap.com/v3/batch?key=2d57dadbf316ebaa5873a3c1b4746f89";
      const newUserInfo = {
        ops: [
          {
            url:
              "/v3/place/around?offset=10&page=1&key=2d57dadbf316ebaa5873a3c1b4746f89&location=" +
              that.lng +
              "," +
              that.lat +
              "&output=json&radius=100000&types=080000"
          }
        ]
      };
      that.axios
        .post(registerUrl, newUserInfo, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(function (response) {
          console.log(response["data"][0]["body"]["pois"]);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="less">
.amap-demo {
  height: 600px;
}
</style>
