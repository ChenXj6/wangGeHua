<template>
  <div style="width:100%;">
    <el-popover      
      :placement="placement"
      trigger="click"
      v-if="isShow"
      width="300"
    >
    <div class="search">
      <el-input v-model="filterText" size="small" clearable />
    </div>
    <el-tree
          :data="data"
          :props="propa"
          node-key="nodeKey"
          ref="popupTree"
          accordion
          @current-change="currentChangeHandle"
          :default-expand-all="defaultExpandAll"
          :highlight-current="true"
          :filter-node-method="filterNode"
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
      default: 'bottom-start'
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
    const filterText = ref('')
    const popupTree = ref(null)
    watch(()=>filterText.value, (val) => {
      popupTree.value.filter(val)
    })
    
    const filterNode = (value, data) => {
      if (!value) return true
      // console.log(data)
      return data.officeName.includes(value)
    }
    return {
      data,propa,prop,nodeKey,placeholder,placement,defaultExpandAll,currentChangeHandle,isShow,filterNode,filterText,popupTree
    }
  },
})
</script>

<style scoped>
.search{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
}
</style>