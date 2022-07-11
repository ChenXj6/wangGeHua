import service from '@/utils/request';

export const saveDraft = query => {
  return service.post(
    `/real/realInfo/manuscripts/insert`, query
  )
};

export const deleteDraft = query => {
  return service.post(
    `/real/realInfo/manuscripts/delete`, query
  )
};

export const getDraft = query => {
  return service.post(
    `/real/realInfo/manuscripts/select`, query
  )
};

export const updateDraft = data => {
  return service.post(
    `/real/realInfo/manuscripts/update`, data
  )
};