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