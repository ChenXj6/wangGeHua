import service from '@/utils/request';

// 添加角色
export const saveMenu = query => {
  return service.post(
    `/api/sys/menu/save`, query
  )
};

// 删除角色
export const deleteMenu = query => {
  return service.post(
    `/api/sys/menu/delete`, query
  )
};

// 获取角色列表
export const getMenuTree = query => {
  return service.post(
    `/api/sys/menu/findMenuTree`, query
  )
};

// 根据角色获取资源树
export const getMenuTreeByUser = query => {
  return service.post(
    `/api/sys/menu/findMenuByUserId`, query
  )
};