import service from '@/utils/request';

export const saveMedia = query => {
  return service.post(
    `/real/realInfo/multimedia/insert`, query
  )
};

export const deleteMedia = query => {
  return service.post(
    `/real/realInfo/multimedia/delete`, query
  )
};

export const getMedia = query => {
  return service.post(
    `/real/realInfo/multimedia/select`, query
  )
};

export const updateMedia = data => {
  return service.post(
    `/real/realInfo/multimedia/update`, data
  )
};