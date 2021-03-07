<template>
 <div class="login">
   <div class="box">
     <span>使用账号 登录官网</span>
     <el-form
     :model="ruleForm"
     status-icon
     :rules="rules"
     ref="ruleForm"
     label-width="100px"
     class="demo-ruleForm"
     >
       <el-form-item label="账号" prop="user">
         <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="pass">
         <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
         <el-button >返回</el-button>
       </el-form-item>
     </el-form>
   </div>
 </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from 'vuex';

export default {
  data(){
    let validateUser=(rule,value,callback)=>{
      if(value===''){
        callback(new Error('请输入账号'))
      }else{
        callback();
      }
    };
    let validatePass=(rule,value,callback)=>{
      if(value===''){
        callback(new Error('请输入密码'))
      }else{
        callback();
      }
    };
    return{
      ruleForm:{
        user:'',
        pass:'',
      },
      rules: {
        user: [{ validator: validateUser, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }]
      }
    };
  },
  methods:{
    ...mapMutations(['changeLogin']),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
        // //获取用户名和密码
       // let {user,pass}=this.ruleForm;
       //       let res=await this.$http.post('/api/login',this.ruleForm);
            console.log(this.ruleForm);
            let{username,token,id}=res.data;

         // console.log(this.ruleForm);
           this.$router.push({
            name: "home"
          })
           // }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};

</script>
<style lang="scss" scoped>
.login{
  position: relative;
  overflow: visible;
  background: #ededed;
  .box{
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: absolute;
    top: 200px;
    left: 50%;
    padding: 50px 50px 50px 50px;
    margin-left: -225px;
    box-shadow: 0 9px 30px -6px rgba(0,0,0,0.2),
    0 18px 20px -10px rgba(0,0,0,0.04),
    0 18px 20px -10px rgba(0,0,0,0.04),
    0 10px 20px -10px rgba(0,0,0,0.04);
    text-align: center;
    form{
      margin-top: 30px;
    }
    span{
      color: #333;
      font-weight: 400;
    }

  }
}
</style>
