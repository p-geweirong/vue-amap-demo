<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <p>刷新次数: {{ count }}</p>
    <div>
      <table>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in users" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
          <td>
            <button @click="userClick(item.id)">查看</button>
            <button>删除</button>
          </td>
        </tr>
      </table>
      <ul class="pages">
        <button @click="preClick">上一页</button>
        <li class="page" v-for="(item,index) in maxPage" :key="index" @click="targePage(item)">{{item}}</li>
        <button @click="nextClick">下一页</button>
      </ul>
    </div>
  </van-pull-refresh>

</template>
<script>
import functionobj from '../assets/utils'
export default {
  name: 'user',
  data () {
    return {
      usersAll: [],
      users: [],
      maxPage: Number,//最大页数
      num: 5,//每页展示个数
      page: 1,//当前页数
      count: 0,
      isLoading: false,
    }
  },
  mounted () {
    this.getUsers()
    functionobj.myFun(this);// 封装的方法
  },
  methods: {
    async getUsers () {
      let { data } = await this.axios.get('index.json')
      this.usersAll = data.user
      this.paging(this.usersAll, this.num)

    },
    userClick (id) {
      this.$router.push({
        path: '/userDetails',
        query: {
          id
        }
      })
    },
    // 分页
    paging (arr, num) {
      this.maxPage = Math.ceil(this.usersAll.length / this.num)//获取最大页数
      this.users = this.usersAll.slice((this.page - 1) * this.num, this.page * this.num)
    },
    targePage (page) {
      this.page = page
      this.paging(this.usersAll, this.num)
    },
    preClick () {
      if (this.page <= 1) {
        this.$toast('已经是第一页了')
        return
      }
      this.targePage(this.page - 1)
    },
    nextClick () {
      if (this.page >= this.maxPage) {
        this.$toast('已经是最后一页了')
        return
      }
      this.targePage(this.page + 1)
    },
    onRefresh () {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  }
}

</script>
<style scoped lang="scss">
table {
  height: 190px;
}
.pages {
  display: flex;
  justify-content: center;
  .page {
    width: 16px;
    height: 16px;
    margin: 0 10px;
    background-color: #eeeeee;
    padding: 10px;
  }
}
</style>