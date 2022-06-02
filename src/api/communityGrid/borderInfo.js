import service from '@/utils/request';

// 添加
export const saveBorderInfo = query => {
  return service.post(
    `/real/realInfo/border/save`, query
  )
};

//
// 编辑
export const editBorderInfo = query => {
  return service.post(
    `/real/realInfo/border/update`, query
  )
};

// 删除
export const deleteBorderInfo = query => {
  return service.post(
    `/real/realInfo/border/delete`, query
  )
};

// 获取列表
export const getBorderInfoList = query => {
  return service.post(
    `/real/realInfo/border/query`, query
  )
};