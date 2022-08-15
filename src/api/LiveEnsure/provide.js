import service from '@/utils/request';

export const saveProvide = query => {
  return service.post(
    `/api/realInfo/age/save`, query
  )
};

export const deleteProvide = query => {
  return service.post(
    `/api/realInfo/age/delete`, query
  )
};

export const getProvide = query => {
  return service.post(
    `/api/realInfo/age/query`, query
  )
};

export const updateProvide = data => {
  return service.post(
    `/api/realInfo/age/update`, data
  )
};