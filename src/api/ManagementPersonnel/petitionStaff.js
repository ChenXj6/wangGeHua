import service from '@/utils/request';

// 添加
export const savePetition = query => {
  return service.post(
    `/real/realInfo/petition/staff/insert`, query
  )
};

//
// 编辑
export const editPetition = query => {
  return service.post(
    `/real/realInfo/petition/staff/update`, query
  )
};

// 删除
export const deletePetition = query => {
  return service.post(
    `/real/realInfo/petition/staff/delete`, query
  )
};

// 获取列表
export const getPetitionList = query => {
  return service.post(
    `/real/realInfo/petition/staff/select`, query
  )
};