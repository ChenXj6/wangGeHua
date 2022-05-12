<template>
  <div>
    <!--工具栏-->
    <el-form :inline="true" :model="queryForm" :size="size">
      <el-form-item>
        <el-input v-model="queryForm.operatorId" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="queryForm.operatorName"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <tbl-button
          @click="findPage()"
          icon="fa fa-search"
          label="查询"
          type="primary"
        />
      </el-form-item>
      <el-form-item>
        <tbl-button
          @click="handleAdd"
          icon="fa fa-plus"
          label="新增"
          type="primary"
        />
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="pageResult.list"
        :max-height="900"
        :height="830"
        :size="size"
        :show-overflow-tooltip="false"
        :header-cell-style="{
          background: 'rgba(227,227,227,0.5)',
          borderColor: 'rgb(215,215,213)',
        }"
        :cell-style="{ borderColor: 'rgba(234,233,228,1)' }"
        :align="align"
        :strip="strip"
        style="width: 100%"
        :highlight-current-row="true"
      >
        <el-table-column
          prop="id"
          label="ID"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="operatorId"
          label="账号"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="operatorName"
          label="姓名"
          header-align="center"
          align="center"
        />
        <el-table-column
          prop="roleId"
          label="角色"
          header-align="center"
          align="center"
          :formatter="roleFmt"
        />
        <!--        <el-table-column prop="status" label="状态" header-align="center" align="center"/>-->
        <el-table-column
          prop="createTime"
          label="创建时间"
          header-align="center"
          align="center"
          :formatter="dateFormat"
        />
        <el-table-column
          label="操作"
          header-align="center"
          align="left"
          width="360px"
        >
          <template #scope>
            <el-button
              :size="size"
              type="success"
              plain
              @click="editUser(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              :size="size"
              type="danger"
              plain
              @click="deleteUser(scope.row)"
            >
              删除
            </el-button>
            <el-button
              :size="size"
              type="success"
              plain
              @click="resetPassword(scope.row)"
            >
              密码重置
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="toolbar" style="padding: 10px">
        <el-pagination
          layout="total, sizes,prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          :total="pageResult.total"
          style="float: right"
        >
        </el-pagination>
      </div>
    </div>

    <!--新增编辑界面-->
    <el-dialog
      :close-on-click-modal="false"
      :title="operation ? '新增' : '编辑'"
      :visible="dialogVisible"
      width="30%"
    >
      <el-form
        :model="dataForm"
        :rules="dataFormRules"
        :size="size"
        label-position="right"
        label-width="80px"
        ref="dataForm"
      >
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input
            :disabled="true"
            auto-complete="off"
            v-model="dataForm.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="operatorId">
          <el-input
            v-model="dataForm.operatorId"
            auto-complete="off"
            :disabled="editOperatorId"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="operatorName">
          <el-input
            v-model="dataForm.operatorName"
            auto-complete="off"
            :disabled="editOperatorName"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-select
            v-model="dataForm.deptId"
            placeholder="请选择"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in deptIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="dataForm.roleId"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option
              v-for="item in this.roleIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :size="size" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button
            :loading="editLoading"
            :size="size"
            @click="submitForm"
            type="primary"
            >提交</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import KtTable from '@/components/UserTable'
import TblButton from '@/components/TblButton/src'
import PopupTreeInput from '@/components/PopupTreeInput'
import { format } from '@/utils/datetime'

export default {
  name: 'User',
  components: {
    KtTable,
    TblButton,
    PopupTreeInput,
  },
  data() {
    return {
      showDialog: false,
      url: 'http://bim.datafujian.com/xy_measure/share/d18d3d40ef4949778efd04d53a4411d9/7657',
      size: 'mini',
      pageNum: 1,
      pageSize: 10,
      pageResult: {},
      strip: 'true',
      align: 'left',
      editOperatorId: false,
      editOperatorName: false,
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        operatorId: [
          { required: true, message: '请输入用户登录账号', trigger: 'blur' },
        ],
        operatorName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
        ],
        deptId: [
          { required: true, message: '请选择所在部门', trigger: 'change' },
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
      },
      queryForm: {
        operatorId: '',
        operatorName: '',
      },
      // 新增编辑界面数据
      dataForm: {
        id: 0,
        operatorId: '',
        operatorName: '',
        deptId: '',
        deptName: '',
        roleId: '',
        roleName: '',
        email: '',
        mobile: '',
        status: 1,
      },
      roleIdOptions: [],
      roleIdShow: {},
      deptIdOptions: [],
      deptIdShow: {},
    }
  },
  methods: {
    // 获取分页数据
    findPage: function () {
      this.$axios({
        url: '/gateway/sys/user/findPage',
        method: 'post',
        data: {
          num: this.pageNum,
          size: this.pageSize,
          operatorId: this.queryForm.operatorId,
          operatorName: this.queryForm.operatorName,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.pageResult = res.data.data
            console.log('查询数据', this.pageResult)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // 删除
    deleteUser: function (row) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios({
            url: '/gateway/sys/user/delete',
            method: 'post',
            data: row,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({ message: '操作成功', type: 'success' })
            } else {
              this.$message({
                message: '操作失败, ' + res.data.msg,
                type: 'error',
              })
            }
            this.findPage(null)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    //重置操作员登录密码
    resetPassword: function (row) {
      this.$confirm('确认重置' + row.operatorId + '密码？', '提示', {
        type: 'warning',
      }).then(() => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        console.log(
          '操作员' +
            user.operatorId +
            '对' +
            row.operatorId +
            '进行密码更新操作'
        )
        this.$axios({
          url: '/gateway/sys/user/resetPassword',
          method: 'post',
          data: {
            operatorId: row.operatorId,
            lastUpdateBy: user.operatorId,
          },
        }).then((res) => {
          if (res.data.code == '200') {
            this.$message({
              message: '密码重置成功',
              type: 'success',
            })
          } else {
            this.$message({
              message: '操作失败, ' + res.data.msg,
              type: 'error',
            })
          }
        })
      })
    },
    // 显示新增界面
    handleAdd: function () {
      this.dialogVisible = true
      this.operation = true
      this.editOperatorId = false
      this.editOperatorName = false
      this.dataForm = {
        id: 0,
        operatorId: '',
        operatorName: '',
        password: '',
        sex: '',
        deptId: '',
        deptName: '',
        email: 'test@qq.com',
        mobile: '',
        qqNum: '',
        status: 1,
      }
    },
    // 显示编辑界面
    editUser: function (row) {
      this.dialogVisible = true
      this.operation = false
      this.dataForm = {
        operatorId: row.operatorId,
        operatorName: row.operatorName,
        deptId: row.deptId,
        deptName: '',
        email: row.email,
        mobile: row.mobile,
        qqNum: row.qqNum,
        roleId: row.roleId,
        status: row.status,
      }
      this.editOperatorId = true
      this.editOperatorName = true
    },

    // 编辑
    submitForm: function () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let user = JSON.parse(sessionStorage.getItem('user'))
            let params = Object.assign({}, this.dataForm)
            console.log('参数', params)
            // let userRoles = [];
            // for (let i = 0, len = params.userRoles.length; i < len; i++) {
            //   let userRole = {
            //     userId: params.id,
            //     roleId: params.userRoles[i],
            //   };
            //   userRoles.push(userRole);
            // }
            // params.userRoles = userRoles;
            this.$axios({
              url: '/gateway/sys/user/save',
              method: 'post',
              data: params,
            }).then((res) => {
              this.editLoading = false
              if (res.data.code == 200) {
                this.$message({ message: '操作成功', type: 'success' })
                this.dialogVisible = false
                this.$refs['dataForm'].resetFields()
              } else {
                this.$message({
                  message: '操作失败, ' + res.data.msg,
                  type: 'error',
                })
              }
              this.findPage(null)
            })
          })
        }
      })
    },

    // 菜单树选中
    deptTreeCurrentChangeHandle(data, node) {
      this.dataForm.deptId = data.id
      this.dataForm.deptName = data.name
    },
    roleFmt(row, column) {
      let role = this.roleIdOptions.filter(
        (r) => r.value == row[column.property]
      )
      return role[0].label
    },
    // 时间格式化
    dateFormat: function (row, column, cellValue, index) {
      return format(row[column.property])
    },

    handleSizeChange: function (val) {
      this.pageSize = val
      this.findPage()
    },
    handleCurrentChange: function (val) {
      this.pageNum = val
      this.findPage()
    },
    //获取角色信息
    findRoleInfo: function () {
      console.log('页面加载...获取角色信息!')
      let roleIdShow = {}
      let roleIdOptions = []
      this.$axios({
        url: '/gateway/sys/role/findAllRole',
        method: 'post',
      })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res)
            let list = res.data.data
            list.forEach(function (item) {
              roleIdShow[item.id + ''] = item.name
            })
            list.forEach(function (item) {
              roleIdOptions.push({
                label: item.name,
                value: item.id + '',
              })
            })
            this.roleIdOptions = roleIdOptions
            this.roleIdShow = roleIdShow
          }
        })
        .catch((error) => {
          console.log('获取角色信息失败,' + error)
        })
    },

    //获取角色信息
    findDeptInfo: function () {
      console.log('页面加载...获取部门信息!')
      let deptIdShow = {}
      let deptIdOptions = []
      this.$axios({
        url: '/gateway/sys/dept/findAllDept',
        method: 'post',
      })
        .then((res) => {
          if (res.data.code == 200) {
            let list = res.data.data
            list.forEach(function (item) {
              deptIdShow[item.nm] = item.orgname
            })
            list.forEach(function (item) {
              deptIdOptions.push({
                label: item.orgname,
                value: item.nm,
              })
            })
            console.log('deptIdOptions', deptIdOptions)
            this.deptIdOptions = deptIdOptions
            this.deptIdShow = deptIdShow
          }
        })
        .catch((error) => {
          console.log('获取角色信息失败,' + error)
        })
    },
    show: function () {
      this.showDialog = true
    },
  },
  created() {
    this.findRoleInfo()
    this.findDeptInfo()
    this.findPage()
  },
  mounted() {},
}
</script>

<style scoped></style>
