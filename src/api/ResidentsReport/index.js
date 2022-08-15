import service from '@/utils/request';

// 采集
export const getDetailList = query => {
  return service.post(
    `/api/realInfo/detail/query`, query
  )
};
export const editDetail= query => {
  return service.post(
    `/api/realInfo/detail/update`, query
  )
};

export const addDetail= query => {
  return service.post(
    `/api/realInfo/detail/save`, query
  )
};

export const deleteDetail = query => {
  return service.post(
    `/api/realInfo/detail/delete`, query
  )
};

// 查询处置记录
export const queryByEventId = query => {
  return service.post(
    `/api/realInfo/record/queryByEventId`, query
  )
};

// 处置
export const getRecordList = query => {
  return service.post(
    `/api/realInfo/record/query`, query
  )
};

// 采集
export const getHandleList = query => {
  return service.post(
    `/api/realInfo/record/query`, query
  )
};

export const editRecord = query => {
  return service.post(
    `/api/realInfo/record/update`, query
  )
};

export const deleteRecord = query => {
  return service.post(
    `/api/realInfo/record/delete`, query
  )
};

// 事件流转
export const eventProcessing = query => {
  return service.post(
    `/api/realInfo/record/eventProcessing`, query
  )
};

// 挂起解挂
export const eventLock = query => {
  return service.post(
    `/api/realInfo/record/mount`, query
  )
};