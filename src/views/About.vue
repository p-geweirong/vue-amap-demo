<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="addCart($event,1)">点击事件</button>

    {{cartTotal}}
    <ul>
      <li v-for="(item,index) in cart" :key="index">1</li>
    </ul>
    <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      ball: {
        show: false,
        el: null
      }
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    ...mapGetters({
      cartTotal: 'cartTotal'
    })
  },
  methods: {
    addCart ($event, item) {
      this.ball.el = $event.target
      this.ball.show = true
      this.$store.commit('addcart', item)
    },
    beforeEnter (el) {
      let dom = this.ball.el
      let rect = dom.getBoundingClientRect()
      let x = window.innerWidth - rect.left
      let y = rect.top
      // eslint-disable-next-line no-unused-expressions
      el.style.display = ''
      el.style.transform = `translate3d(0,${y}px,0)`

      let inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(-${x}px,0,0)`
    },
    enter (el, done) {
      this._offset = document.body.offsetHeight
      el.style.transform = `translate3d(0,0,0)`

      let inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(0,0,0)`

      el.addEventListener('transitionend', done)
    },
    afterEnter (el) {
      this.ball.show = false
      el.style.display = 'none'
    }
  }

}
</script>
<style lang="stylus">
.ball-wrap {
  .ball {
    position: fixed;
    right: 50px;
    top: 50px;
    z-index: 200;
    background-color: red;
    transition: all 1s cubic-berzier(0.49, -0.29, 0.75, 90.41);

    .inner {
      width: 20px;
      height: 20px;
      transition: all 1s linear;
    }
  }
}
</style>
