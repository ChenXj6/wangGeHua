<!--
  文件描述：
  创建时间：2022/4/6 10:54
  创建人：rxw
-->
<template>
  <div>
    <el-row>
      {{data.description}}
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-col style="text-align: left">
<!--        <el-button size="mini" type="warning" @click="editMain">修改主类型</el-button>-->
<!--        <el-button size="mini" type="danger" @click="deleteMain">删除主类型</el-button>-->
        <el-button size="mini" type="success" @click="addChild">添加子类型</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="data.list"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column
        fixed
        prop="sn"
        label="流水号"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="value"
        label="编码"
        align="center"
        header-align="center"
        >
      </el-table-column>
      <el-table-column
        fixed
        prop="basicTypeName"
        label="名称"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="description"
        label="描述"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="creator"
        label="创建人"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="company"
        label="公司名称"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="creatime"
        label="创建时间"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="delflag"
        label="禁用标志"
        align="center"
        header-align="center"
        :formatter="delFormatter"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="editChild(scope.row)"
          >编辑</el-button>
<!--          <el-button-->
<!--            type="text"-->
<!--            size="mini"-->
<!--            @click="deleteChild(scope.row)"-->
<!--          >删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'

export default {
  name: 'DictTable',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    // 这里存放数据
    return {


    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    editMain() {
      this.$emit('editMain',this.data)
    },
    addChild() {
      this.$emit('addChild',this.data)
    },
    editChild(data) {
      this.$emit('editChild',data)
    },
    deleteMain() {
      this.$emit('deleteMain',this.data)
    },
    deleteChild(data) {
      this.$emit('deleteChild',data)
    },
    delFormatter(row,col) {
      return row[col.property] == '0' ? '可用' : '禁用'
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {
  }, // 生命周期 - 创建之前
  beforeMount() {
  }, // 生命周期 - 挂载之前
  beforeUpdate() {
  }, // 生命周期 - 更新之前
  updated() {
  }, // 生命周期 - 更新之后
  beforeDestroy() {
  }, // 生命周期 - 销毁之前
  destroyed() {
  }, // 生命周期 - 销毁完成
  activated() {
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped lang="scss">
//@import url(); 引入公共css类
</style>
