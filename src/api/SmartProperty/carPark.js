import service from '@/utils/request';

// 添加
export const saveCarPark = query => {
  return service.post(
    `/real/realInfo/smart/parking/insert`, query
  )
};

//
// 编辑
export const editCarPark = query => {
  return service.post(
    `/real/realInfo/smart/parking/update`, query
  )
};

// 删除
export const deleteCarPark = query => {
  return service.post(
    `/real/realInfo/smart/parking/delete`, query
  )
};

// 获取列表
export const getCarParkList = query => {
  return service.post(
    `/real/realInfo/smart/parking/select`, query
  )
};