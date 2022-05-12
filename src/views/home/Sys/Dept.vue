<template>
  <div>
    <!--工具栏-->
    <el-form :inline="true" :model="queryForm" :size="size">
      <el-form-item>
        <el-input v-model="queryForm.deptId" placeholder="组织号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryForm.deptName" placeholder="组织名称"></el-input>
      </el-form-item>
      <el-form-item>
        <tbl-button @click="findPage" icon="fa fa-search" label="查询" type="primary"/>
      </el-form-item>
      <el-form-item>
        <tbl-button icon="fa fa-plus" label="新增" perms="sys:dept:add" type="primary" @click="handleAdd"/>
      </el-form-item>
    </el-form>
    <!--表格树内容栏-->
    <div>
      <el-table :data="pageResult.list" :max-height="900" :size="size" :show-overflow-tooltip="false"
                :header-cell-style="{background:'rgba(227,227,227,0.5)',borderColor:'rgb(215,215,213)'}"
                :cell-style="{borderColor:'rgba(234,233,228,1)'}"
                :align="align" :strip="strip" style="width:100%;" :highlight-current-row="true">
        <el-table-column prop="deptId" label="组织ID" header-align="center" align="center"/>
        <el-table-column prop="deptName" label="组织名称" header-align="center" align="center"/>
        <el-table-column label="操作" header-align="center" align="left" width="200px">
          <template slot-scope="scope">
            <el-button :size="size" type="success" plain
                       @click="editDept(scope.row)"
            >
              编辑
            </el-button>
            <el-button :size="size" type="danger" plain
                       @click="deleteDept(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="toolbar" style="padding:10px;">
        <el-pagination layout="total, sizes,prev, pager, next, jumper"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       :current-page="pageNum"
                       :page-sizes=[10,20,50]
                       :page-size="pageSize"
                       :total="pageResult.total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改界面 -->
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" width="40%" :visible.sync="dialogVisible"
               :close-on-click-modal="false">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submitForm()"
               label-width="80px" :size="size" style="text-align:left;">
        <el-form-item label="部门ID" prop="deptId">
          <el-input v-model="dataForm.deptId" placeholder="部门ID" :disabled="editDeptId"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="dataForm.deptName" placeholder="部门名称"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" @click="submitForm()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TblButton from "@/components/TblButton/src"
  import {format} from "@/utils/datetime"

  export default {
    components: {
      TblButton,
    },
    data() {
      return {
        tableH: 150,
        size: 'mini',
        strip: 'false',
        align: 'left',
        loading: false,
        editDeptId: false,
        pageNum: 1,
        pageSize: 10,
        pageResult: [],
        queryForm: {
          deptId: '',
          deptName: ''
        },
        dialogVisible: false,
        dataForm: {
          id: 0,
          deptId: '',
          deptName: '',

        },
        dataRule: {
          deptId: [
            {required: true, message: '请输入部门ID', trigger: 'change'}
          ],
          deptName: [
            {required: true, message: '请输入部门名称', trigger: 'change'}
          ]
        },
      }
    },
    methods: {
      // 获取数据
      findPage: function () {
        this.$axios({
          url: '/gateway/sys/dept/findPage',
          method: 'post',
          data: {
            num: this.pageNum,
            size: this.pageSize,
            deptId: this.queryForm.deptId,
            deptName: this.queryForm.deptName
          }
        }).then(res => {
          if (res.data.code == 200) {
            console.log(res);
            this.pageResult = res.data.data;
          }
        }).catch(error => {
          console.log(error);
        })
      },
      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true;
        this.editDeptId = false;
        this.dataForm = {
          id: 0,
          deptId: '',
          deptName: '',
          createBy: '',
          lastUpdateBy: '',
        }
      },
      // 显示编辑界面
      editDept: function (row) {
        this.dataForm=row;
        this.dialogVisible = true;
        this.editDeptId = true;
      },
      // 删除
      deleteDept(row) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {

          this.$axios({
            url: '/gateway/sys/dept/delete',
            method: 'post',
            data: {
              deptId:row.deptId,
            }
          }).then(res => {
            if(res.data.code=='200'){
              this.findPage();
              this.$message({message: '删除成功', type: 'success'})
            }else {
              this.$message({message: res.data.msg, type: 'error'})
            }

          })
        })
      },

      // 表单提交
      submitForm() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let params = Object.assign({}, this.dataForm);
              params.lastUpdateBy = JSON.parse(sessionStorage.getItem("user")).operatorId;
              this.$axios({
                url: '/gateway/sys/dept/save',
                method: 'post',
                data: params
              }).then((res) => {
                this.editLoading = false;
                if (res.data.code == 200) {
                  this.$message({message: '操作成功', type: 'success'});
                  this.dialogVisible = false;
                  this.$refs['dataForm'].resetFields()
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.findPage();
              });
              this.findPage();
            })
          }
        })
      },
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.findPage();
      },
      handleCurrentChange: function (val) {
        this.pageNum = val;
        this.findPage();
      },

    },
    mounted() {
      this.findPage();
    }
  }
</script>

<style scoped>

</style>
