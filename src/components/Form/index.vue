<template>
  <el-form ref="formRef" class="form" :model="formModel" :rules="formRules" :disabled="isDisabled" :label-position="formData.position">
    <el-row :gutter="formData.gutter || 0">
      <el-col v-for="item in formData.formItems"
        :key="item.prop" :span="item.span">
      <template
         v-if="item.isHide != 'hide'"
      >
        <el-form-item
          :label="item.label"
          :label-width="item.label ? (formData.labelWidth ? formData.labelWidth : '120px') : 0"
          :prop="item.prop"
        >
        <!-- 多層 -->
        <template v-if="item.type === 'many'" style="margin-left: -80px">
          <VForm :form-data="item.children" :form-model="formModel" :disabled="isDisabled"/>
        </template>
          <!-- Input -->
          <template v-if="item.type === 'Input' || item.type === ''">
            <el-input
              v-model.trim="formModel[item.prop]"
              :placeholder="item.placeholder"
              size="small"
              :disabled="item.disabled"
              :clearable="item.isClearable"
            />
          </template>
          <!--  -->
          <template v-if="item.type === 'selectSearch'">
            <el-select
              v-model="formModel[item.prop]"
              :placeholder="item.placeholder"
              size="small"
              :key="item.prop"
              @focus="()=>{querySearchAsync(item.code)}"
              :clearable="item.isClearable"
              :disabled="item.disabled"
              :loading="loading"
            >            
              <el-option
                v-for="i in options[item.code]"
                :label="i.label"
                :value="i.value"
                :key="i.value"
              ></el-option>
            </el-select>
          </template>
          <!-- textarea -->
          <template v-if="item.type === 'textarea'">
            <el-input
              v-model.trim="formModel[item.prop]"
              :autosize="{ minRows: 2, maxRows: 4 }"
              :placeholder="item.placeholder"
              type="textarea"
              size="small"
              :disabled="item.disabled"
              :clearable="item.isClearable"
            />
          </template>
          <!-- Select -->
          <template v-else-if="item.type === 'select'">
            <el-select
              v-model="formModel[item.prop]"
              :placeholder="item.placeholder"
              size="small"
              :clearable="item.isClearable"
              :disabled="item.disabled"
            >
              <el-option
                v-for="i in item.options"
                :label="i.label"
                :value="i.value"
                :key="i.value"
              ></el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'radioGroup'">
            <el-radio-group v-model="formModel[item.prop]" 
              :placeholder="item.placeholder"
              size="small"
              :clearable="item.isClearable"
              :disabled="item.disabled">
              <el-radio v-for="i in item.options" :key="i.value" :label="i.value">{{i.label}}</el-radio>
            </el-radio-group>
          </template>
          <!-- date -->
          <template v-else-if="item.type === 'date'">
            <el-date-picker
              v-model="formModel[item.prop]"
              type="date"
              size="small"
              :disabled="item.disabled"
              :format="item.format"
              :value-format="item.format || 'YYYY-MM-DD'"
            >
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'datetime'">
            <el-date-picker
              v-model="formModel[item.prop]"
              type="datetime"
              size="small"
              :disabled="item.disabled"
              :format="item.format"
              :value-format="item.format || 'YYYY-MM-DD'"
            >
            </el-date-picker>
          </template>
          <template v-else-if="item.type === 'dateTime'">
            <el-date-picker
              v-model="formModel[item.prop]"
              type="datetimerange"
              range-separator="至"
              size="small"
              :disabled="item.disabled"
              :format="item.format"
              :value-format="item.format || 'YYYY-MM-DD HH:mm:ss'"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </template>
          <!-- 自定義插槽 -->
          <template v-else-if="item.type === 'slot'">
            <slot :name="item.slotName" :data="item"></slot>
          </template>
        </el-form-item>
      </template>
      </el-col>
      
      <el-col v-if="formHandle" :span="formHandle.span ?? 6">
        <!-- 按鈕組 -->
        <div
          class="btn-box"
          style="margin-top: 4px"
          :style="{ 'text-align': formHandle.textAlign ?? 'left' }"
        >
          <el-button
            v-for="i in formHandle.btns"
            :key="i.key"
            :type="i.type"
            :icon="i.icon"
            :disabled="i.disabled"
            :size="i.size ?? 'small'"
            @click="i.handle && i.handle(formRef)"
            >{{ i.label }}</el-button
          >
        </div>
        
      </el-col>
      
    </el-row>
  </el-form>
</template>
<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue'
import { searchDict } from '@/api/sys/dict'
import { resetFormat } from '@/utils/util'

export default defineComponent({
  name: 'VForm',
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    formModel: {
      type: Object,
      default: () => {},
    },
    formHandle: {
      type: Object,
      default: () => {},
    },
    formRules: {
      type: Object,
      default: () => {},
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const formData = reactive(props.formData)
    const formRef = ref(null)
    const formModel = reactive(props.formModel)
    const formHandle = props.formHandle
    const formRules = 
      formData.rules && Object.getOwnPropertyNames(formData.rules).length !== 0
        ? formData.rules
        : props.formRules
    const isDisabled = ref(props.isDisabled)
    const loading = ref(false)
    const options = reactive({})
    const querySearchAsync = (basictype) => {
      if(basictype){
        loading.value = true
        searchDict({basictype}).then(res=>{
          if(res.resCode == '000000' && res.data){
            options[basictype] = resetFormat(res.data)
            loading.value = false
          }else{
            options[basictype] = []
            loading.value = false
          }
        })
      }else{
        options[basictype] = []
      }
    }
    const allQuerySearchAsync = (data) => {
      data.forEach(v => {
        if(v.type == 'selectSearch' && v.code){
          querySearchAsync(v.code)
        }
      })
    }
    allQuerySearchAsync(formData.formItems)
    return {
      formData,
      formRef,
      formModel,
      formHandle,
      formRules,
      isDisabled,
      querySearchAsync,
      loading,
      options,
    }
  },
})
</script>
<style scoped>
deep.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100% !important;
}
</style>
