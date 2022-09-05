<template>
  <div class="coclpit-content">
    <div>
      <h1 style="text-align: center; margin-bottom: 40px">
        {{ currentTitle }}
      </h1>
    </div>
    <el-row :gutter="10">
      <el-col :span="isOpen ? 22 : 24">
        <div class="showBox">
          <div class="viewBox" v-if="viewList.length > 0">
            <el-row gutter="10">
              <el-col :span="4" v-for="item in viewList" :key="item">
                <transition name="move" mode="out-in">
                <Component :is="item"></Component>
              </transition>
              </el-col>
            </el-row>
          </div>
          <div class="eachrtBox" v-if="eachrtList.length > 0">
            <el-row gutter="10">
              <el-col :span="6" v-for="item in eachrtList" :key="item">
                <transition name="move" mode="out-in">
                <Component :is="item"></Component>
              </transition>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--  -->
      </el-col>
      <el-col v-if="isOpen" :span="2">
        <div class="menuList">
          <div
            class="menuItem"
            v-for="item in menuList"
            :key="item.id"
            :class="currentMenu == item.id ? 'active' : ''"
            @click="changeSelect(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="flag">
      <div @click="openMenu">
        <Fold style="width: 14px; height: 14px" />&nbsp;
        <span>{{ isOpen ? '折叠' : '展开' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  defineAsyncComponent,
  getCurrentInstance,
  onBeforeMount,
  ref,
} from '@vue/runtime-core'
import { getConfig } from '@/api/sys/coclpitGovern'
import { searchDict } from '@/api/sys/dict'
import { defaultObject, listAssign } from '@/utils/util'
export default {
  components: {
    PartyOrganizations: defineAsyncComponent(() =>
      import('./components/text/PartyOrganizations.vue')
    ),
    AdvancedPartyMembers: defineAsyncComponent(() =>
      import('./components/text/AdvancedPartyMembers.vue')
    ),
    PartyMembers: defineAsyncComponent(() =>
      import('./components/text/PartyMembers.vue')
    ),
    PartyMemberType: defineAsyncComponent(() =>
      import('./components/charts/PartyMemberType.vue')
    ),
    PartyMemberAge: defineAsyncComponent(() =>
      import('./components/charts/PartyMemberAge.vue')
    ),
    PartyMemberEducation: defineAsyncComponent(() =>
      import('./components/charts/PartyMemberEducation.vue')
    ),
    PartyMemberChangeTrend: defineAsyncComponent(() =>
      import('./components/charts/PartyMemberChangeTrend.vue')
    ),
    PartyMemberNowYearTrend: defineAsyncComponent(() =>
      import('./components/charts/PartyMemberNowYearTrend.vue')
    ),
    PartyMemberTitle: defineAsyncComponent(() =>
      import('./components/charts/PartyMemberTitle.vue')
    ),
    RevenueTotalTax: defineAsyncComponent(() =>
      import('./components/text/RevenueTotalTax.vue')
    ),
    RevenueTotalTaxTrend: defineAsyncComponent(() =>
      import('./components/charts/RevenueTotalTaxTrend.vue')
    ),
    RevenueNowYearTrend: defineAsyncComponent(() =>
      import('./components/charts/RevenueNowYearTrend.vue')
    ),
    RevenueNowYearByType: defineAsyncComponent(() =>
      import('./components/charts/RevenueNowYearByType.vue')
    ),
    NinePlaceByType: defineAsyncComponent(() =>
      import('./components/charts/NinePlaceByType.vue')
    ),
    NinePlaceNumbers: defineAsyncComponent(() =>
      import('./components/text/NinePlaceNumbers.vue')
    ),
    ProjectNowYear: defineAsyncComponent(() =>
      import('./components/text/ProjectNowYear.vue')
    ),
    ProjectNowYearByType: defineAsyncComponent(() =>
      import('./components/charts/ProjectNowYearByType.vue')
    ),
    ProjectTrend: defineAsyncComponent(() =>
      import('./components/charts/ProjectTrend.vue')
    ),
    CompanyBuilding: defineAsyncComponent(() =>
      import('./components/charts/CompanyBuilding.vue')
    ),
    IndustryNumbers: defineAsyncComponent(() =>
      import('./components/charts/IndustryNumbers.vue')
    ),
  },
  setup() {
    const { proxy } = getCurrentInstance()
    // 驾驶舱看板
    // 折叠/展开
    const isOpen = ref(true)
    const openMenu = () => {
      isOpen.value = !isOpen.value
    }
    const currentMenu = ref('0')
    const currentTitle = ref('驾驶舱')
    const menuList = ref([
      { id: '0', title: '驾驶舱看板', ownModule: '', isShowFlag: '1' },
    ])
    let currentObj = ref({
      ownModule: '',
      isShowFlag: '1',
    })
    const changeSelect = (item) => {
      defaultObject(currentObj.value)
      currentMenu.value = item.id
      currentTitle.value = item.title
      listAssign(currentObj.value, item)
      getConfigList(currentObj.value)
    }

    // 初始化驾驶舱右边栏
    const querySearchAsync = (basictype) => {
      searchDict({ basictype }).then((res) => {
        if (res.resCode == '000000' && Array.isArray(res.data)) {
          let arr = []
          res.data.forEach((v) => {
            let obj = {}
            obj.id = v.value
            obj.title = v.description
            obj.ownModule = v.value
            obj.isShowFlag = ''
            arr.push(obj)
          })
          menuList.value = [...menuList.value, ...arr]
          listAssign(currentObj.value, menuList.value[0])
        } else {
          return
        }
      })
    }
    const viewList = ref([])
    const eachrtList = ref([])
    const getConfigList = (data) => {
      getConfig(data).then((res) => {
        if (res.resCode == '000000' && Array.isArray(res.data)) {
          viewList.value = []
          eachrtList.value = []
          res.data.forEach((v) => {
            if (v.showType == '1') {
              viewList.value.push(v.componentName)
            } else {
              eachrtList.value.push(v.componentName)
            }
          })
        }
      })
    }

    onBeforeMount(() => {
      querySearchAsync('1095')
      getConfigList(currentObj.value)
    })
    return {
      openMenu,
      isOpen,
      menuList,
      currentMenu,
      changeSelect,
      currentTitle,
      viewList,
      eachrtList,
    }
  },
}
</script>
<style scoped>
.coclpit {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: absolute;
  bottom: 60px;
  left: 0;
  /* transform: translate(-50%, -50%); */
  background: rgba(36, 47, 66, 0.7);
  z-index: 9999;
  padding: 60px 50px 50px;
  border-radius: 10px;
}
.item {
  width: 100%;
  padding: 5px 10px 10px;
  box-sizing: border-box;
  /* height: 60px; */
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 14px;
}
.item > p,
.item > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.itemNum {
  font-size: 36px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.itemUnit {
  margin-top: 10px;
  font-size: 14px;
  float: right;
}
.itemBox1,
.itemBox2 {
  height: 80px !important;
}
.itemBox2 {
  text-align: center;
}
.coclpit-content {
  user-select: none;
  overflow: scroll;
  height: 95%;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
}
.coclpit-content > div {
  margin: 10px 0 !important;
}
.menuList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid #fff;
  box-sizing: border-box;
  padding: 10px;
}
.menuItem {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 5px 0;
  box-sizing: border-box;
  text-align: center;
  border: 1px dashed darkcyan;
  cursor: pointer;
}
.active {
  background: #f9f9f9;
  color: #333;
  font-weight: 700;
  border: 1px dashed rgba(238, 255, 0, 0.225);
}
.flag {
  position: absolute;
  top: 140px;
  right: 60px;
  font-size: 14px;
  cursor: pointer;
}
.flag > div {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  width: 50px;
  align-items: center;
}
/*  */
.showBox {
  width: 100%;
  height: 100%;
}
.viewBox {
  width: 100%;
  /* min-height: 250px; */
  max-height: 260px;
  margin-bottom: 10px;
  overflow: scroll;
}
.eachrtBox {
  width: 100%;
  /* min-height: 200px; */
  max-height: 420px;
  overflow: scroll;
}
</style>
