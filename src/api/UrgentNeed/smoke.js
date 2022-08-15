import service from '@/utils/request';

// 添加角色
export const saveSmoke = query => {
  return service.post(
    `/api/realInfo/smoke/sensor/insert`, query
  )
};

export const updateSmoke = query => {
  return service.post(
    `/api/realInfo/smoke/sensor/update`, query
  )
};

// 删除角色
export const deleteSmoke = query => {
  return service.post(
    `/api/realInfo/smoke/sensor/delete`, query
  )
};

// 获取角色列表
export const getSmoke = query => {
  return service.post(
    `/api/realInfo/smoke/sensor/select`, query
  )
};