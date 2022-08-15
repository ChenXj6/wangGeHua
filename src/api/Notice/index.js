import service from '@/utils/request';

// 添加角色
export const saveNotice = query => {
  return service.post(
    `/api/realInfo/announcement/insert`, query
  )
};

export const updateNotice = query => {
  return service.post(
    `/api/realInfo/announcement/update`, query
  )
};

// 删除角色
export const deleteNotice = query => {
  return service.post(
    `/api/realInfo/announcement/delete`, query
  )
};

// 获取角色列表
export const getNotice = query => {
  return service.post(
    `/api/realInfo/announcement/select`, query
  )
};