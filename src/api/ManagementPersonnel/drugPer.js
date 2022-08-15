import service from '@/utils/request';

// 添加
export const saveDrug = query => {
  return service.post(
    `/api/realInfo/manageper/drug/insert`, query
  )
};
// 添加
export const updateStatus = query => {
  return service.post(
    `/api/realInfo/manageper/drug/updateStatus`, query
  )
};

//
// 编辑
export const editDrug = query => {
  return service.post(
    `/api/realInfo/manageper/drug/update`, query
  )
};

// 删除
export const deleteDrug = query => {
  return service.post(
    `/api/realInfo/manageper/drug/delete`, query
  )
};

// 获取列表
export const getDrugList = query => {
  return service.post(
    `/api/realInfo/manageper/drug/select`, query
  )
};