<template>
  <div class="addHome">
    <!-- 上传图片的地方 -->
    <div class="imgTitle">上传头像</div>
    <el-upload
      class="upload-demo"
      action="http://47.113.113.156:8080/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="uploadSuccess"
      :file-list="fileList"
      >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      >


    <el-form-item label="姓名" class="house" prop="agent_name">
        <el-input v-model="ruleForm.agent_name" placeholder="姓名"></el-input>
    </el-form-item>

    <el-form-item label="毕业院校" class="house" prop="school">
        <el-input v-model="ruleForm.school"></el-input>
    </el-form-item>



      <el-form-item>
        <el-button @click="submitForm('ruleForm')">确定</el-button>
      </el-form-item> 
   
   
   
    </el-form>
  </div>
</template>

<script>
// import { provinces } from "@/assets/allCity.js";
import { addHouseType, addAgent } from "@/util/api";
// import { addAgent } from "@/util/api";


export default {
  data() {
    return {
      // 上传图片的图片列表这个是你添加的时候的路径
      fileList: [
       
      ],
      // 这个是服务器返回的路径
       imgsList:[],
      // 城市列表
     
      //根据price 自动计算首付和月供   
      // price:0,
      
      ruleForm: {
         agent_name:"",
         school:""
      },

      // 验证规则只能验证表单里面的字段
      rules: {
        agent_name: [
          { required: true, message:"名称不能为空哦", trigger: "change" },
        ],
        school:[
              { required: true, message:"学校不能为空哦", trigger: "change" },
        ]
        
      }
    };
  },
  methods:{
  // 图片上传成功的回调函数
    uploadSuccess(e){
      //  e 是文件上传成功那之后的回调，会返回一个字符串数组，这个数组里面都是图片的名字，
      // 然后获取到这个数组和数据一起上传到数据库，
      // 虽然可以多选文件上传，但是ele ui 是每次只上传一个文件，所以你选择了
      // 几十个图片，那么是发送了几十个请求，每次上传一个
         console.log(e);
         this.imgsList.push(e);
         console.log(this.imgsList,"图片列表")
    },
   
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `最多选择1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    submitForm(formName) {
        let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
           //自定义验证规则
            if(that.imgsList.length<1){
                 that.$message("没有选择头像哦");
                 return;
            }




          //获取表单
          let form = this.ruleForm;
          console.log(this.ruleForm,"form表单");
          
           // 添加图片
           form.headimg =  that.imgsList[0]

          //  发送请求
            addAgent(form).then(res=>{
                  console.log(res,"添加经理人");
                  if(res.data>0){
                      // 初始化图片数据
                      that.fileList = [];
                      that.imgsList = [];
                        
                        that.$message("添加成功！");
                  }else{
                        that.$message("服务器出错，请联系管理员！");
                  }
            })
          
          







        } else {
          console.log("error submit!!");
          alert("请将带星号的信息填写完整")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  
    
  },
  mounted() {
  },
  created() {
  },
  watch: {
   
  }
};
</script>
<style lang="scss" scoped>


.name{
     span{
          padding: 7px 10px 7px;
          border: 1px solid orange;
          border-radius: 10px;
          color: orange;
          margin: 5px;
     }
}



.imgTitle{
    color: #777;
    margin:50px 0px;
}


.upload-demo{
  margin-bottom: 100px;
}
.addHome {
  padding: 30px;
  // border: 1px solid darkblue;
  border: none;


}

.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
</style>