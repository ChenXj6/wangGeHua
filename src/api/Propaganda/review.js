import service from '@/utils/request';


export const getDraft = query => {
  return service.post(
    `/real/realInfo/manuscripts/selectInfo`, query
  )
};

export const updateDraft = data => {
  return service.post(
    `/real/realInfo/manuscripts/updateInfo`, data
  )
};