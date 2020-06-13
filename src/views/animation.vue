<template>
  <div>
    <div class="bigbox animated " @click="alert"></div>
    <div class="bigbox1 animated "></div>
    <div class="bigbox2 animated" :class="{fadeInLeftBig:isActive}" ref="pronbit">
    </div>
    <div class="bigbox3">
      <div class="litterbox animated" :class="{fadeInRight:isActive2}" ref="box"></div>
      <div class="litterbox animated" :class="{fadeInRight:isActive2}" ref="box"></div>
      <div class="litterbox animated" :class="{fadeInRight:isActive2}" ref="box"></div>
    </div>
    <div class="bigbox4 animated zoomIn">
      <span>您好 世界</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isActive: false,
      isActive2: false,
    }
  },
  mounted () {
    // 监听dom元素距离顶部位置
    window.addEventListener('scroll', this.handleScrollx, true)
  },
  methods: {
    alert () {
      console.log(1)
      this.$dialog.alert({
        title: '标题',
        message: '弹窗内容'
      }).then(() => {
        // on close
      })
      this.$toast('nihao')
    },
    handleScrollx () {
      if (this.$refs.pronbit.getBoundingClientRect().top <= 935) {
        this.isActive = true
      }
      if (this.$refs.box.getBoundingClientRect().top <= 935) {
        this.isActive2 = true
      }
    },

  }
}

</script>
<style lang="less">
.bigbox,
.bigbox1,
.bigbox2,
.bigbox3,
.bigbox4 {
  width: 100%;
  height: 500px;
  background-color: red;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.bigbox4 {
  background: url("../assets/y-bg-11.jpg") center no-repeat;
  background-size: cover;
}
.litterbox {
  width: 33%;
  height: 200px;
  background-color: yellow;
  position: relative;
}
.litterbox {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.bigbox4 {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
