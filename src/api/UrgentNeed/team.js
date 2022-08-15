import service from '@/utils/request';

// 添加角色
export const saveTeam = query => {
  return service.post(
    `/api/realInfo/emergency/team/insert`, query
  )
};

export const updateTeam = query => {
  return service.post(
    `/api/realInfo/emergency/team/update`, query
  )
};

// 删除角色
export const deleteTeam = query => {
  return service.post(
    `/api/realInfo/emergency/team/delete`, query
  )
};

// 获取角色列表
export const getTeamList = query => {
  return service.post(
    `/api/realInfo/emergency/team/select`, query
  )
};