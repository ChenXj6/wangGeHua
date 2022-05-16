import service from '@/utils/request';

// 添加用户
export const saveUser = query => {
  return service.post(
    `/api/sys/user/save`, query
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