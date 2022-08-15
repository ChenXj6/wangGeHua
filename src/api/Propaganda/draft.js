import service from '@/utils/request';

export const saveDraft = query => {
  return service.post(
    `/api/realInfo/manuscripts/insert`, query
  )
};

export const deleteDraft = query => {
  return service.post(
    `/api/realInfo/manuscripts/delete`, query
  )
};

export const getDraft = query => {
  return service.post(
    `/api/realInfo/manuscripts/select`, query
  )
};

export const updateDraft = data => {
  return service.post(
    `/api/realInfo/manuscripts/update`, data
  )
};