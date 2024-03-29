import service from '@/utils/request';

// 添加
export const savePubilc = query => {
  return service.post(
    `/api/realInfo/smart/commdevice/insert`, query
  )
};

//
// 编辑
export const editPubilc = query => {
  return service.post(
    `/api/realInfo/smart/commdevice/update`, query
  )
};

// 删除
export const deletePubilc = query => {
  return service.post(
    `/api/realInfo/smart/commdevice/delete`, query
  )
};

// 获取列表
export const getPubilcList = query => {
  return service.post(
    `/api/realInfo/smart/commdevice/select`, query
  )
};