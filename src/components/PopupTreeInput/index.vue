<template>
  <div>
    <el-popover
    :placement="placement"
    trigger="click"
    v-if="isShow"
    width="300"
  >
   <el-tree
        :data="data"
        :props="propa"
        node-key="nodeKey"
        ref="popupTree"
        @current-change="currentChangeHandle"
        :default-expand-all="defaultExpandAll"
        :highlight-current="true"
        :expand-on-click-node="true">
      </el-tree>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch,} from '@vue/runtime-core'

export default defineComponent({
  name: 'PopupTreeInput',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    propa: {
      type: Object,
      default: {}
    },
    prop: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '点击选择内容'
    },
    placement: {
      type: String,
      default: 'right-start'
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:dataForm'],
  setup(props,{ emit }) {
    let data = ref([])
    const isShow = ref(false)
    const propa = reactive(props.propa)
    const prop = ref(props.prop)
    const nodeKey = ref(props.nodeKey)
    const placeholder = ref(props.placeholder)
    const placement = ref(props.placement)
    const defaultExpandAll = ref(props.defaultExpandAll)
    const currentChangeHandle = (val) => {
      emit('update:dataForm',val)
    }
    watch(()=>props.data,(val)=>{
      data.value = val
      isShow.value = true
    },
    {immediate:true,deep:true}
    )
    return {
      data,propa,prop,nodeKey,placeholder,placement,defaultExpandAll,currentChangeHandle,isShow
    }
  },
})
</script>

<style scoped>
/deep/.popWidth{
  min-width: 250px !important;
}
</style>