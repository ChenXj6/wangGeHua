import service from '@/utils/request';

export const taxList = data => {
  return service.post(
    `/api/realInfo/revenue/select`, data
  )
};

export const addTax = data => {
  return service.post(
    `/api/realInfo/revenue/insert`, data
  )
};

export const updateTax = data => {
  return service.post(
    `/api/realInfo/revenue/update`, data
  )
};

export const delTax = data => {
  return service.post(
    `/api/realInfo/revenue/delete`, data
  )
};