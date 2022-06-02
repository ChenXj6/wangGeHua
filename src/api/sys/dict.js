import service from '@/utils/request';

// 
export const saveDict = query => {
  return service.post(
    `/real/realInfo/dict/save`, query
  )
};

// 
export const editDict = query => {
  return service.post(
    `/real/realInfo/dict/update`, query
  )
};

// 
export const deleteDict = query => {
  return service.post(
    `/real/realInfo/dict/delete`, query
  )
};

// 
export const searchDict = query => {
  return service.post(
    `/real/realInfo/dict/querynodes`, query
  )
};

// 
export const getDictList = query => {
  return service.post(
    `/real/realInfo/dict/query`, query
  )
};