<template>
<div>
      <VForm
      :form-data="formConfig"
      :form-model="searchForm"
      :form-handle="formHandle"
    />
    <V-table
      ref="table"
      :table-config="tableConfig"
    >
     <template v-slot:operation="data">
        <el-button
          size="small"
          @click="handleEdit(data.data)"
          icon="el-icon-lx-edit"
          circle
          type="primary"
        ></el-button>
        <el-popconfirm title="确定要删除该角色吗？" @confirm="handleDelete(data.data)">
          <template #reference>
            <el-button
              size="small"
              icon="el-icon-lx-delete"
              circle
              type="danger"
            />
          </template>
        </el-popconfirm>
      </template>
    </V-table>
      <!-- <el-dialog
      :close-on-click-modal="false"
      :title="operation ? '新增' : '编辑'"
      v-model="dialogVisible"
      width="35%"
    >
    <el-form ref="form" :model="dataForm" label-width="80px">
<el-form-item label="上级类别">
        <popup-tree-input
            :data="popupTreeData" :propa="popupTreeProps"
            :nodeKey="''+dataForm.parentId" @update:dataForm="handleTreeSelectChange">
            <template v-slot>
              <el-input v-model="dataForm.parentName" size="mini" :readonly="true" placeholder="点击选择内容" style="cursor:pointer;"></el-input>
            </template>
        </popup-tree-input>
      </el-form-item>
      <el-form-item label="类别名称">
        <el-input v-model="dataForm.perms" size="mini" clearable></el-input>
      </el-form-item>
      <el-form-item label="本级排序号：">
        <el-input v-model="dataForm.perms" size="mini" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dataForm.perms" size="mini" clearable></el-input>
      </el-form-item>
    </el-form>
     <div style="margin-top:4px;text-align:right">
      <el-button type="default" size="mini" @click="dialogVisible = false" >取消</el-button>
      <el-button type="primary" size="mini" @click="handleSave" >提交</el-button>
    </div>
    </el-dialog> -->
    </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, onMounted, onBeforeMount } from '@vue/runtime-core'
import { deepClone, formatterDate, listAssign, defaultObject } from '@/utils/util'
import { renderTable } from './common/gridHotlineWorkOrder'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
export default {
    name:'GridHotlineWorkOrder',
    components:{PopupTreeInput},
    setup() {
        const { proxy } = getCurrentInstance()
        const { tableConfig,formConfig } = renderTable.call(proxy)
        const searchForm = reactive({
          hotlineWorkOrderName:''
        })
         const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search'},
        {type:'primary',label:'重置',key:'reset'},
      ]
    }
    let searchParams = ref({}) // 表单数据备份

    //    const handleQuery = () => {
    //   searchParams.value = deepClone(searchForm)
    //   table.currentPage = 1
    //   handleQueryTable()
    // }
    // const handleReset = (formEL) => {
    //   formEL.resetFields()
    //   searchParams.value = {}
    //   defaultObject(searchForm)
    //   handleQuery()
    // }
    // const handleAdd = () => {
    //   handleOperation(3,{})
    // }

    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // onMounted(() => {
    //   handleQuery()
    // })

        return {
      
      formConfig,
      tableConfig,
      searchForm,
      formHandle,
    }
    }
}
</script>