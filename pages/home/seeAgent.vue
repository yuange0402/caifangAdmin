<template>
    <div class="seeHome">
        <el-table
            :data="agents"
            style="width: 100%">
               <!-- 一个列 -->
            <el-table-column
              label="id"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.agent_id }}</span>
              </template>
            </el-table-column>
          
          
            <!-- 一个列 -->
            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.agent_name }}</span>
              </template>
            </el-table-column>

              <!-- 一个列 -->
            <el-table-column
              label="毕业学校"
              width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.school }}</span>
              </template>
            </el-table-column>


          <!-- 最后一列，编辑和删除 -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>
</template>

<script>
import { getAllAgent} from '@/util/api.js'
import { delAgent} from '@/util/api.js'
// import {delHome} from '@/util/api.js'

  export default {
    data() {
      return {
          agents:[]
      }
    },
    methods: {
       
      // 点击删除按钮
      handleDelete(index, row) {
          let that  = this;
        console.log(index, row);
        // row 就是这一列的item
        // 根据id删除当前的经理人，然后强制刷新组件
        let id =row.agent_id;
        console.log("删除按钮",id)
        delAgent(id).then(res=>{
            console.log(res,"删除操作")
            if(res.data>0){
                  that.$message("删除成功！");
                 this.init()
            }else{
                that.$message("服务器错误,请联系管理员")
            }
        })

      },


      init(){
          let that = this;
          getAllAgent().then(res=>{
            console.log(res,"经理人");
            that.agents = res.data;
        })
      }
    },
    mounted(){
        this.init()
    }



  }




</script>

<style>

.seeHome{
    border: none;
}

</style>