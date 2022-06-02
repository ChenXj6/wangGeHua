import service from '@/utils/request';

// 添加角色
export const saveHouse = query => {
  return service.post(
    `/real/realInfo/house/save`, query
  )
};

//
// 添加角色
export const editHouse = query => {
  return service.post(
    `/real/realInfo/house/update`, query
  )
};

// 删除角色
export const deleteHouse = query => {
  return service.post(
    `/real/realInfo/house/delete`, query
  )
};

// 获取角色列表
export const getHouseList = query => {
  return service.post(
    `/real/realInfo/house/query`, query
  )
};