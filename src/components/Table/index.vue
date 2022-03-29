<template>
  <el-table
    :ref="tableConfig.name"
    :key="`${tableConfig.name}_${key}`"
    v-loading="loading"
    class="table__wrapper__content"
    style="width: 100%"
    :data="tableConfig.data"
    border
    :max-height="tableConfig.height || '500px'"
    :row-class-name="tableConfig.rowClassFunc || rowClassFunc"
    :cell-class-name="tableConfig.cellClassFunc"
    :default-sort="tableConfig.defaultSort"
    :cell-style="cellStyle"
    :row-style="rowStyle"
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
      label="序号"
      type="index"
      width="50"
      align="center"
      :index="indexMethod"
    />
    <!-- 数据列 -->
    <template v-for="(column, columnIndex) in tableConfig.columns">
      <el-table-column
        v-if="column.visible === undefined ? true : column.visible"
        :key="columnIndex"
        :prop="column.prop"
        :label="column.label"
        :align="column.align ? column.align : 'center'"
        :width="column.width"
        :fixed="column.fixed"
        :show-overflow-tooltip="column.tooltip"
        :min-width="column.minWidth"
        :sortable="column.sortable"
      >
        <template #default="scope">
          <template v-if="column.headerRender">
            <expand-dom
              :column="column"
              :row="scope.row"
              :render="column.headerRender"
              :index="columnIndex"
              :table-data="tableConfig.data"
            />
          </template>
          <template v-else>{{ column.label }}</template>
        </template>
        <!-- 多级表头 -->
        <template v-if="column.children && column.children.length > 0">
          <columns :column="column" />
        </template>
        <!-- 表体 -->
        <template #scope>
          <template v-if="!column.render">
            <!-- 自定义formatter列 -->
            <template v-if="column.formatter">
              <span v-html="column.formatter(scope.row, column)" />
            </template>
            <!-- 数据比对 -->
            <template v-if="column.contrast">
              <span
                :style="{ color: column.contrast(scope.row, column, true) }"
                >{{ column.contrast(scope.row, column) }}</span
              >
            </template>
            <!-- 普通列表 -->
            <template v-else>
              <span>{{ scope.row[column.prop] }}</span>
            </template>
          </template>
          <!-- 自定义render列 -->
          <template v-else>
            <expand-dom
              :column="column"
              :row="scope.row"
              :render="column.render"
              :index="columnIndex"
              :table-data="tableConfig.data"
            />
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
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
</template>
<script>
export default {
  name: 'VTable',
  components: {
    expandDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      /**
       * @param {Function} h - 原生创建dom元素的方法
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        }
        if (ctx.props.column) {
          params.column = ctx.props.column
        }
        return ctx.props.render(h, params)
      },
    },
    Columns,
  },
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
  data() {
    return {
      loading: false,
      currentPage: 1, // 当前页
      currentPageSize: 10, // 当前页个数
      total: 0, // 总条数
    }
  },
}
</script>
