<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover" style="height:350px">
                    <template #header>
                        <div class="clearfix">
                            <span>基础信息</span>
                        </div>
                    </template>
                    <el-row class="info">
                      <el-col :span="12" >
                          <div class="info-image" @click="showDialog">
                            <img :src="avatarImg" />
                            <span class="info-edit">
                                <i class="el-icon-lx-camerafill"></i>
                            </span>
                        </div>
                        <div class="info-name">{{ user.operatorName }}</div>
                      </el-col>
                      <el-col :span="12" class="info_right">
                        <div><span>用户名：</span>{{ user.operatorName }}</div>
                        <div><span>邮箱：</span>{{ user?.email }}</div>
                        <div><span>手机号：</span>{{ user?.mobile }}</div>
                        <div><span>创建人：</span>{{ user?.createBy }}</div>
                        <div><span>个人简介：</span>{{ user?.remarks || '无' }}</div>
                      </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" style="height:350px">
                    <template #header>
                        <div class="clearfix">
                            <span>修改密码</span>
                        </div>
                    </template>
                    <el-form ref="formRef" label-width="90px">
                        <el-form-item label="用户名："> {{ user.operatorName }} </el-form-item>
                        <el-form-item label="旧密码：" prop="oldPassword">
                            <el-input type="password" v-model="form.oldPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="newPasswordOne">
                            <el-input type="password" v-model="form.newPasswordOne"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="newPasswordTwo">
                            <el-input type="password" v-model="form.newPasswordTwo"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-popconfirm title="确定要重置密码吗？" @confirm="onReset" style="float:right;display:inline-block;margin-left:10px">
                            <template #reference>
                              <el-button
                                size="mini"
                                type="primary"
                              >重置密码</el-button>
                            </template>
                          </el-popconfirm>
                            <el-button size="mini" type="primary" @click="onSubmit" style="float:right;display:inline-block;">保存</el-button>
                           
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
            <vue-cropper ref="cropper" :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                style="width: 100%; height: 400px"></vue-cropper>

            <template #footer>
                <span class="dialog-footer">
                    <el-button class="crop-demo-btn" type="primary">选择图片
                        <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
                    </el-button>
                    <el-button type="primary" @click="saveAvatar">上传并保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import avatar from "@/assets/img/img.jpg";
import { updatePassword,resetPassword } from '@/api/sys/user'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const validatePass2 = (value,a, callback) => {
  console.log(value,a,'...')
  if (value == '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== form.value.newPasswordOne) {
    callback(new Error("两次密码不一致，请重新输入"))
  } else {
    callback()
  }
}
export default {
    name: "user",
    components: {
        VueCropper,
    },
    setup() {
        const name = localStorage.getItem("ms_username");
        const user = JSON.parse(sessionStorage.getItem('user')).user
        const store = useStore()
        const router = useRouter()
        const form = ref({
            oldPassword: "",
            newPasswordOne: "",
            newPasswordTwo: "",
        });
        const formRef = ref(null)
        const { proxy: { $md5, $message }, } = getCurrentInstance()
        const rules = reactive({
          oldPassword:[
            { required: true, message: '请输入旧密码', trigger: ['change','blur'] },
          ],
          newPasswordOne:[
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          newPasswordTwo:[
            { validator: validatePass2, trigger: 'blur' }
          ],
        })
        const onSubmit = () => {
          let { oldPassword,newPasswordOne,newPasswordTwo } = form.value
          if(String(newPasswordOne) != String(newPasswordTwo)){
            $message.error('两次密码不一致，请重新输入')
            form.value.newPasswordTwo = ''
            return
          }
          oldPassword = $md5(oldPassword + '12345678').toLocaleUpperCase(),
          newPasswordOne = $md5(newPasswordOne + '12345678').toLocaleUpperCase(),
          newPasswordTwo = $md5(newPasswordTwo + '12345678').toLocaleUpperCase(),
          updatePassword({oldPassword,newPasswordOne,newPasswordTwo}).then(res=>{
            if(res.code == '200'){
              $message.success('密码修改成功，请重新登陆！')
              store.dispatch('delHealthDegree')
              store.dispatch('closeSocket')
              store.state.eventList = []
              sessionStorage.removeItem('eventName')
              store.dispatch('clearMenu')
              router.push("/login");
            }else{
              $message.error(res.msg)
            }
          })
        };
        const onReset = () => {
          const { operatorId } = user
          resetPassword({operatorId}).then(res=>{
            if(res.code == '200'){
              $message.success('密码重置成功，账号即为密码，请重新登陆！')
              store.dispatch('delHealthDegree')
              store.dispatch('closeSocket')
              store.state.eventList = []
              sessionStorage.removeItem('eventName')
              store.dispatch('clearMenu')
              router.push("/login");
            }else{
              $message.error(res.msg)
            }
          })
        }

        const avatarImg = ref(avatar);
        const imgSrc = ref("");
        const cropImg = ref("");
        const dialogVisible = ref(false);
        const cropper = ref(null);

        const showDialog = () => {
            dialogVisible.value = true;
            imgSrc.value = avatarImg.value;
        };

        const setImage = (e) => {
            const file = e.target.files[0];
            if (!file.type.includes("image/")) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                dialogVisible.value = true;
                imgSrc.value = event.target.result;
                cropper.value && cropper.value.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        };

        const cropImage = () => {
            cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
        };

        const saveAvatar = () => {
            avatarImg.value = cropImg.value;
            dialogVisible.value = false;
        };

        return {
            name,
            form,
            onSubmit,
            cropper,
            avatarImg,
            imgSrc,
            cropImg,
            showDialog,
            dialogVisible,
            setImage,
            cropImage,
            saveAvatar,
            user,
            formRef,
            rules,
            onReset,
        };
    },
};
</script>

<style scoped>
.info {
    text-align: center;
    padding: 35px 0;
}
.info-image {
    position: relative;
    margin: auto;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50px;
    overflow: hidden;
}
.info-image img {
    width: 100%;
    height: 100%;
}
.info-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.info-edit i {
    color: #eee;
    font-size: 25px;
}
.info-image:hover .info-edit {
    opacity: 1;
}
.info-name {
    margin: 15px 0 10px;
    font-size: 24px;
    font-weight: 500;
    color: #262626;
}
.crop-demo-btn {
    position: relative;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
.info_right{
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-evenly;
}
.info_right  span{
  display: inline-block;
  min-width: 80px;
}
</style>