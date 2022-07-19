<template>
  <div class="login-wrap" style="position: relative;width: 100%;height: 100%;">
    <img src="@/assets/img/login-bg.jpg" alt="" srcset="" style="width:100%;height:100%; opacity: .5">
    <div class="ms-login" style="position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;">
      <div class="ms-title" style="width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;">后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="loginRef"
        label-width="0px"
        class="ms-content"
        style="padding: 30px 30px;"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn" style="text-align: center;">
          <el-button type="primary" style=" width: 100%;
  height: 36px;
  margin-bottom: 10px;" @click="submitForm()">登录</el-button>
        </div>
        <!-- <p class="login-tips" style="font-size: 12px;
  line-height: 30px;
  color: #fff;">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/login'
import { getMenuTreeByUser } from '@/api/sys/menu.js'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const param = reactive({
      username: '',
      password: '',
    })
    const { proxy: { $md5, $message }, } = getCurrentInstance()
    const loading = ref(false)
    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    }
    const loginRef = ref(null)
    const handleLogin = () => {
      let userInfo = {
        operatorId: param.username,
        password: $md5(
          param.password + '12345678'
        ).toLocaleUpperCase(),
      }
      loginApi(userInfo)
        .then( async (res) => {
          if (res.resCode == '000000') {
            sessionStorage.setItem('user', JSON.stringify(res.data))
            sessionStorage.setItem('operatorId', res.data.user.operatorId)
            let result = await getMenuTree(res.data.user.id)
            // console.log(result)
            if(!!result){
              store.dispatch('login',true)
              store.dispatch('socketInit')
              router.push('/')
            }else{
              sessionStorage.removeItem('user')
              sessionStorage.removeItem('operatorId')
            }
          } else {
            $message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
        .catch((res) => {
          $message({
            message: res.message,
            type: 'error',
          })
        })
    }
    const submitForm = () => {
      loginRef.value.validate((valid) => {
        if (valid) {
          // loginRef.value = true
          handleLogin()
        } else {
          return false
        }
      })
    }
    store.commit('clearTags')
    const getMenuTree = (operatorId) => {
      return new Promise((resolve,reject)=>{
          getMenuTreeByUser({operatorId}).then(res=>{
          if(res.code == '200'){
            store.dispatch('resetMenu',res.data)
            
            resolve('true')
          }else {
            resolve('false')
          }
        })
      })
    }
    
    return {
      param,
      rules,
      loginRef,
      submitForm,
    }
  },
}
</script>

<style scoped>
/* .login-wrap { */
  /* position: relative;
  width: 100%;
  height: 100%; */
  /* background-image: url(@/assets/img/login-bg.jpg);
  background-size: 100%; */
/* } */
/* .ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
} */
/* .ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
} */
/* .ms-content { */
  /* padding: 30px 30px; */
/* } */
/* .login-btn { */
  /* text-align: center; */
/* } */
/* .login-btn button { */
  /* width: 100%;
  height: 36px;
  margin-bottom: 10px; */
/* } */
/* .login-tips { */
  /* font-size: 12px;
  line-height: 30px;
  color: #fff; */
/* } */
</style>
