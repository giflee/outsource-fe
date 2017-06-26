<template>
  <div id="app">
    <el-card class="index-card">
      <el-button type="primary" @click="gogogo">To Customer Home Page</el-button>
      <el-button type="primary" plain @click="tototo">To User Login Page</el-button>
    </el-card>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="owner_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="owner_tel"
        label="电话">
      </el-table-column>
      <el-table-column prop="old_price" label="价格"></el-table-column>
      <el-table-column prop="descrition" label="描述"></el-table-column>
    </el-table>
    <br>
    <br>
     <div class="block">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </div>
      <br>
      <br>
       <el-button
          plain
          @click="open3">
          成功
        </el-button>
        <el-button
          plain
          @click="open4">
          警告
        </el-button>
        <el-button
          plain
          @click="open5">
          消息
        </el-button>
        <el-button
          plain
          @click="open6">
          错误
        </el-button>

        <br>
        <br>
        <el-button plain @click="get6">get</el-button>
        <el-button plain @click="clear6">clear</el-button>
        <p>{{mockData}}</p>
    </div>
</template>

<script>
  import logo from 'assets/img/logo.png'
  import modal from 'components/modal.vue'
  export default {
    components: {
      modal
    },
    data() {
        return {
          tableData: [],
          pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
        mockData: ''
        }
      },
    methods: {
      gogogo () {
        location.assign('../customer/home.html')
      },
      tototo () {
        location.assign('../user/login.html')
      },
       open3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open4() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      open5() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open6() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      },

      get6() {
        var _$$this = this;
        this.$http.get('/api/session/get').then((ret => {
            console.log(ret);
            _$$this.$data.mockData = ret.body;
        }, (err) => {
            console.log(err);
            _$$this.$data.mockData = err.body;
        }))
      },

      clear6() {
        var _$$this = this;
        _$$this.$data.tableData = [];
      }
    }
  }
</script>

<style lang="postcss">
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
