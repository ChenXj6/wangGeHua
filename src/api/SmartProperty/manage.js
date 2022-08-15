import service from '@/utils/request';

// 添加
export const saveManage = query => {
  return service.post(
    `/api/realInfo/smart/manage/insert`, query
  )
};

//
// 编辑
export const editManage = query => {
  return service.post(
    `/api/realInfo/smart/manage/update`, query
  )
};

// 删除
export const deleteManage = query => {
  return service.post(
    `/api/realInfo/smart/manage/delete`, query
  )
};

// 获取列表
export const getManageList = query => {
  return service.post(
    `/api/realInfo/smart/manage/select`, query
  )
};