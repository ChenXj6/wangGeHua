import service from '@/utils/request';

// 添加
export const savePeopleInfo = query => {
  return service.post(
    `/api/realInfo/per/save`, query
  )
};

//
// 编辑
export const editPeopleInfo = query => {
  return service.post(
    `/api/realInfo/per/update`, query
  )
};

// 删除
export const deletePeopleInfo = query => {
  return service.post(
    `/api/realInfo/per/delete`, query
  )
};

// 获取列表
export const getPeopleInfoList = query => {
  return service.post(
    `/api/realInfo/per/query`, query
  )
};