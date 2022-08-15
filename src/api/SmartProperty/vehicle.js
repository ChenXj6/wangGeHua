import service from '@/utils/request';

// 添加
export const saveVehicle = query => {
  return service.post(
    `/api/realInfo/smart/car/insert`, query
  )
};

//
// 编辑
export const editVehicle = query => {
  return service.post(
    `/api/realInfo/smart/car/update`, query
  )
};

// 删除
export const deleteVehicle = query => {
  return service.post(
    `/api/realInfo/smart/car/delete`, query
  )
};

// 获取列表
export const getVehicleList = query => {
  return service.post(
    `/api/realInfo/smart/car/select`, query
  )
};