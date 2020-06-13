<template>
  <div>

    <div v-if="userObj===undefined">空</div>
    <table border="1" v-else>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
      </tr>
      <tr>
        <td>{{userObj.name}}</td>
        <td>{{userObj.age}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'userDetails',
  data () {
    return {
      id: 0,
      userObj: {},
    }
  },
  created () {
    this.id = this.$route.query.id;

  },
  mounted () {
    this.getUser();
  },
  methods: {
    async getUser () {
      let { data } = await this.axios.get('index.json')
      this.userObj = data.user.find(item => item.id == this.id);
    }
  }
}
</script>
