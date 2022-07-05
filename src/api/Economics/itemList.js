import service from '@/utils/request';

export const itemList = data => {
  return service.post(
    `/real/realInfo/project/select`, data
  )
};

export const addItem = data => {
  return service.post(
    `/real/realInfo/project/insert`, data
  )
};

export const updateItem = data => {
  return service.post(
    `/real/realInfo/project/update`, data
  )
};

export const delItem = data => {
  return service.post(
    `/real/realInfo/project/delete`, data
  )
};