/**
地图展示
定位功能
搜索周边信息
搜索功能
点击获取详细位置信息及周边信息-->信息窗体显示
卫星地图
路线规划

 */
<template>
  <div id="map" v-if="network">
    <div class="amap-wrapper">
      <!-- 搜索插件 -->
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult">
      </el-amap-search-box>
      <!-- 地图 -->
      <el-amap class="amap-box" :vid="'amap-vue'" :plugin="plugin" :center="mapCenter" zoom="16" :events="events">
        <el-amap-circle vid="circle" :center="mapCenter" :radius="radius" fill-opacity="0.2" strokeColor="#38f"
          strokeOpacity="0.8" strokeWeight="1" fillColor="#38f">
        </el-amap-circle>
        <!-- 地图标志 -->
        <el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker"></el-amap-marker>
        <!-- 信息窗体 -->
        <el-amap-info-window :position="[coordinates.lng, coordinates.lat]" :visible="currentWindow.visible"
          :events="currentWindow.events" showShadow=true size="500">
          <div class='input-card content-window-card'>
            <div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png " /></div>
          </div>
          <div style="padding:7px 0px 0px 0px;">
            <h4>高德软件</h4>
          </div>
          <p>
            <span>邮编:{{currentWindow.addressComponent.adcode}}</span>
          </p>
          <p>地址:{{address}}</p>
          <el-amap-search-box class="search-box route-search" :search-option="searchOption"
            :on-search-result="onSearchroute">
          </el-amap-search-box>
          <button @click="walking">步行</button>
          <button @click="driving">驾车</button>
          <button @click="transfer">公交</button>

        </el-amap-info-window>
        <div id="panel"></div>

      </el-amap>
      <div class="toolbar">
        <span v-if="loaded">
          <p>location: lng = {{ coordinates.lng }} lat = {{ coordinates.lat }}</p>
          <p>详细地址: {{ address }}</p>
        </span>
        <span v-else>正在定位</span>
      </div>
      <button @click="req_post">查询周边</button>
    </div>
  </div>
  <div v-else>暂无网络连接</div>
</template>
<script>
export default {
  data () {
    let self = this;
    return {
      network: true, //默认有网
      mapCenter: [121.59996, 31.197646],//初始位置坐标
      loaded: false, // 定位完成
      address: '',// 详细地址
      //点击后的坐标
      coordinates: {
        lng: '',
        lat: '',
      },
      // 终点坐标
      endCoordinates: {
        lng: '',
        lat: '',
      },
      radius: 30,
      plugin: [
        {
          pName: 'Geolocation',
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 100,          //超过10秒后停止定位，默认：无穷大
          maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true,        //显示定位按钮，默认：true
          buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.coordinates.lng = result.position.lng;
                  self.coordinates.lat = result.position.lat;
                  self.address = result.formattedAddress;
                  self.mapCenter = [self.coordinates.lng, self.coordinates.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },

          },
        },
        {
          pName: 'MapType',//卫星与地图切换
          defaultType: 0,
          showTraffic: true,//实时交通图层
        },
      ],
      // 点击时获取点击位置的详细地址
      events: {
        click (e) {
          let { lng, lat } = e.lnglat;
          self.coordinates.lng = lng;
          self.coordinates.lat = lat;
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              console.log(result);

              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.currentWindow.addressComponent = result.regeocode.addressComponent;
                self.currentWindow.visible = true
                self.$nextTick();
              }
            }
          });
        }
      },
      // 信息窗体展示的信息
      currentWindow: {
        addressComponent: {}, // 位置详情
        visible: false,
        events: {
          close () {
            self.currentWindow.visible = false
          }
        }
      },
      // 搜索条件
      searchOption: {
        city: '北京', // 搜索的城市 默认全国
        citylimit: false // 是否旨在当前城市搜索
      },
      markers: [
        [121.59996, 31.197646],
        [121.40018, 31.197622],
        [121.69991, 31.207649]
      ],
    }

  },

  mounted () {
    // 检测断网
    window.addEventListener("offline", () => {
      console.log("已断网");
      this.network = false;
    });
    window.addEventListener("online", () => {
      console.log("网络已连接");
      this.network = true;
    });

  },
  methods: {
    // 获取周围信息
    req_post () {
      const that = this;
      const registerUrl = "http://restapi.amap.com/v3/batch?key=f4a92a6137903ff441d1e9c92d32d66e";
      const newUserInfo = {
        "ops": [
          {
            "url": "/v3/place/around?offset=10&page=1&key=f4a92a6137903ff441d1e9c92d32d66e&location=" + that.coordinates.lng + "," + that.coordinates.lat + "&output=json&radius=100000&types=080000"
          }
        ]
      };
      that.axios.post(registerUrl, newUserInfo, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(function (response) {
          console.log(response);

          console.log(response['data'][0]['body']['pois'])
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 搜索
    onSearchResult (pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let mapCenter = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [mapCenter.lng, mapCenter.lat];
      }
    },
    // 路线定位搜索
    onSearchroute (pois) {
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        this.endCoordinates = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
      }
    },
    // 步行路线
    walking () {
      var map = new AMap.Map("amap-vue", {});
      //步行导航
      var walking = new AMap.Walking({
        map: map, //AMap.Map对象
        panel: "panel",//结果列表的HTML容器id或容器元素
      });
      //根据起终点坐标规划步行路线
      walking.search([this.coordinates.lng, this.coordinates.lat], [this.endCoordinates.lng, this.endCoordinates.lat], function (status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
          // log.success('绘制步行路线完成')
          console.log('绘制步行路线完成');

        } else {
          // log.error('步行路线数据查询失败' + result)
          console.log('步行路线数据查询失败' + result);
        }
      });
      // this.axios.get(`https://restapi.amap.com/v3/direction/walking?origin=${this.coordinates.lng},${this.coordinates.lat}&destination=${this.endCoordinates.lng},${this.endCoordinates.lat}&key=f4a92a6137903ff441d1e9c92d32d66e`)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
    // 驾车路线
    driving () {
      var map = new AMap.Map("amap-vue", {});
      var drivingOption = {
        map: map,
        panel: 'panel',
        policy: AMap.TransferPolicy.LEAST_TIME // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
      }
      var driving = new AMap.Driving(drivingOption)
      //根据起终点坐标规划步行路线
      driving.search([this.coordinates.lng, this.coordinates.lat], [this.endCoordinates.lng, this.endCoordinates.lat], function (status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
          // log.success('绘制步行路线完成')
          console.log('绘制路线完成');

        } else {
          // log.error('步行路线数据查询失败' + result)
          console.log('路线数据查询失败' + result);
        }
      });
    },
    // 公交路线
    transfer () {
      var map = new AMap.Map("amap-vue", {});
      var transferOption = {
        map: map,
        nightflag: true, // 是否计算夜班车
        city: '北京市',
        panel: 'panel',
        outlineColor: '#ffeeee',
        autoFitView: true,
        policy: AMap.TransferPolicy.LEAST_TIME // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
      }

      var transfer = new AMap.Transfer(transferOption)
      //根据起终点坐标规划步行路线
      transfer.search([this.coordinates.lng, this.coordinates.lat], [this.endCoordinates.lng, this.endCoordinates.lat], function (status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
          // log.success('绘制步行路线完成')
          console.log('绘制路线完成');

        } else {
          // log.error('步行路线数据查询失败' + result)
          console.log('路线数据查询失败' + result);
        }
      });
    },
  }

}
</script>
<style scoped lang="scss">
.amap-wrapper {
  width: 100%;
  height: 700px;
}
.search-box {
  background-color: #eeeeee !important;
}
.amap-box {
  position: relative;
}
#panel {
  position: absolute;
  top: 0;
  right: 0;
}
.route-search {
  width: 50%;
}
.amap-info-content {
  p {
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.search-box-wrapper {
  input {
    width: 100% !important;
  }
}
</style>