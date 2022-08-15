import service from '@/utils/request';

export const industryList = data => {
  return service.post(
    `/api/realInfo/industry/select`, data
  )
};

export const addIndustry = data => {
  return service.post(
    `/api/realInfo/industry/insert`, data
  )
};

export const updateIndustry = data => {
  return service.post(
    `/api/realInfo/industry/update`, data
  )
};

export const delIndustry = data => {
  return service.post(
    `/api/realInfo/industry/delete`, data
  )
};