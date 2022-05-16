<template>
  <el-form ref="formRef" class="form" :model="formModel" :rules="formRules">
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
            <el-input v-model.trim="formModel[item.prop]"
                      :placeholder="item.placeholder"
                      size="small"
                      :disabled="item.disabled"
                      :clearable="item.isClearable" />
          </template>
          <!-- Select -->
          <template v-if="item.type === 'select'">
            <el-select v-model="formModel[item.prop]" :placeholder="item.placeholder" size="small" :clearable="item.isClearable" :disabled="item.disabled">
              <el-option v-for="i in item.options" :label="i.label" :value="i.value" :key="i.value"></el-option>
            </el-select>
          </template>
          <!-- datetimerange  ?? 至 ?? -->
          <template v-if="item.type === 'dateTime'">
            <el-date-picker v-model="formModel[item.prop]"
                            type="datetimerange"
                            range-separator="至"
                            size="small"
                            :disabled="item.disabled"
                            :format="item.format"
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
      </el-col>
      <el-col v-if="formHandle" :span="formHandle.span ?? 6">
        <!-- 按鈕組 -->
        <div  class="btn-box" style="margin-top:4px" :style="{'text-align': formHandle.textAlign ?? 'left'}">
          <el-button v-for="i in formHandle.btns" :key="i.key" :type="i.type" :size="i.size??'small'" @click="i.handle && i.handle(formRef)"
          >{{i.label}}</el-button
        >
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { defineComponent, inject, nextTick, onBeforeMount, onBeforeUnmount, onUnmounted, onUpdated, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'VForm',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    formModel: {
      type:Object,
      default:()=>{}
    },
    formHandle: {
      type: Object,
      default: () => {}
    },
    formRules:{
      type:Object,
      default: () =>{}
    }
  },
  setup (props) {
    const formData = reactive(props.formData)
    const formRef = ref(null)
    const formModel = reactive(props.formModel)
    const formHandle = props.formHandle
    const formRules = (formData.rules && Object.getOwnPropertyNames(formData.rules).length !== 0) ? formData.rules : props.formRules
    return {
      formData,
      formRef,
      formModel,
      formHandle,
      formRules,
    }
  },
})
</script>
<style scoped>
.form{
  margin-bottom: 10px;
}
</style>


