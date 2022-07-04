import service from '@/utils/request';

// 添加
export const saveStaff = query => {
  return service.post(
    `/real/realInfo/service/staff/insert`, query
  )
};

//
// 编辑
export const editStaff = query => {
  return service.post(
    `/real/realInfo/service/staff/update`, query
  )
};

// 删除
export const deleteStaff = query => {
  return service.post(
    `/real/realInfo/service/staff/delete`, query
  )
};

// 获取列表
export const getStaffList = query => {
  return service.post(
    `/real/realInfo/service/staff/select`, query
  )
};