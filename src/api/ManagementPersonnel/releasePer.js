import service from '@/utils/request';

// 添加
export const saveRelease = query => {
  return service.post(
    `/api/realInfo/managerper/release/insert`, query
  )
};

//
// 编辑
export const editRelease = query => {
  return service.post(
    `/api/realInfo/managerper/release/update`, query
  )
};

// 删除
export const deleteRelease = query => {
  return service.post(
    `/api/realInfo/managerper/release/delete`, query
  )
};

// 获取列表
export const getReleaseList = query => {
  return service.post(
    `/api/realInfo/managerper/release/select`, query
  )
};