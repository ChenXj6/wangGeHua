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
  onMounted,
  reactive,
  ref,
} from '@vue/runtime-core'
import Sortable from 'sortablejs'

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
  setup(props) {
    const {
      proxy: { $moment },
    } = getCurrentInstance()
    const loading = ref(false)
    const currentPage = ref(1)
    const currentPageSize = ref(10)
    const total = ref(4)
    const tableConfig = reactive(props.tableConfig)
    total.value = tableConfig.data.length

    const dateFormat = computed(() => (date, formatter) => {
      return $moment(Number(date)).format(formatter)
    })

    // 拖拽
    const rowDrop = () => {
      if (!tableConfig.isSortable) return
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex, '/////')
        },
      })
    }
    onMounted(() => {
      document.body.ondrag = function (e) {
        e.preventDefault()
        e.stopPropagation()
      }
      rowDrop()
    })
    return {
      loading,
      currentPage,
      currentPageSize,
      total,
      tableConfig,
      dateFormat,
    }
  },
})
</script>
