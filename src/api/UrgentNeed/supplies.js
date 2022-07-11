import service from '@/utils/request';

// 添加角色
export const saveSupp = query => {
  return service.post(
    `/real/realInfo/emergency/supplie/insert`, query
  )
};

export const updateSupp = query => {
  return service.post(
    `/real/realInfo/emergency/supplie/update`, query
  )
};

// 删除角色
export const deleteSupp = query => {
  return service.post(
    `/real/realInfo/emergency/supplie/delete`, query
  )
};

// 获取角色列表
export const getSupp = query => {
  return service.post(
    `/real/realInfo/emergency/supplie/select`, query
  )
};