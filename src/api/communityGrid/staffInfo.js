import service from '@/utils/request';

// 添加
export const savePeopleInfo = query => {
  return service.post(
    `/real/realInfo/per/save`, query
  )
};

//
// 编辑
export const editPeopleInfo = query => {
  return service.post(
    `/real/realInfo/per/update`, query
  )
};

// 删除
export const deletePeopleInfo = query => {
  return service.post(
    `/real/realInfo/per/delete`, query
  )
};

// 获取列表
export const getPeopleInfoList = query => {
  return service.post(
    `/real/realInfo/per/query`, query
  )
};