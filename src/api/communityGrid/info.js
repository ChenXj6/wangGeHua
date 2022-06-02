import service from '@/utils/request';

// 添加
export const saveInfo = query => {
  return service.post(
    `/real/realInfo/basic/save`, query
  )
};
// 编辑
export const editInfo = query => {
  return service.post(
    `/real/realInfo/basic/update`, query
  )
};

// 删除
export const deleteInfo = query => {
  return service.post(
    `/real/realInfo/basic/delete`, query
  )
};

// 获取列表
export const getInfoList = query => {
  return service.post(
    `/real/realInfo/basic/query`, query
  )
};