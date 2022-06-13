import service from '@/utils/request';

// 添加
export const saveBuild = query => {
  return service.post(
    `/real/realInfo/build/save`, query
  )
};

//
// 编辑
export const editBuild = query => {
  return service.post(
    `/real/realInfo/build/update`, query
  )
};

// 删除
export const deleteBuild = query => {
  return service.post(
    `/real/realInfo/build/delete`, query
  )
};

// 获取列表
export const getBuildList = query => {
  return service.post(
    `/real/realInfo/build/query`, query
  )
};

// 父级获取子级 (街道->社区->网格)
export const getSubClass = query => {
  return service.post(
    `/real/realInfo/office/querySubclass`, query
  )
};

// 根据网格查询楼栋
export const getBuildClass = query => {
  return service.post(
    `/real/realInfo/build/queryBuilInfo`, query
  )
};

// 通过楼栋查询房屋
export const getHouseClass = query => {
  return service.post(
    `/real/realInfo/house/queryHouseInfo`, query
  )
};

// 通过楼栋查询房屋详情列表
export const getHouseList = query => {
  return service.post(
    `/real/realInfo/build/queryHouse`, query
  )
};

// 通过楼栋查询人口详情列表
export const getPeopleList = query => {
  return service.post(
    `/real/realInfo/build/queryPulation`, query
  )
};

// 通过房屋查询人口详情列表
export const getPeopleByHouseList = query => {
  return service.post(
    `/real/realInfo/build/queryPulationByHouse`, query
  )
};

