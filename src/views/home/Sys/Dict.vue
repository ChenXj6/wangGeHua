<!--
  文件描述：
  创建时间：2022/4/6 9:52
  创建人：rxw
-->
<template>
  <div>
    <el-row style="margin-top: 13px">
      <el-col align="left" :push="1">
        <el-button size="mini" type="success" @click="addMain">添加主类型</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col>
        <el-tabs tab-position="left" :data="dits">
          <el-tab-pane
            v-for="item in dits"
            :label="item.description"
            :key="item.sn"
          >
            <DictTable :data="item" @editMain="edit" @addChild="addChild" @editChild="edit" @deleteMain="deleteDict" @deleteChild="deleteDict"></DictTable>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog title="编辑" :visible.sync="editVisible">
      <el-form :model="editForm" size="mini" label-width="200px" :rules="formRules" ref="addForm">
        <el-form-item label="基本类型">
          <el-input v-model="editForm.basicType" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editForm.basicTypeName" disabled></el-input>
        </el-form-item>
        <el-form-item label="编码值" prop="value">
          <el-input v-model="editForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="editForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="editForm.creator" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人公司">
          <el-input v-model="editForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-radio-group v-model="editForm.delflag">
            <el-radio :label="0">可用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDict">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addVisible">
      <el-form :model="addForm" label-width="120px" size="mini" :rules="formRules" ref="addForm">
        <el-form-item label="基本类型">
          <el-input v-model="addForm.basicType" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="addForm.basicTypeName" disabled></el-input>
        </el-form-item>
        <el-form-item label="编码值" prop="value">
          <el-input v-model="addForm.value" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="addForm.creator" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建人公司">
          <el-input v-model="addForm.creator" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用">
          <el-radio-group v-model="addForm.delflag">
            <el-radio :label="0">可用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addVisible = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 例如：import uploadFile from '@/components/uploadFile/uploadFile'
import DictTable from "./DictTable";
import {dicts,post} from "@/api/baseInfo"
export default {
  name: 'Dict',
  // import引入的组件需要注入到对象中才能使用
  components: {
    DictTable
  },
  props: {
    // patientIn: {
    //   type: Object,
    //   default () {
    //     return {}
    //   }
    // }
  },
  data() {
    // 这里存放数据
    return {
      availables: [
        {
          lable: '可用',
          value: 0
        },
        {
          lable: '不可用',
          value: 1

        }
      ],
      editVisible: false,
      addVisible: false,
      editForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      addForm: {

      },
      formRules:{
        value: [
          { required: true, message: '请输入编码值', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请填写描述', trigger: 'change' }
        ]
      },
      dits:[]

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    addMain() {
      this.addForm.basicType = '0000'
      this.addForm.basicTypeName = '类型列表'
      this.addVisible = true
    },
    edit(data) {
      console.log("子类型传的数据",data)
      this.editForm = data
      this.editVisible = true
    },
    editDict() {
      this.editVisible = false
      post('/staff/tjg/basic/dict/update/',this.editForm).then(res => {
        if(res.data.resCode == '000000') {
          this.queryDict()
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    addChild(data) {
      this.addForm.basicType = data.value
      this.addForm.basicTypeName = data.description
      this.addVisible = true
    },
    deleteDict(data) {
      this.$confirm('此操作将永久该字典, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    queryDict() {
      post('/staff/tjg/basic/dict/query',{}).then(res => {
        console.log(res)
        if(res.data.resCode == '000000') {
          this.dits = res.data.data;
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.queryDict()
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
