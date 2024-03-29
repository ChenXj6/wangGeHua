import service from '@/utils/request';

// 添加用户
export const saveUser = query => {
  return service.post(
    `/api/sys/user/save`, query
  )
};

// 用户
export const updateUser = query => {
  return service.post(
    `/api/sys/user/update`, query
  )
};

// 删除用户
export const deleteUser = query => {
  return service.post(
    `/api/sys/user/delete`, query
  )
};

// 获取用户列表
export const getUserList = query => {
  return service.post(
    `/api/sys/user/findPage`, query
  )
};

// 获取用户列表
export const getRoleByUser = query => {
  return service.get(
    `/api/sys/user/findUserRoles?userId=${query}`,
  )
};

// 获取用户列表
export const getMenuByRole = query => {
  return service.post(
    `/api/sys/role/findRoleMenus`, query
  )
};

// 添加角色权限菜单
export const saveMenuByRole = query => {
  return service.post(
    `/api/sys/roleMenu/save`, query
  )
};

// 添加用户角色
export const saveRoleToUser = query => {
  return service.post(
    `/api/sys/userRole/save`, query
  )
};
//sys/sysUserData/save
// 添加角色数据权限
export const saveDataByRole = query => {
  return service.post(
    `/api/sys/sysUserData/save`, query
  )
};

// 获取角色下数据权限
export const getDataByRole = query => {
  return service.post(
    `/api/sys/sysUserData/select`, query
  )
};




// 修改密码
export const updatePassword = query => {
  return service.post(
    `/api/sys/user/updatePassword`, query
  )
};

// 修改密码
export const resetPassword = query => {
  return service.post(
    `/api/sys/user/resetPassword`, query
  )
};