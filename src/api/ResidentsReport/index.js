import service from '@/utils/request';

// 采集
export const getDetailList = query => {
  return service.post(
    `/real/realInfo/detail/query`, query
  )
};
export const editDetail= query => {
  return service.post(
    `/real/realInfo/detail/update`, query
  )
};

export const addDetail= query => {
  return service.post(
    `/real/realInfo/detail/save`, query
  )
};

export const deleteDetail = query => {
  return service.post(
    `/real/realInfo/detail/delete`, query
  )
};

// 处置
export const getRecordList = query => {
  return service.post(
    `/real/realInfo/record/query`, query
  )
};

export const editRecord = query => {
  return service.post(
    `/real/realInfo/record/update`, query
  )
};

export const addRecord = query => {
  return service.post(
    `/real/realInfo/record/save`, query
  )
};

export const deleteRecord = query => {
  return service.post(
    `/real/realInfo/record/delete`, query
  )
};