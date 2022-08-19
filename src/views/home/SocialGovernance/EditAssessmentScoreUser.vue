<template>
    <div class="edit-content">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="cascades"></i>
                    {{ route.query.operation == 1 ? '查看' : ( route.query.operation == 2 ? '编辑' : '添加' ) }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom: 20px">
            <hr />
        </div>
        <VForm :key="timer" :isDisabled="route.query.operation == 1" :form-data="InfoFormConfig" :form-model="dataForm"
            :form-handle="route.query.operation != 1 ? formHandle : {}">
            <template v-slot:status>
        <popup-tree-input
          :data="popupTreeData"
          :propa="popupTreeProps"
          :nodeKey="'' + dataForm.officeCode"
          @update:dataForm="handleTreeSelectChange"
        >
          <template v-slot>
            <el-input
              v-model="dataForm.officeName"
              size="small"
              :readonly="true"
              placeholder="点击选择机构"
              style="cursor: pointer"
            ></el-input>
          </template>
        </popup-tree-input>
      </template>
        </VForm>
        <el-row v-if="route.query.operation == 1">
            <div class="btn-box">
                <el-button type="primary" @click="handleBack" size="small" icon="back">返回</el-button>
            </div>
        </el-row>
    </div>
</template>
<script>
    import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from '@vue/runtime-core'
    import { useRoute } from 'vue-router'
    import WangEditor from "wangEditor";
    import mixin from '@/mixins/tagView.js'

    import { renderTable } from './common/editAssessmentScoreUser'
    import { updateAssessmentScoreUser } from '@/api/SocialGovernance/AssessmentScoreUser'
    import { getOrganList, getSmallOrganList } from '@/api/sys/organ'
    import { isNull } from '@/utils/util'
    import PopupTreeInput from '@/components/PopupTreeInput/index.vue'
    export default {
        name: 'editAssessmentManagement',
        mixins: [mixin],
        components: { PopupTreeInput },
        setup() {
            const route = useRoute()
            const { delCurrentTag } = mixin.setup()
            const { proxy } = getCurrentInstance()
            const { InfoFormConfig } = renderTable.call(proxy)
            let dataForm = reactive({
                officeCode: '',
                officeName: '',
                assessType: '',
            })
            let timer = ref(new Date().getTime())
            const editor = ref(null);


             const handleTreeSelectChange = ({ officeCode, officeName }) => {
                dataForm.value.officeCode = officeCode
                dataForm.value.officeName = officeName
                getSOList(officeCode)
             }


            let instance;
            // 提交
            const handleSave = () => {
                return new Promise((resolve, reject) => {
                    // true: 编辑；false:添加
                    if (route.query.operation == 2) {
                        updateAssessmentScoreUser(dataForm).then(res => {
                            if (res.resCode === '000000') {
                                resolve(res.message)
                            } else {
                                reject(res.resCode)
                            }
                        })
                    } 
                })
            }
            const handleSubmit = (formRef) => {
                // dataForm.synopsis = instance.txt.html();
                formRef.validate((vaild) => {
                    if (vaild) {
                        handleSave().then(res => {
                            proxy.$message.success(`${route.query.operation == 2 ? '编辑' : '添加'}成功`)
                            delCurrentTag(route)
                        }).catch(err => {
                            proxy.$message.warning(`操作失败，请稍后再试！`)
                        })
                    } else {
                        return
                    }
                })
            }
            const handleBack = () => {
                delCurrentTag(route)
            }
            const formHandle = {
                span: 22,
                textAlign: 'right',
                btns: [
                    { type: 'primary', label: '确认', key: 'sub', icon: 'CircleCheck', handle: handleSubmit },
                    { type: 'primary', label: '返回', key: 'back', icon: 'ArrowLeft', handle: handleBack },
                ]
            }
            onBeforeMount(() => {
                timer.value = new Date().getTime()
            })
            route.query.operation != 3 && (dataForm = JSON.parse(decodeURIComponent(route.query.data)), delete dataForm.treeNames)

    onMounted(() => {
      route.query.operation === 3 && (dataForm = {})
      // handleQueryTable()
    })
            return {
                dataForm,
                route,
                handleBack,
                handleSubmit,
                InfoFormConfig,
                formHandle,
                editor,
                handleTreeSelectChange,
            }

        }
    }
</script>