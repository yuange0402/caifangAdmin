<template>
    <div class="seeHome" v-if="refresh">
        <el-table
            :data="tableData"
            style="width: 100%">
           
           
         

               <!-- 一个列 -->
            <el-table-column
              label="id"
              width="120">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
              </template>
            </el-table-column>


               <el-table-column
              label="主页房源"
              width="120">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.main_flag==1?"是":"" }}</span>
              </template>
            </el-table-column>

           
          
            <!-- 一个列 -->
            <el-table-column
              label="小区名"
              width="180">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

              <!-- 一个列 -->
            <el-table-column
              label="地址"
              width="180">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.address }}</span>
              </template>
            </el-table-column>

              <!-- 一个列 -->
            <el-table-column
              label="price"
              width="180">
              <template slot-scope="scope">
                <!-- <i class="el-icon-time"></i> -->
                <span style="margin-left: 10px">{{ scope.row.price }}</span>
              </template>
            </el-table-column>

          <!-- 最后一列，编辑和删除 -->
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <!-- 删除按钮 -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  
                  <!-- 添加按钮 -->
                  <el-button
                  size="mini"
                  type="danger"
                  @click="mainPageOption(scope.$index, scope.row)">
                     {{scope.row.main_flag == 1?"从主页移除":"添加到主页"}}
                  </el-button>
              </template>
            </el-table-column>
          </el-table>
    </div>
</template>

<script>
import {getAllHome} from '@/util/api.js'
import {delHome} from '@/util/api.js'
import {addToMain} from '@/util/api.js'
import {rmFromMain} from '@/util/api.js'

  export default {
    data() {
      return {
        refresh:true,
        tableData: []
      }
    },
    methods: {
      // 点击删除按钮
      handleDelete(index, row) {
        console.log(index, row);
        // row 就是这一列的item
        // 根据id删除当前的房源，然后强制刷新组件
        let id =row.id;
        console.log("删除按钮",row.id)
        delHome(id).then(res=>{
            console.log(res,"删除操作")
            if(res.data>0){
                 alert("删除成功！");
                 this.init()
            }else{
                alert("服务器错误")
            }
        })

      },
      mainPageOption(idx,item){
           let that = this;
           if(item.main_flag == 1){
            // 从主页删除
            rmFromMain(item.id).then(res=>{
                console.log(res,"删除结果")
                 this.init()
                   that.$message("删除成功！")
            })
             
           }else{
            //  添加到主页
            addToMain(item.id).then(res=>{
                 console.log(res,"添加到主页")
                 if(res.data == 11){
                      that.$message("主页的房源已经满啦，先移除一部分吧！")
                 }else{
                       if(res.data>0){
                            that.$message("添加成功！")
                        }
                          that.init()
                        }
                
            })
           }
      },


      init(){
          getAllHome().then(res=>{
            console.log(res);
            this.tableData = res.data;
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