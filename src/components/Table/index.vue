<template>
  <el-table
    :ref="tableConfig.name"
    :key="`${tableConfig.name}_${key}`"
    v-loading="loading"
    style="width: 100%"
    :data="tableConfig.data"
    border
    size="mini"
    :max-height="tableConfig.height || '500px'"
    :row-class-name="tableConfig.rowClassFunc || rowClassFunc"
    :cell-class-name="tableConfig.cellClassFunc"
    :default-sort="tableConfig.defaultSort"
    :cell-style="cellStyle"
    :row-style="rowStyle"
    row-key="id"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
  >
    <!-- 多选列 -->
    <el-table-column
      v-if="tableConfig.mutiSelect"
      type="selection"
      width="55"
      align="center"
    />
    <!-- 序号列 -->
    <el-table-column
      v-if="tableConfig.index"
      label=""
      type="index"
      width="30"
      align="center"
      fixed="left"
      :index="indexMethod"
    />
    <!-- 数据列 -->
    <template
      v-for="(column, columnIndex) in tableConfig.columns"
      :key="columnIndex"
    >
      <!-- v-if="column.visible === undefined ? true : column.visible" -->
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
  <div class="pagination">
    <el-pagination
      v-if="tableConfig.pagination"
      background
      :current-page="currentPage"
      :page-sizes="pageSizeList"
      :page-size="currentPageSize"
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
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from '@vue/runtime-core'
import Sortable from 'sortablejs'
import { deepClone } from '@/utils/util'

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
  },
  emits: ['selectChange', 'currentChange', 'sizeChange'],
  setup(props, { emit }) {
    const {
      proxy: { $moment },
    } = getCurrentInstance()
    const loading = ref(false)
    const key = ref(0)
    const currentPage = ref(1)
    const currentPageSize = ref(10)
    const total = ref(0)
    const queryParams = ref({})
    const multipleSelection = ref([])
    const selectedRow = ref([])
    const callbackFunc = ref(null)
    const tableConfig = reactive(props.tableConfig)

    // 获取表格数据
    const getTableData = (obj = {}, callback = () => {}) => {
      queryParams.value = deepClone(obj) // 请求参数备份
      loading.value = true
      key.value++ //避免表格更新出错
      return new Promise((resolve, reject) => {
        let params = deepClone(obj)
        if (tableConfig.pagination) {
          const pageObj = {}
          pageObj[tableConfig.pageField || 'current'] = currentPage.value
          pageObj[tableConfig.pageSizeField || 'size'] = currentPageSize.value
          params = Object.assign(params, pageObj)
        }
        tableConfig
          .method(params)
          .then((res) => {
            if (tableConfig.isSpecial) {
              callbackFunc.value = callback
              resolve(callback(res))
            } else {
              const data = res.data || {
                data: [
                  {
                    date: '1649662472313',
                    name: 'Tom',
                    isNew: 1,
                    address: 'No. 189, Grove St, Los Angeles',
                  },
                  {
                    date: '1649662472313',
                    name: 'Jerry',
                    isNew: 2,
                    address: 'No. 189, Grove St, Los Angeles',
                  },
                  {
                    date: '1649662472313',
                    name: 'Sam',
                    isNew: '',
                    address: 'No. 189, Grove St, Los Angeles',
                  },
                  {
                    date: '1649662472313',
                    name: 'Timi',
                    isNew: 2,
                    address: 'No. 189, Grove St, Los Angeles',
                  },
                ],
                total: 4,
                currentPage: 1,
              }
              if (tableConfig.pagination) {
                currentPage.value = Number(data.current)
                total.value = Number(data.total)
              }
              selectedRow.value = []
              callbackFunc.value = callback
              resolve(callback(data))
            }
            loading.value = false
          })
          .catch((err) => {
            reject(err)
            loading.value = false
          })
      })
    }
    // 计算属性处理时间格式
    const dateFormat = computed(() => (date, formatter) => {
      return $moment(Number(date)).format(formatter)
    })
    const pageSizeList = computed(
      () => tableConfig.pageSizeList || [1, 2, 50, 100]
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
      getTableData()
      emit('sizeChange', selectedRow.value)
    }
    const handleCurrentChange = (val) => {
      currentPage.value = val
      selectedRow.value = []
      getTableData()
      emit('currentChange', selectedRow.value)
    }
    const handleSelectionChange = (val) => {
      selectedRow.value = multipleSelection.value = val
      emit('selectChange', selectedRow.value)
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
      indexMethod,
      rowClassFunc,
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
