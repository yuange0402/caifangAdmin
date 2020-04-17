<template>
  <div class="page">
    <div class="login-box">
        <h4>采房后台管理</h4>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input show-password placeholder="请输入密码" v-model="formLabelAlign.password"></el-input>
          </el-form-item>
      </el-form>
       <el-button id="login" @click="login" type="success">登录</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'home',
  data(){
    return{
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        password: '',
      }
    }
  },
  methods:{
    login(){
      if(this.formLabelAlign.username=='63838600'&&this.formLabelAlign.password=='63838600'){
        localStorage.setItem('adminLogin',true);
        this.$router.push({ path: '/home/addHome'})
      }else{
        alert('账号或者密码错误')
      }
    }
  }
}
</script>

<style scoped>
    .page{ 

        background:url("../static/img/bg.jpg") no-repeat;
        background-size: cover;
        background-color: #464646;
        background-attachment: fixed;
        background-position: center center;
        /* height: 100%; */
        /* width: 100%; */
        width: 100vw;
        height: 100vh;
        /* background-image: linear-gradient(to right, #243949 0%, #517fa4 100%); */
        padding: 0;
        margin: 0;
    }

    .login-box{
        background: white;
        position: absolute;
        top: 32%;
        right: 18%;
        padding: 50px 30px;
        border-radius: 8px;
    }

    #login{
      width: 100%;
    }
</style>
