<template>
  <div class="addHome">
    <!-- 上传图片的地方 -->
    <div class="imgTitle">上传户型图片</div>
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


    <el-form-item label="户型类型（可填写平层、不限...）" class="house">
        <el-input v-model="ruleForm.type" placeholder="类型"></el-input>
    </el-form-item>

    <el-form-item label="户型朝向（可填写 东、南、西、北 ......）" class="house">
        <el-input v-model="ruleForm.direction" placeholder="朝向"></el-input>
    </el-form-item>


     <el-form-item label="户型名称（可填写）" class="house name" prop="name" >
         点击标签自动填写<br>
         <span @click="setName('3室1厅1卫')">3室1厅1卫</span>
         <span  @click="setName('3室1厅2卫')">3室1厅2卫</span>
         <span  @click="setName('3室2厅1卫')">3室2厅1卫</span>
         <span @click="setName('4室1厅1卫')">4室1厅1卫</span>
         <span @click="setName('4室1厅2卫')">4室1厅2卫</span>
         <span @click="setName('4室2厅1卫')">4室2厅1卫</span>
         <span @click="setName('4室2厅2卫')">4室2厅2卫</span>
         <span @click="setName('5室1厅1卫')">5室1厅1卫</span>
         <span @click="setName('5室1厅2卫')">5室1厅2卫</span>
         <span @click="setName('5室2厅1卫')">5室2厅1卫</span>
         <span @click="setName('5室2厅2卫')">5室2厅2卫</span>
         <span @click="setName('5室2厅3卫')">5室2厅3卫</span>
        <el-input v-model="ruleForm.name" placeholder="自定义名称"></el-input>

        
        <el-form-item label="单价（元/㎡）" class="house">
          <el-input v-model="price" placeholder=""></el-input>
        </el-form-item>
        
        <el-form-item label="户型面积（㎡）" class="house" prop="house_size">
            <el-input v-model="ruleForm.house_size" placeholder="输入户型面积"></el-input>
        </el-form-item>
          
         <el-form-item label="参考首付（单位：万元）" class="house">
            <el-input v-model="ruleForm.first_pay" placeholder=""></el-input>
        </el-form-item>
         
         <!--  -->
         <el-form-item label="参考月付(单位：元)" class="house">
            <el-input v-model="ruleForm.mon_pay" placeholder=""></el-input>
        </el-form-item>

          <el-form-item label="层高" class="house">
            <el-input v-model="ruleForm.height" placeholder=""></el-input>
         </el-form-item>



          <el-form-item label="描述信息" class="house">
            <el-input type="textarea" v-model="ruleForm.discription" placeholder=""></el-input>
         </el-form-item>


          <el-form-item label="数量（也可以填写具体多少套）" class="house">
            <el-input v-model="ruleForm.num" placeholder=""></el-input>
         </el-form-item>


    </el-form-item>

<!-- =============================================== -->



<!-- 
      <el-form-item label="房屋类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailAddress">
        <el-input v-model="detailAddress"></el-input>
      </el-form-item>

      <el-form-item label="小区名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    

       <el-form-item label="物业名称" prop="property">
        <el-input v-model="ruleForm.property"></el-input>
      </el-form-item>

      <el-form-item label="房价（元/平方米）（不需要填写单位，只需要填写数字）" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="开发商（公司名称）" prop="developers">
        <el-input v-model="ruleForm.developers"></el-input>
      </el-form-item>
      <el-form-item label="房产权（年）（不需要填写单位）" prop="property_right">
        <el-input v-model="ruleForm.property_right"></el-input>
      </el-form-item>
      <el-form-item label="车库" prop="cart_address">
        <el-radio-group v-model="ruleForm.cart_address">
          <el-radio label="y">有</el-radio>
          <el-radio label="n">无</el-radio>
        </el-radio-group>
      </el-form-item>
-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm','next')">再添加一个户型</el-button>
        <el-button @click="submitForm('ruleForm','ok')">添加完毕</el-button>
      </el-form-item> 
   
   
   
    </el-form>
  </div>
</template>

<script>
import { provinces } from "@/assets/allCity.js";
import { addHouseType } from "@/util/api";
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
      price:0,
      
      ruleForm: {
        name:"",//需要添加输入框
        direction:"南",//朝向信息（东南西北）
        height:"3",//单层高多少米
        type:"平层", //类型，可填写平层、不限等
        first_pay:0,
        mon_pay:0,
        num:"充足",//也可填写具体多少套
        discription:"户型方正，空间利用率高",
        house_size:0,//面积
      },

      // 验证规则只能验证表单里面的字段
      rules: {
        name: [
          { required: true, message:"名称不能为空哦", trigger: "change" },
        ],
        
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
        `请重新选择，最多选择1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    submitForm(formName,flag) {
        let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
           //自定义验证规则
           if(this.price == 0||this.house_size == 0||this.price == ""||this.house_size == ""){
                alert("户型单价和面积不能为null")
           }




          //获取表单
          let form = this.ruleForm;
          console.log(this.ruleForm,"form表单");
          //拼接图片字符串
          let imgL = this.imgsList;
          if(imgL.length<1){
              alert("没有选择户型图哦");
              return
          }

          let imgs = ""
          imgL.forEach(item=>{
              imgs += item+","
          })
          //去掉最后一个逗号
          imgs = imgs.substring(0,imgs.length-1);
          console.log(imgs,"拼接图片")
          form.imgs = imgs;
          //设置id 为flag_id
          form.flag_id = that.$store.state.flag_id;
          form.type_all_price = parseInt(form.house_size*that.price/10000);
           

          console.log("上传的form",form);

          addHouseType(form).then(res=>{
                console.log("上传房源返回的信息",res);
                if(res.data>0){
                    // 上传成功
                    //初始化数据
                      that.fileList = [];
                      that.imgsList = [];
                    that.$message('添加成功！');
                    if(flag == "ok"){
                        //返回addhome页面
                        that.$router.push({
                             path:"/home/addhome"
                        })
                    }else{
                        //  清空页面数据继续
                         that.$router.push({
                             path:"/home/addHouseType"
                        })

                    }
                }else{
                    alert("上传失败，请联系管理员")
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
    // 自动填写名称
    setName(name){
        console.log(name,"自动填写name")
         this.ruleForm.name = name;
    }
    
  },
  mounted() {
  },
  created() {
  },
  watch: {
      price(){
          //算首付   
          this.ruleForm.first_pay = this.ruleForm.house_size*this.price*0.3;
          //计算月供全款-（全款*0.3）/30/12
          let allPrice = this.ruleForm.house_size*this.price||0;


          let  mon_pay  =  (allPrice-allPrice*0.3)/30/12;
          mon_pay = parseInt(mon_pay);
          this.ruleForm.mon_pay = mon_pay; 
      },
      'ruleForm.house_size'(){
            // 计算首付
            let first_pay  = this.ruleForm.house_size*this.price*0.3/10000;
            this.ruleForm.first_pay = parseInt(first_pay);
            // 计算月供
            let allPrice = this.ruleForm.house_size*this.price||0;
            let  mon_pay  =  (allPrice-allPrice*0.3)/30/12;
            mon_pay = parseInt(mon_pay);
            this.ruleForm.mon_pay = mon_pay; 
      }
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