<template>
  <div class="addHome">
    <!-- 上传图片的地方 -->
    <div class="imgTitle">上传相册</div>
    <el-upload
      class="upload-demo"
      action="http://47.113.113.156:8080/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="20"
      :on-exceed="handleExceed"
      :on-success="uploadSuccess"
      :file-list="fileList"
      >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">1图片名称最好不要有中文</div>
      <div slot="tip" class="el-upload__tip">2限制20张</div>
      <div slot="tip" class="el-upload__tip">2注意不要重复添加</div>
    </el-upload>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      >
      <el-form-item label="选择省份" prop="selProvince">
        <!-- 第一个选择框选择省份 -->
        <el-select v-model="selProvince" placeholder="请选择">
          <el-option
            v-for="item in provinces"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择城市" prop="selCity">
        <!-- 第二个选择框 城市-->
        <el-select v-model="selCity" placeholder="请选择">
          <el-option v-for="item in cities" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="房屋类型" prop="type">
        <!-- 房屋类型 小区 别墅... -->
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
      <el-form-item label="面积（㎡）" class="house">
        <el-input v-model="house_size1" placeholder="最小面积"></el-input>
        <span style="color:orange; margin-left:20px">到</span>
        <el-input v-model="house_size2" placeholder="最大面积"></el-input>
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
          <el-radio label="有">有</el-radio>
          <el-radio label="无">无</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="选择房产经纪人" prop="agent">
        <el-radio-group v-model="ruleForm.agent">
          <el-radio v-for="item in agents" :key="item.agent_id" :label="item.agent_id">{{item.agent_name}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步（添加户型）</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { provinces } from "@/assets/allCity.js";
import { addHome } from "@/util/api";
import { getAllAgent } from "@/util/api";
export default {
  data() {
    return {
      agents:[],
      // 上传图片的图片列表这个是你添加的时候的路径
      fileList: [
       
      ],
      house_size1:58,
      house_size2:220,
      // 这个是服务器返回的路径
       imgsList:[],
      // 城市列表
      cities: [
          {
            "name":"广州市",
            "level":"2",
            "code":"4401"
          },
          {
            "name":"韶关市",
            "level":"3",
            "code":"4402"
          },
          {
            "name":"深圳市",
            "level":"3",
            "code":"4403"
          },
          {
            "name":"珠海市",
            "level":"3",
            "code":"4404"
          },
          {
            "name":"汕头市",
            "level":"3",
            "code":"4405"
          },
          {
            "name":"佛山市",
            "level":"3",
            "code":"4406"
          },
          {
            "name":"江门市",
            "level":"3",
            "code":"4407"
          },
          {
            "name":"湛江市",
            "level":"3",
            "code":"4408"
          },
          {
            "name":"茂名市",
            "level":"3",
            "code":"4409"
          },
          {
            "name":"肇庆市",
            "level":"3",
            "code":"4412"
          },
          {
            "name":"惠州市",
            "level":"3",
            "code":"4413"
          },
          {
            "name":"梅州市",
            "level":"3",
            "code":"4414"
          },
          {
            "name":"汕尾市",
            "level":"3",
            "code":"4415"
          },
          {
            "name":"河源市",
            "level":"3",
            "code":"4416"
          },
          {
            "name":"阳江市",
            "level":"3",
            "code":"4417"
          },
          {
            "name":"清远市",
            "level":"3",
            "code":"4418"
          },
          {
            "name":"东莞市",
            "level":"3",
            "code":"4419"
          },
          {
            "name":"中山市",
            "level":"3",
            "code":"4420"
          },
          {
            "name":"潮州市",
            "level":"3",
            "code":"4451"
          },
          {
            "name":"揭阳市",
            "level":"3",
            "code":"4452"
          },
          {
            "name":"云浮市",
            "level":"3",
            "code":"4453"
          }
        ],
      types: ["别墅", "小区","公寓","写字楼","商铺"],
      selProvince:"广东",
      selCity:"佛山",
      detailAddress: "",
      ruleForm: {
        agent:"",
        name:"",//需要添加输入框
        // 单价
        price:9800,
        // 已选择的省份
        // selProvince: "广东省",
        // 已选择的城市
        // selCity: "",
        type: "小区",
        // 车库
        cart_address: "有",
        // 产权
        property_right: "70",
        // 开发商
        developers: "",
        // 物业
        property:"",//需要添加输入框
        // address:""//需要自己拼接
        // 详细地址
      },

      // 验证规则只能验证表单里面的字段
      rules: {
        name: [
          { required: true, message: "小区名称不能为空哦", trigger: "change" }
        ],
      
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        property_right: [
          { required: true, message: "不可以为空哦", trigger: "change" }
        ],
        price: [{ required: true, message: "不可以为空哦", trigger: "change" }],
        agent: [{ required: true, message: "不可以为空哦", trigger: "change" }]
      
        // desc: [{ required: true, message: "请填写活动形式", trigger: "change" }]
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
    getAgent(){
        let  that = this;
        getAllAgent().then(res=>{
           console.log("房产经纪人",res);
           if(res.status == 200){
              that.agents = res.data;
           }
        })
    },
   
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `最多选择20个文件，本次选择了 ${
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
          // alert("submit!");
          // 自定义验证
          if(this.detailAddress.length<1||this.selCity.length<1||this.selProvince.length<1){
              alert("请选择城市，选择省份，填写详细地址");
              return;
          }

        



          console.log(this.ruleForm,"form表单");
          //拼接图片字符串
          let imgL = this.imgsList;
          let imgs = ""
          imgL.forEach(item=>{
              imgs += item+","
          })
          //去掉最后一个逗号
          imgs = imgs.substring(0,imgs.length-1);


          console.log(imgs,"拼接图片")
          let form = this.ruleForm;
          form.imgs = imgs;
          // 拼接地址
          form.address = this.selProvince+this.selCity+this.detailAddress;

            //拼接面积
          let house_size = this.house_size1+"-"+this.house_size2;
          form.house_size  = house_size;
         
         
          // 添加flag_id 
          let flag_id  = Math.floor(Math.random()*10000000000)
          form.flag_id = flag_id;
          // 把flagid 作为全局变量，用来给其他页面使用
          // that.$store.setFlagId(flag_id);
          that.$store.commit("setFlagId",flag_id);
          console.log(form,"form 数据");





            addHome(form).then(res=>{ 
                console.log(res)
                if(res.data == 'success'){
                     that.$message('添加成功！');
                    // 把上次选择的图片清空
                     that.imgsList=[]; 
                     that.fileList = [];

                    //  下一步，跳转到添加户型的页面
                    that.$router.push({
                        path:"/home/addHouseType" 
                    })


                }else{
                     alert("服务器错误添加失败");
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
    // 获取房产经纪人
     this.getAgent()
  },
  created() {
    this.provinces = provinces;
  },
  watch: {
    selProvince(value) {
      console.log(value);
      let result = this.provinces.filter(item => {
        return item.name == value;
      });

      this.cities = result[0].cities;
    }
  }
};
</script>
<style lang="scss" scoped>




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