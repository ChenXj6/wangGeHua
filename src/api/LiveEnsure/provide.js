import service from '@/utils/request';

export const saveProvide = query => {
  return service.post(
    `/real/realInfo/age/save`, query
  )
};

export const deleteProvide = query => {
  return service.post(
    `/real/realInfo/age/delete`, query
  )
};

export const getProvide = query => {
  return service.post(
    `/real/realInfo/age/query`, query
  )
};

export const updateProvide = data => {
  return service.post(
    `/real/realInfo/age/update`, data
  )
};