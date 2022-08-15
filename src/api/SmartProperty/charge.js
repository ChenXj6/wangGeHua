import service from '@/utils/request';

// 添加
export const saveCharge = query => {
  return service.post(
    `/api/realInfo/smart/charge/insert`, query
  )
};

//
// 编辑
export const editCharge = query => {
  return service.post(
    `/api/realInfo/smart/charge/update`, query
  )
};

// 删除
export const deleteCharge = query => {
  return service.post(
    `/api/realInfo/smart/charge/delete`, query
  )
};

// 获取列表
export const getChargeList = query => {
  return service.post(
    `/api/realInfo/smart/charge/select`, query
  )
};