import service from '@/utils/request';

// 添加角色
export const saveHiddenDangerTask = query => {
  return service.post(
    `/real/realInfo/danger/time/insert`, query
  )
};

export const updateHiddenDangerTask = query => {
  return service.post(
    `/real/realInfo/danger/time/update`, query
  )
};

// 删除角色
export const deleteHiddenDangerTask = query => {
  return service.post(
    `/real/realInfo/danger/time/delete`, query
  )
};

// 获取角色列表
export const getHiddenDangerTask = query => {
  return service.post(
    `/real/realInfo/danger/time/select`, query
  )
};

// 手动定时任务
export const saveTask = query => {
  return service.post(
    `/real/realInfo/danger/time/setupdate`, query
  )
};