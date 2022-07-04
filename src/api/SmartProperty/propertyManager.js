import service from '@/utils/request';

// 添加
export const saveCleaner = query => {
  return service.post(
    `/real/realInfo/cleaner/insert`, query
  )
};

//
// 编辑
export const editCleaner = query => {
  return service.post(
    `/real/realInfo/cleaner/update`, query
  )
};

// 删除
export const deleteCleaner = query => {
  return service.post(
    `/real/realInfo/cleaner/delete`, query
  )
};

// 获取列表
export const getCleanerList = query => {
  return service.post(
    `/real/realInfo/cleaner/select`, query
  )
};