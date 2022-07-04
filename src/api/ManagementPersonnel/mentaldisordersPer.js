import service from '@/utils/request';

// 添加
export const saveMental = query => {
  return service.post(
    `/real/realInfo/mental/per/insert`, query
  )
};

//
// 编辑
export const editMental = query => {
  return service.post(
    `/real/realInfo/mental/per/update`, query
  )
};

// 删除
export const deleteMental = query => {
  return service.post(
    `/real/realInfo/mental/per/delete`, query
  )
};

// 获取列表
export const getMentalList = query => {
  return service.post(
    `/real/realInfo/mental/per/select`, query
  )
};