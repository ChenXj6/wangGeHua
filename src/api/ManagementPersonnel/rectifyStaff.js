import service from '@/utils/request';

// 添加
export const saveRectify = query => {
  return service.post(
    `/real/realInfo/rectify/staff/insert`, query
  )
};

//
// 编辑
export const editRectify = query => {
  return service.post(
    `/real/realInfo/rectify/staff/update`, query
  )
};

// 删除
export const deleteRectify = query => {
  return service.post(
    `/real/realInfo/rectify/staff/delete`, query
  )
};

// 获取列表
export const getRectifyList = query => {
  return service.post(
    `/real/realInfo/rectify/staff/select`, query
  )
};