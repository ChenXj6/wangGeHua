import service from '@/utils/request';

// 添加
export const saveParkLot = query => {
  return service.post(
    `/real/realInfo/smart/tcxx/insert`, query
  )
};

//
// 编辑
export const editParkLot = query => {
  return service.post(
    `/real/realInfo/smart/tcxx/update`, query
  )
};

// 删除
export const deleteParkLot = query => {
  return service.post(
    `/real/realInfo/smart/tcxx/delete`, query
  )
};

// 获取列表
export const getParkLotList = query => {
  return service.post(
    `/real/realInfo/smart/tcxx/select`, query
  )
};