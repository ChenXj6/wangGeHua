import service from '@/utils/request';

// 
export const saveCoclpit = query => {
  return service.post(
    `/api/realInfo/indexInfo/save`, query
  )
};

//
export const deleteCoclpit = query => {
  return service.post(
    `/api/realInfo/indexInfo/delete`, query
  )
};

// 
export const coclpitList = query => {
  return service.post(
    `/api/realInfo/indexInfo/query`, query
  )
};

// 
export const updateCoclpit = query => {
  return service.post(
    `/api/realInfo/indexInfo/update`, query
  )
};

export const getCoclpitTree = query => {
  return service.post(
    `/api/realInfo/indexInfo/getIndexInfoTree`, query
  )
};

export const getCheckCoclpitTree = query => {
  return service.post(
    `/api/realInfo/indexInfo/getSelIndexInfo`, query
  )
};

export const setConfig = query => {
  return service.post(
    `/api/realInfo/indexInfo/config`, query
  )
};

export const getConfig = query => {
  return service.post(
    `/api/realInfo/indexInfo/select`, query
  )
};