<template>
       <el-table
       class="seePhone"
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="手机号码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pwd"
        label="密码">
      </el-table-column>
       <el-table-column
        prop="time"
        label="创建时间">
      </el-table-column>
       <el-table-column
        prop="msg"
        label="备注信息">
      </el-table-column>
    </el-table>
</template>

<script>
import {getAllUser} from "@/util/api.js"
export default {
    data(){
        return{
            users:[]
        }
    },
    mounted(){
         getAllUser().then(res=>{
              console.log(res,"获取全部用户")
              this.users = res.data;
         })
    },
    methods:{


    }

}
</script>
<style lang="scss" scoped>
    .seePhone{
        //  border: 1px solid red;
        //  margin-left: 20px;
        padding-left: 30px;

    }
</style>

<style>

</style>