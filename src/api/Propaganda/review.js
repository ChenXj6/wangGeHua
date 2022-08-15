import service from '@/utils/request';


export const getDraft = query => {
  return service.post(
    `/api/realInfo/manuscripts/selectInfo`, query
  )
};

export const updateDraft = data => {
  return service.post(
    `/api/realInfo/manuscripts/updateInfo`, data
  )
};