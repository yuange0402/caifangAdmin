<template>
  <div class="home">
    <!-- <div class="header">采房后台管理系统</div> -->

    <div class="main">
      <div class="homeLeft">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
       
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
              <!-- 第一个折叠面板 -->
            <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>房源管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <nuxt-link to='/home/addHome'>
              <el-menu-item index="1-1">
                      添加房源
              </el-menu-item>
                </nuxt-link>
                <nuxt-link to='/home/seeHome'>
              <el-menu-item index="1-2">
                       查看房源
              </el-menu-item>
               </nuxt-link>
            </el-menu-item-group>
          </el-submenu>

          <!-- 第二个折叠面板 -->
          <el-submenu index="2">
            <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>用户信息</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
                <nuxt-link to="/home/seePhoneNum">
              <el-menu-item index="2-1">
               用户列表
              </el-menu-item>
              </nuxt-link>
              <!-- <el-menu-item index="2-2">用户列表</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>


          <!-- 第三个折叠面板 -->
          <el-submenu index="3">
            <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>房产经纪人</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <nuxt-link to="/home/addAgent">
              <el-menu-item index="3-1">
                 添加房产经纪人
              </el-menu-item>
              </nuxt-link>
                <nuxt-link to="/home/seeAgent">
               <el-menu-item index="3-2">
                 查看房产经纪人
              </el-menu-item>
              </nuxt-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="homeRight">
          <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.home {
  // border: 1px solid darkcyan;
  width: 100%;
  height: 100vh;
  margin: auto;
  left: 0;
  right: 0;
  
  .header {
    height:110px;
    width: 100%;
    background-color: #545c64;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: white;
    font-weight: 800;
    font-size: 30px;
    border-bottom:10px solid #fff;
  }

  .main {
    // border: 1px solid darkcyan;
    height: calc(100vh - 110px);
    display: flex;
    width: 100%;

    .homeLeft {
      // border: 1px solid darkblue;
      height: 100%;
      width: 20%;
      background-color: #545c64;
      // 左边管理菜单
    }

    .homeRight {
      // border: 3px solid darkgoldenrod;
      height: 100%;
      width: 80%;
      overflow:scroll;
    }
  }
}
</style>

<style>
</style>