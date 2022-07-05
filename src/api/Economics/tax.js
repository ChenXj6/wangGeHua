import service from '@/utils/request';

export const taxList = data => {
  return service.post(
    `/real/realInfo/revenue/select`, data
  )
};

export const addTax = data => {
  return service.post(
    `/real/realInfo/revenue/insert`, data
  )
};

export const updateTax = data => {
  return service.post(
    `/real/realInfo/revenue/update`, data
  )
};

export const delTax = data => {
  return service.post(
    `/real/realInfo/revenue/delete`, data
  )
};