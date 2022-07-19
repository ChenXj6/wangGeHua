import service from '@/utils/request';

// 添加角色
export const getHiddenDangerContent = query => {
  return service.post(
    `/real/realInfo/danger/info/select`, query
  )
};

export const updateHiddenDangerContent = query => {
  return service.post(
    `/real/realInfo/danger/info/update`, query
  )
};

// 
export const getHiddenDangerContentRecord = query => {
  return service.post(
    `/real/realInfo/dangerinfo/record/select`, query
  )
};