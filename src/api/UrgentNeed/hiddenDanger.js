import service from '@/utils/request';

// 添加角色
export const saveHiddenDanger = query => {
  return service.post(
    `/real/realInfo/danger/manager/insert`, query
  )
};

export const updateHiddenDanger = query => {
  return service.post(
    `/real/realInfo/danger/manager/update`, query
  )
};

// 删除角色
export const deleteHiddenDanger = query => {
  return service.post(
    `/real/realInfo/danger/manager/delete`, query
  )
};

// 获取角色列表
export const getHiddenDanger = query => {
  return service.post(
    `/real/realInfo/danger/manager/selectByPC`, query
  )
};