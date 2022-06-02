import service from '@/utils/request';

// 添加
export const savePubilc = query => {
  return service.post(
    `/real/CommDevice/insert`, query
  )
};

//
// 编辑
export const editPubilc = query => {
  return service.post(
    `/real/CommDevice/update`, query
  )
};

// 删除
export const deletePubilc = query => {
  return service.post(
    `/real/CommDevice/delete`, query
  )
};

// 获取列表
export const getPubilcList = query => {
  return service.post(
    `/real/CommDevice/select`, query
  )
};