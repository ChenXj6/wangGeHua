import service from '@/utils/request';

// 添加角色
export const saveRole = query => {
  return service.post(
    `/api/sys/role/save`, query
  )
};

//
// 添加角色
export const editRole = query => {
  return service.post(
    `/api/sys/role/update`, query
  )
};

// 删除角色
export const deleteRole = query => {
  return service.post(
    `/api/sys/role/delete`, query
  )
};

// 获取角色列表
export const getRoleList = query => {
  return service.post(
    `/api/sys/role/findPage`, query
  )
};