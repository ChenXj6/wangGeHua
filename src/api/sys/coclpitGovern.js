import service from '@/utils/request';

// 添加角色
export const saveCoclpit = query => {
  return service.post(
    `/api/realInfo/indexInfo/save`, query
  )
};

// 删除角色
export const deleteCoclpit = query => {
  return service.post(
    `/api/realInfo/indexInfo/delete`, query
  )
};

// 获取角色列表
export const coclpitList = query => {
  return service.post(
    `/api/realInfo/indexInfo/query`, query
  )
};

// 根据角色获取资源树
export const updateCoclpit = query => {
  return service.post(
    `/api/realInfo/indexInfo/update`, query
  )
};