import service from '@/utils/request';

// 
export const saveDict = query => {
  return service.post(
    `/api/realInfo/dict/save`, query
  )
};

// 
export const editDict = query => {
  return service.post(
    `/api/realInfo/dict/update`, query
  )
};

// 
export const deleteDict = query => {
  return service.post(
    `/api/realInfo/dict/delete`, query
  )
};

// 
export const searchDict = query => {
  return service.post(
    `/api/realInfo/dict/querynodes`, query
  )
};

// 
export const getDictList = query => {
  return service.post(
    `/api/realInfo/dict/query`, query
  )
};