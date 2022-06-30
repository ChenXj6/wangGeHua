import service from '@/utils/request';

// 添加
export const saveRubbish = query => {
  return service.post(
    `/real/realInfo/smart/garbag/insert`, query
  )
};

//
// 编辑
export const editRubbish = query => {
  return service.post(
    `/real/realInfo/smart/garbag/update`, query
  )
};

// 删除
export const deleteRubbish = query => {
  return service.post(
    `/real/realInfo/smart/garbag/delete`, query
  )
};

// 获取列表
export const getRubbishList = query => {
  return service.post(
    `/real/realInfo/smart/garbag/select`, query
  )
};