<template>
  <el-table
    :ref="tableConfig.name"
    :key="`${tableConfig.name}_${key}`"
    v-loading="loading"
    style="width: 100%;margin-top:10px"
    :data="tableConfig.data"
    border
    size="small"
    :height="!!height ? height : null"
    :max-height="tableConfig.height"
    :row-class-name="tableConfig.rowClassFunc || rowClassFunc"
    :cell-class-name="tableConfig.cellClassFunc"
    :default-sort="tableConfig.defaultSort"
    :cell-style="cellStyle"
    :row-style="rowStyle"
    :row-key="tableConfig.rowKey ?? 'id'"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
  >
  <!-- @sort-change="handleSortChange" -->
  <!-- 序号列 -->
    <el-table-column
      v-if="tableConfig.index"
      label=""
      type="index"
      width="50"
      align="center"
      :index="indexMethod"
    />
    <!-- 多选列 -->
    <el-table-column
      v-if="tableConfig.mutiSelect"
      type="selection"
      width="55"
      align="center"
    />    
    <!-- 数据列 -->
    <template
      v-for="(column, columnIndex) in tableConfig.columns"
      :key="columnIndex"
    >
      <!-- v-if="column.visible === undefined ? true : column.visible" -->
      <!-- <el-table-column
        header-align="center"
        align="center"
        prop="prop"
        label="label" 
        type="expand">
      </el-table-column> -->
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :align="column.align ? column.align : 'center'"
        :width="column.width"
        :fixed="column.fixed"
        :show-overflow-tooltip="column.tooltip"
        :min-width="column.minWidth"
        :sortable="column.sortable"
      >
        <!-- 表体 -->
        <template #default="scope">
          <!-- 自定义时间格式 -->
          <template v-if="column.formatter">
            <span>
              {{ dateFormat(scope.row[column.prop], column.formatter) }}</span
            >
          </template>
          <!-- icon -->
          <template v-else-if="column.icon">
            <span><i :class="scope.row[column.prop]"></i></span>
          </template>
          <!-- code查询 -->
          <template v-else-if="column.code && column.type == 'code'">
            <!-- {{ options[column.code] }} -->
            <span >{{options[column.code].filter(v=>v.value == scope.row[column.prop])[0]?.label}}</span>
          </template>
          <!-- 正常格式 -->
          <template v-else-if="!column.slot">
            <span>{{ scope.row[column.prop] }}</span>
          </template>
          
          <!-- 自定义插槽 -->
          <slot v-else :name="column.slot" :data="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="pagination" :style="{'text-align':tableConfig.paginationAlign ?? 'right'}">
    <el-pagination
      v-if="tableConfig.pagination"
      background
      small
      :current-page="currentPage"
      :page-sizes="pageSizeList"
      :page-size="currentPageSize"
      :hide-on-single-page="isHide"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="page__wrapper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from '@vue/runtime-core'
import Sortable from 'sortablejs'
import { deepClone,resetFormat } from '@/utils/util'

import { items } from '@/config/menu'
import { searchDict } from '@/api/sys/dict'

export default defineComponent({
  name: 'VTable',
  props: {
    tableConfig: {
      type: Object,
      default: () => {},
    },
    cellStyle: {
      type: Function,
      default: () => {},
    },
    rowStyle: {
      type: Function,
      default: () => {},
    },
    height: {
      type: Number,
      default: () => 0
    }
  },
  emits: ['selectChange', 'currentChange', 'sizeChange', 'rowClick'],
  setup(props, { emit }) {
    const {
      proxy: { $moment },
    } = getCurrentInstance()
    const loading = ref(false)
    const key = ref(0)
    const height = ref(props.height)
    const currentPage = ref(1)
    const currentPageSize = ref(10)
    const total = ref(0)
    const queryParams = ref({})
    const multipleSelection = ref([])
    const selectedRow = ref([])
    const callbackFunc = ref(null)
    const tableConfig = reactive(props.tableConfig)
    const isHide = ref(false)  // 不够一页时是否隐藏分页器
    // 获取表格数据
    const getTableData = (obj = {}, callback = () => {}) => {
      queryParams.value = deepClone(obj) // 请求参数备份
      loading.value = true
      key.value++ //避免表格更新出错
      return new Promise((resolve, reject) => {
        let params = deepClone(obj)
        if (tableConfig.pagination) {
          const pageObj = {}
          pageObj[tableConfig.pageField || 'pageNum'] = isNaN(currentPage.value) ? 1 : currentPage.value
          pageObj[tableConfig.pageSizeField || 'pageSize'] = currentPageSize.value
          // pageObj.operatorId = String(JSON.parse(sessionStorage.getItem('operatorId')))
          // console.log(params,';;;')
          params = Object.assign(params, pageObj)
        }
        // resolve(callback(items))
        // loading.value = false
        // return  
        tableConfig
          .method(params)
          .then((res) => {
            // console.log(1111,res.data)
            if (tableConfig.isSpecial) {
              callbackFunc.value = callback
              resolve(callback(res))
            } else {
              
              const data = res.data
              // console.log(data,';;;')
              if (tableConfig.pagination) {
                currentPage.value = Number(data.pageNum)
                total.value = data.hasOwnProperty('total') ? Number(data.total) : data.length
              }
              selectedRow.value = []
              callbackFunc.value = callback
              resolve(callback(data))
            }
            loading.value = false
          })
          .catch((err) => {
            // reject(err)
            loading.value = false
          })
      })
    }
    // 计算属性处理时间格式
    const dateFormat = computed(() => (date, formatter) => {
      return date && $moment(date).format(formatter)
    })
    const pageSizeList = computed(
      () => tableConfig.pageSizeList || [1, 2, 10, 50, 100]
    )
    // 表格操作
    // 序号随分页联动
    const indexMethod = (index) => {
      index = index + 1 + (currentPage.value - 1) * currentPageSize.value
      return index
    }
    const handleSizeChange = (val) => {
      currentPage.value = 1
      currentPageSize.value = val
      selectedRow.value = []
      getTableData(queryParams.value,callbackFunc.value)
      emit('sizeChange', selectedRow.value)
    }
    const handleCurrentChange = (val) => {
      currentPage.value = val
      selectedRow.value = []
      getTableData(queryParams.value,callbackFunc.value)
      emit('currentChange', selectedRow.value)
    }
    const handleSelectionChange = (val) => {
      selectedRow.value = multipleSelection.value = val
      emit('selectChange', selectedRow.value)
    }
    const handleRowClick = (val) => {
      emit('rowClick',val)
    }
    const rowClassFunc = ({ row, rowIndex }) => {
      if (selectedRow.value.includes(rowIndex)) {
        return 'selectRow'
      }
    }

    // 拖拽
    const rowDrop = () => {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody, {
        animation: 1000,
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex, '/////')
        },
      })
    }




    const options = reactive({})
    const querySearchAsync = (basictype) => {
      if(basictype){
        searchDict({basictype}).then(res=>{
          if(res.resCode == '000000' && res.data){
            options[basictype] = resetFormat(res.data)
          }else{
            options[basictype] = []
          }
        })
        
      }else{
        options[basictype] = []
      }
      
    }
    const allQuerySearchAsync = (data) => {
      data.forEach(v => {
        if(v.type == 'code' && v.code){
          querySearchAsync(v.code)
        }
      })
    }
    onBeforeMount(()=>{
      allQuerySearchAsync(tableConfig.columns)
    })
    onMounted(() => {
      if(tableConfig.isSortable) {
        document.body.ondrag = function (e) {
          e.preventDefault()
          e.stopPropagation()
        }
        nextTick(()=>rowDrop())
      }
    })
    return {
      key,
      loading,
      currentPage,
      currentPageSize,
      pageSizeList,
      total,
      tableConfig,
      dateFormat,
      handleSizeChange,
      handleCurrentChange,
      getTableData,
      handleSelectionChange,
      handleRowClick,
      indexMethod,
      rowClassFunc,
      isHide,
      options,
      height,
    }
  },
})
</script>
<style lang="scss">
.table__wrapper .selectRow {
  td {
    background-color: rgba(185, 221, 249, 0.75) !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(185, 221, 249, 0.75) !important;
  }
}
</style>
