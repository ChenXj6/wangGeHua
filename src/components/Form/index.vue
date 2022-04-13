<template>
  <el-form ref="formRef" :model="formModel">
    <el-row :gutter="formData.gutter || 0">
      <el-col v-for="item in formData.formItems"
              :key="item.prop"
              :span="item.span">
        <el-form-item :label="item.label"
                      :label-width="item.label?'80px':0"
                      :prop="item.prop">
          <!-- 多層 -->
          <template v-if="item.type === 'many'" style="margin-left:-80px">
            <VForm :form-data="item.children"/>
          </template>
          <!-- Input -->
          <template v-if="item.type === 'Input'">
            <el-input v-model="formModel[item.prop]"
                      :placeholder="item.placeholder"
                      size="small"
                      :clearable="item.isClearable" />
          </template>
          <!-- Select -->
          <template v-if="item.type === 'select'">
            <el-select v-model="formModel[item.prop]" :placeholder="item.placeholder" size="small" :clearable="item.isClearable">
              <el-option v-for="i in item.options" :label="i.label" :value="i.value" :key="i.value"></el-option>
            </el-select>
          </template>
          <!-- datetimerange  ?? 至 ?? -->
          <template v-if="item.type === 'dateTime'">
            <el-date-picker v-model="formModel[item.prop]"
                            type="datetimerange"
                            range-separator="至"
                            size="small"
                            :value-format="item.format || 'YYYY-MM-DD HH:mm:ss'"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </template>
          <!-- 自定義插槽 -->
          <template v-if="item.type === 'slot'">
            <slot :name="item.slotName"></slot>
          </template>
        </el-form-item>
        <!-- 按鈕組 -->
        <div  v-if="item.type === 'btns'" class="btn-box" style="margin-top:-6px">
          <el-button v-for="i in item.btnsList" :key="i" :type="i.type" :size="i.size??'small'" @click="i.use ==='search' ? handleQuery() : (i.use === 'reset' ? handleReset(formRef):'')"
          >{{i.label}}</el-button
        >
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { defineComponent, onBeforeMount, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'VForm',
  props: {
    formData: {
      type: Array,
      default: () => []
    }
  },
  emits:['reset','search'],
  setup (props,{emit}) {
    const formData = reactive(props.formData)
    const formRef = ref(null)
    const initForm = (data) => {
      if(!data.formItems) return
      const modelObject = {}
      forE(data,modelObject)
      return modelObject
    }
    const forE = (data,modelObject) => {
      data.formItems.forEach(item => {
        if (item.prop) {
          modelObject[item.prop] = item.value || ""
        } else if(item.children){
          forE(item.children,modelObject)
        }
      })
    }
    const formModel = reactive(initForm(formData))
    const handleQuery = () => {
      emit('search',formModel)
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      emit('reset')
    }
    return {
      formData,
      formRef,
      formModel,
      handleReset,
      handleQuery,
    }
  },
})
</script>


