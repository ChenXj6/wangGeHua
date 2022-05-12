<template>
  <div>
    <!--工具栏-->
    <el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
        <el-input placeholder="角色名" v-model="filters.name"></el-input>
      </el-form-item>
      <el-form-item>
        <tbl-button @click="findPage(null)" icon="fa fa-search" label="查询" perms="sys:role:view" type="primary"/>
      </el-form-item>
      <el-form-item>
        <tbl-button @click="handleAdd" icon="fa fa-plus" label="新增" perms="sys:role:add" type="primary" />
      </el-form-item>
    </el-form>
    <!--表格内容栏-->
    <kt-table :columns="columns" :data="pageResult" :highlightCurrentRow="true" :showBatchDelete="false" :reservedHeight="reservedHeight"
              :stripe="true" :border="true" @findPage="findPage" @handleCurrentChange="handleRoleSelectChange" @handleDelete="handleDelete"
              @handleEdit="handleEdit" permsDelete="sys:role:delete" permsEdit="sys:role:edit">
    </kt-table>
    <!-- </el-col> -->
    <!--新增编辑界面-->
    <el-dialog :close-on-click-modal="false" :title="operation?'新增':'编辑'" :visible.sync="dialogVisible" width="40%">
      <el-form :model="dataForm" :rules="dataFormRules" :size="size" label-width="80px" ref="dataForm">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input :disabled="true" auto-complete="off" v-model="dataForm.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="name">
          <el-input auto-complete="off" v-model="dataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注 " prop="remark">
          <el-input auto-complete="off" type="textarea" v-model="dataForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
        <el-button :loading="editLoading" :size="size" @click.native="submitForm" type="primary">提交</el-button>
      </div>
    </el-dialog>

    <!--角色菜单，表格树内容栏-->
    <div :v-if="true">
      <div class="menu-header">
        <span><B>角色菜单授权</B></span>
      </div>
      <el-tree :check-strictly="true" :data="menuData" :props="defaultProps" :render-content="renderContent" @check-change="handleMenuCheckChange"
               element-loading-text="拼命加载中" node-key="id" ref="menuTree"
               show-checkbox :size="size" style="width: 100%;padding-top:10px;"
               v-loading="menuLoading">
      </el-tree>
      <div style="float:left;padding-left:24px;padding-top:12px;padding-bottom:4px;">
        <el-checkbox :disabled="this.selectRole.id == null" @change="handleCheckAll" v-model="checkAll"><b>全选</b></el-checkbox>
      </div>
      <div style="float:right;padding-right:24px;padding-top:4px;padding-bottom:4px;">
        <tbl-button :disabled="this.selectRole.id != null" @click="resetSelection" label="重置" perms="sys:role:edit"
                    type="primary"/>
        <tbl-button :disabled="this.selectRole.id != null" :loading="authLoading" @click="submitAuthForm" label="提交"
                    perms="sys:role:edit" type="primary"/>
      </div>
    </div>
  </div>
</template>

<script>
import KtTable from "@/components/KtTable"
import TblButton from "@/components/TblButton/src"
import TableTreeColumn from '@/components/TableTreeColumn'
import { format } from "@/utils/datetime"
export default {
	components:{
		KtTable,
		TblButton,
		TableTreeColumn
	},
	data() {
		return {
      reservedHeight:320, //kttable预留高度
			size: 'small',
			filters: {
				name: ''
			},
			columns: [
				{prop:"id", label:"ID", minWidth:50},
				{prop:"name", label:"角色名", minWidth:120},
				{prop:"remark", label:"备注", minWidth:120},
				{prop:"createBy", label:"创建人", minWidth:120},
				{prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
				// {prop:"lastUpdateBy", label:"更新人", minWidth:100},
				// {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			dialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: '请输入角色名', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: 0,
				name: '',
				remark: ''
			},
			selectRole: {},
			menuData: [],
			menuSelections: [],
			menuLoading: false,
			authLoading: false,
			checkAll: false,
			currentRoleMenus: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			}
		}
	},
	methods: {
		// 获取分页数据
		findPage: function (data) {
      this.pageResult = {};
		 if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.columnFilters = {
        name: { name: "name", value: this.filters.name },
      };
      // this.$api.role.findPage(this.pageRequest).then((res) => {
      // 	this.pageResult = res.data
      // 	this.findTreeData()
      // }).then(data!=null?data.callback:'')
      this.$axios({
        url: "/gateway/sys/role/findPage",
        method: "post",
        data: this.pageRequest,
      }).then((res) => {
        console.log('返回值',res)
        this.pageResult = res.data.data;
        console.log('返回数据',this.pageResult)
        this.findTreeData();
      }).then(
          data != null ? data.callback : ""
      ).catch(error => {
        if(data!=null){data.callback();}
        this.$message({type: 'warning',message: "请求错误，请稍后再试！"});
      });
		},
		// 批量删除
		handleDelete: function (data) {
	    this.$axios({
        url: "/gateway/sys/role/delete",
        method: "post",
        data: data.params,
      }).then(data.callback);
		},
		// 显示新增界面
		handleAdd: function () {
      console.log('新增')
			this.dialogVisible = true;
			this.operation = true;
			this.dataForm = {
				id: 0,
				name: '',
				remark: ''
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.dialogVisible = true;
			this.operation = false;
			this.dataForm = Object.assign({}, params.row)
		},
		// 编辑
		submitForm: function () {
		 this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            params.createBy = sessionStorage.getItem('userid');
            if (this.operation) {
              console.log("新增操作");
              this.$axios({
                url: "/gateway/sys/role/save",
                method: "post",
                data: params,
              }).then((res) => {
                this.editLoading = false;
                if (res.data.code == 200) {
                  this.$message({ message: "操作成功", type: "success" });
                  this.dialogVisible = false;
                  this.$refs["dataForm"].resetFields();
                } else {
                  this.$message({
                    message: "操作失败, " + res.data.msg,
                    type: "error",
                  });
                }
                this.findPage(null);
              });
            } else {
              console.log("编辑操作",params);
              this.$axios({
                url: "/gateway/sys/role/update",
                method: "post",
                data: params,
              }).then((res) => {
                this.editLoading = false;
                if (res.data.code == 200) {
                  this.$message({ message: "操作成功", type: "success" });
                  this.dialogVisible = false;
                  this.$refs["dataForm"].resetFields();
                  console.log('dataForm',this.dataForm)
                  this.findPage(null)
                } else {
                  this.$message({
                    message: "操作失败, " + res.data.msg,
                    type: "error",
                  });
                }
              });
            }
          });
        }
      });
		},
		// 获取数据
		findTreeData: function () {
			this.menuLoading = true;
      this.menuData = [];
    let name = JSON.parse(sessionStorage.getItem("user")).operatorId;
      let sysUser = {
        name: name,
      };
      this.$axios({
        url: "/gateway/sys/menu/findNavTree",
        method: "post",
        data: sysUser,
      }).then((res) => {
        console.log(res);
        this.menuData = res.data.data;
        this.menuLoading = false;
      });
		},
		// 角色选择改变监听
		handleRoleSelectChange(val) {
      this.selectRole = val.val
			if(val == null || val.val == null) {
        this.selectRole =  {}
				return
			}
    let role = {
        id: val.val.id,
      };
      this.$axios({
        url: "/gateway/sys/role/findRoleMenus",
        method: "post",
        data: role,
      }).then((res) => {
        this.currentRoleMenus = res.data.data;
        this.$refs.menuTree.setCheckedNodes(res.data.data);
      });
		},
		// 树节点选择监听
		handleMenuCheckChange(data, check, subCheck) {
		  console.log("data=",data);
		  console.log("check",check);
		  console.log("subCheck",subCheck);
			if(check) {
				// 节点选中时同步选中父节点
        subCheck = true;
				let parentId = data.parentId;
				this.$refs.menuTree.setChecked(parentId, true, false);
        // 父节点选中时同步选中子节点
        if(data.children != null) {
          data.children.forEach(element => {
            this.$refs.menuTree.setChecked(element.id, true, false)
          });
        }
			} else {
				// 节点取消选中时同步取消选中子节点
				if(data.children != null) {
					data.children.forEach(element => {
						this.$refs.menuTree.setChecked(element.id, false, false)
					});
				}
			}
		},
		// 重置选择
		resetSelection() {
			this.checkAll = false;
			this.$refs.menuTree.setCheckedNodes(this.currentRoleMenus)
		},
		// 全选操作
		handleCheckAll() {
			if(this.checkAll) {
				let allMenus = [];
				this.checkAllMenu(this.menuData, allMenus);
				this.$refs.menuTree.setCheckedNodes(allMenus);
			} else {
				this.$refs.menuTree.setCheckedNodes([]);
			}
		},
		// 递归全选
		checkAllMenu(menuData, allMenus) {
			menuData.forEach(menu => {
				allMenus.push(menu);
				if(menu.children) {
					this.checkAllMenu(menu.children, allMenus);
				}
			});
		},
		// 角色菜单授权提交
		submitAuthForm() {
		  let roleId = this.selectRole.id;
		  if(roleId==null){
		    this.$message({
          message: "请先选择授权角色",
          type: "warning"
        });
		    return;
      }
		  if ("admin" == this.selectRole.name) {
		    this.$message({
          message: "超级管理员拥有所有菜单权限，不允许修改！",
          type: "error",
        });
        return;
      }
		  this.authLoading = true;
		  let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true);
		  let roleMenus = [];
		  for (let i = 0, len = checkedNodes.length; i < len; i++) {
		    let roleMenu = { roleId: roleId, menuId: checkedNodes[i].id };
		    roleMenus.push(roleMenu);
		  }
      this.$axios({
        url: "/gateway/sys/role/saveRoleMenus",
        method: "post",
        data: roleMenus,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$message({ message: "操作成功", type: "success" });
        } else {
          this.$message({
            message: "操作失败, " + res.data.msg,
            type: "error",
          });
        }
        this.authLoading = false;
      });
		},

		renderContent(h, { node, data, store }) {
			return (
			<div class="column-container">
				<span style="text-algin:center;display:inline-block; width: 300px;">{data.name}</span>
				<span style="text-algin:center;margin-right:80px;">
					<el-tag type={data.type === 0?'':data.type === 1?'success':'info'} size="small">
						{data.type === 0?'目录':data.type === 1?'菜单':'按钮'}
					</el-tag>
				</span>
				<span style="text-algin:center;margin-right:80px;"> <i class={data.icon}></i></span>
				<span style="text-algin:center;margin-right:80px;">{data.parentName?data.parentName:'顶级菜单'}</span>
				<span style="text-algin:center;margin-right:80px;">{data.url?data.url:'\t'}</span>
			</div>);
      	},
		// 时间格式化
    dateFormat: function (row, column, cellValue, index){
		  return format(row[column.property])
		}

	},
	mounted() {
	}
}
</script>
<style scoped>
.menu-header {
	padding-left: 8px;
	padding-bottom: 5px;
	text-align: left;
	font-size: 16px;
	color: rgb(20, 89, 121);

}
</style>
