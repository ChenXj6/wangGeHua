import service from '@/utils/request';

export const saveMedia = query => {
  return service.post(
    `/api/realInfo/multimedia/insert`, query
  )
};

export const deleteMedia = query => {
  return service.post(
    `/api/realInfo/multimedia/delete`, query
  )
};

export const getMedia = query => {
  return service.post(
    `/api/realInfo/multimedia/select`, query
  )
};

export const updateMedia = data => {
  return service.post(
    `/api/realInfo/multimedia/update`, data
  )
};