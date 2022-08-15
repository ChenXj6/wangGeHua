import service from '@/utils/request';

// 添加
export const saveOrgan = query => {
  return service.post(
    `/api/realInfo/office/save`, query
  )
};

export const editOrgan = query => {
  return service.post(
    `/api/realInfo/office/update`, query
  )
};

// 删除
export const deleteOrgan = query => {
  return service.post(
    `/api/realInfo/office/delete`, query
  )
};

// 获取
export const getOrganList = query => {
  return service.post(
    `/api/realInfo/office/queryAllTree`, query
  )
};

// 获取
export const getSmallOrganList = query => {
  return service.post(
    `/api/realInfo/office/querySmallToLarge`, query
  )
};

// 获取部分
export const getPartOrganList = query => {
  return service.post(
    `/api/realInfo/office/queryPartTree`, query
  )
};