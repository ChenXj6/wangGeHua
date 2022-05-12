<template>
  <div>
    <!--工具栏-->
    <el-form :inline="true" :model="queryForm" :size="size">
      <el-form-item label="代码:">
        <el-input placeholder="请输入代码" v-model="queryForm.code" clearable></el-input>
      </el-form-item>
      <el-form-item label="代码名:">
        <el-input placeholder="请输入代码中文名" v-model="queryForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="使用状态:">
        <el-select v-model="queryForm.statusFlag" placeholder="--请选择--" clearable style="width: 100%">
          <el-option v-for="item in statusFlagOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="findPage" icon="el-icon-search" type="primary">查询</el-button>
        <el-button @click="handleAdd" icon="el-icon-circle-plus-outline" type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <!--表格树内容栏-->
    <div>
      <el-table :data="pageResult" ref="myTable" :max-height="900" :height="830" stripe border size="mini" row-key="id"
                :header-cell-style="{background:'rgba(227,227,227,0.5)',borderColor:'rgb(215,215,213)'}"
                style="width: 100%;border-color: rgb(215,215,213)">
        <!--      <el-table-column prop="id" header-align="center" align="center"  label="ID"></el-table-column>-->
        <table-tree-column prop="code" treeKey="id" header-align="center" align="center" label="代码"></table-tree-column>
        <el-table-column prop="name" header-align="center" align="center" label="代码名"></el-table-column>
        <el-table-column prop="statusFlag" header-align="center" align="center" label="状态"
                         :formatter="statusFormat"></el-table-column>
        <el-table-column prop="createdBy" header-align="center" align="center" label="创建者"></el-table-column>
        <el-table-column prop="createdTime" header-align="center" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="updatedBy" header-align="center" align="center" label="更新者"></el-table-column>
        <el-table-column prop="updatedTime" header-align="center" align="center" label="更新时间"></el-table-column>
        <el-table-column prop="parentName,parentCode" header-align="center" align="center" width="120" label="上级菜单">
          <template slot-scope="scope">
            {{scope.row.parentName}}({{scope.row.parentCode}})
          </template>
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="185" label="操作">
          <template slot-scope="scope">
            <el-button :size="size" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button :size="size" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页设置 -->
    <div style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.currentPage"
        :page-size="pageParams.pageSize"
        :page-sizes="pageParams.pageSizes"
        :layout="pageParams.layout"
        :total="pageParams.total"
        style="float:right;">
      </el-pagination>
    </div>

    <!-- 新增修改界面 -->
    <el-dialog :title="operation?'新增':'编辑'" width="35%" :visible.sync="dialogVisible"
               :close-on-click-modal="false">
      <el-form :model="dataForm" :rules="dataFormRules" ref="dataForm"
               label-width="80px" :size="size" style="text-align:left;">
        <el-form-item label="代码" prop="code">
          <el-input v-model="dataForm.code" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="代码名" prop="name">
          <el-input v-model="dataForm.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <popup-tree-input
            :data="popupTreeData" :props="popupTreeProps"
            :prop="dataForm.parentName==null||dataForm.parentName==''?'顶级菜单':dataForm.parentName+'('+dataForm.parentCode+')'"
            :nodeKey="''+dataForm.parentId" :currentChangeHandle="handleTreeSelectChange">
          </popup-tree-input>
        </el-form-item>
        <el-form-item label="状态" prop="statusFlag">
          <el-select v-model="dataForm.statusFlag" placeholder="--请选择--" style="width: 100%">
            <el-option v-for="item in statusFlagOptions"
                       :key="item.key"
                       :label="item.label"
                       :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size" @click="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" @click="submitForm()">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TableTreeColumn from "@/components/TableTreeColumn";
  import PopupTreeInput from "@/components/PopupTreeInput";

  export default {
    components: {
      PopupTreeInput,
      TableTreeColumn,
    },
    data() {
      return {
        tableH: 150,
        size: 'mini',
        loading: false,
        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        pageResult: [],
        queryForm: {
          id: '',
          code: '',
          name: '',
          statusFlag: ''
        },
        pageParams: {
          currentPage: 1,
          pageSize: 20,
          pageSizes: [10, 20, 50, 100, 200, 500],
          layout: "total,sizes,prev,pager,next,jumper",
          total: 0
        },
        dataFormRules: {
          // id: [
          //   { required: true, message: 'ID不能为空', trigger: 'blur' }
          // ],
          code: [
            {required: true, message: '代码不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '代码名不能为空', trigger: 'blur'}
          ],
          statusFlag: [
            {required: true, message: '请选择状态', trigger: 'blur'}
          ]
        },
        // 新增编辑界面数据
        dataForm: {
          code: '',
          name: '',
          parentId: 0,
          parentCode: 0,
          parentName: '',
          statusFlag: '',
          orderNum: 0,
          createdBy: '',
          createdTime: '',
          updatedBy: '',
          updatedTime: ''
        },
        statusFlagOptions: [{key: '0', label: "使用"}, {key: '1', label: "停用"}],

        popupTreeData: [],
        popupTreeProps: {
          label: "name",
          children: "children"
        }
      }
    },
    methods: {
      statusFormat(row) {
        if (row.statusFlag == 0) {
          return "使用";
        }
        if (row.statusFlag == 1) {
          return "停用";
        }
      },
      handleSizeChange(val) {
        this.pageParams.pageSize = val;
        this.findPage();
      },
      handleCurrentChange(val) {
        this.pageParams.currentPage = val;
        this.findPage();
      },
      // 菜单树选中
      handleTreeSelectChange(data, node) {
        // console.log("handleTreeSelectChange data=",data);
        this.dataForm.parentId = data.id;
        this.dataForm.parentCode = data.code;
        this.dataForm.parentName = data.name;
      },
      // 获取上级菜单树
      getParentMenuTree: function (tableTreeDdata) {
        let parent = {
          parentId: 0,
          parentCode: 0,
          name: "顶级菜单",
          children: tableTreeDdata
        };
        return [parent];
      },

      // 获取分页数据
      findPage: function () {
        this.pageResult = [];
        this.loading = true;
        if (this.queryForm.id == null || this.queryForm.id == '') {
          this.queryForm.id = '';
        }
        if (this.queryForm.code == null || this.queryForm.code == '') {
          this.queryForm.code = '';
        }
        if (this.queryForm.name == null || this.queryForm.name == '') {
          this.queryForm.name = '';
        }
        if (this.queryForm.statusFlag == null || this.queryForm.statusFlag == '') {
          this.queryForm.statusFlag = '';
        }

        this.$axios({
          url: '/gateway/sys/sysCode/getCode?currentPage=' + this.pageParams.currentPage + "&pageSize=" + this.pageParams.pageSize,
          method: 'post',
          data: this.queryForm
        }).then(res => {
          this.loading = false;
          //console.log("res.data=",res.data);

          this.pageParams.total = res.data.data.total;
          this.pageParams.currentPage = res.data.data.pageNum;
          this.pageResult = res.data.data.list;
          this.popupTreeData = this.getParentMenuTree(res.data.data.list);
        }).catch(error => {
          this.$message({type: 'warning', message: "请求错误，请稍后再试！"});
        });
      },

      // 删除
      handleDelete: function (row) {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          let params = this.getDeleteIds([], row);
          this.$axios({
            url: "/gateway/sys/sysCode/deleteCode",
            method: "post",
            data: params,
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({message: "操作成功", type: "success"});
            } else {
              this.$message({
                message: res.data.msg, type: "error"
              });
            }
            this.findPage();
          }).catch(error => {
            this.$message({type: 'warning', message: "删除错误！"});
          });
        });
      },
      // 获取删除的包含子菜单的id列表
      getDeleteIds(ids, row) {
        ids.push({id: row.id});
        if (row.children != null) {
          for (let i = 0, len = row.children.length; i < len; i++) {
            this.getDeleteIds(ids, row.children[i]);
          }
        }
        return ids;
      },

      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true;
        this.operation = true;
        this.dataForm.code = '';
        this.dataForm.name = '';
        this.dataForm.parentId = 0;
        this.dataForm.parentCode = 0;
        this.dataForm.parentName = '';
        this.dataForm.orderNum = 0;
        this.dataForm.statusFlag = '使用';
        this.dataForm.createdBy = JSON.parse(sessionStorage.getItem("user")).operatorId;
        this.dataForm.updatedBy = JSON.parse(sessionStorage.getItem("user")).operatorId;
        this.dataForm.updatedTime = '';
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.dialogVisible = true;
        this.operation = false;
        this.dataForm.id = params.id;
        this.dataForm.code = params.code;
        this.dataForm.name = params.name;
        this.dataForm.parentId = params.parentId;
        this.dataForm.parentCode = params.parentCode;
        this.dataForm.parentName = params.parentName;
        this.dataForm.statusFlag = params.statusFlag == 0 ? "使用" : "停用";
        this.dataForm.orderNum = params.orderNum;
        this.dataForm.createdBy = params.createdBy;
        this.dataForm.createdTime = params.createdTime;
      },

      // 新增/编辑操作提交
      submitForm: function () {
        if (this.dataForm.statusFlag == "使用") {
          this.dataForm.statusFlag = '0';
        }
        if (this.dataForm.statusFlag == "停用") {
          this.dataForm.statusFlag = '1';
        }
        console.log("this.dataForm=", this.dataForm);
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.editLoading = true;
              if (this.operation) {
                this.dataForm.createdBy = sessionStorage.getItem("operatorId");
                this.dataForm.createdTime = Date.now();
                this.dataForm.updatedTime = Date.now();
                this.$axios({
                  url: "/gateway/sys/sysCode/addCode",
                  method: "post",
                  data: this.dataForm,
                }).then((res) => {
                  // console.log("新增操作:",res.data);
                  this.editLoading = false;
                  if (res.data.code == 200) {
                    this.$message({message: "操作成功", type: "success"});
                    this.dialogVisible = false;
                    this.$refs["dataForm"].resetFields();
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                  this.findPage();
                });
              } else {

                this.dataForm.updatedBy = sessionStorage.getItem("operatorId");
                this.dataForm.updatedTime = Date.now();
                this.$axios({
                  url: "/gateway/sys/sysCode/updateCode",
                  method: "post",
                  data: this.dataForm,
                }).then((res) => {
                  // console.log("编辑操作:",res.data);
                  this.editLoading = false;
                  if (res.data.code == 200) {
                    this.$message({message: "操作成功", type: "success"});
                    this.dialogVisible = false;
                    this.$refs["dataForm"].resetFields();
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: "error",
                    });
                  }
                  this.findPage();
                });
              }
            });
          }
        });
      }
    },
    mounted() {
      //table高度随着浏览器窗口大小自适应
      this.$nextTick(function () {
        //150,预留高度
        this.tableH = window.innerHeight - this.$refs.myTable.$el.offsetTop - 150;
        // 监听窗口大小变化
        let self = this;
        window.onresize = function () {
          self.tableH = window.innerHeight - self.$refs.myTable.$el.offsetTop - 150;
        }
      });
      this.findPage();
    }
  }
</script>
