import service from '@/utils/request';

export const buildingList = data => {
  return service.post(
    `/real/realInfo/companybuilding/select`, data
  )
};

export const addBuilding = data => {
  return service.post(
    `/real/realInfo/companybuilding/insert`, data
  )
};

export const updateBuilding = data => {
  return service.post(
    `/real/realInfo/companybuilding/update`, data
  )
};

export const delBuilding = data => {
  return service.post(
    `/real/realInfo/companybuilding/delete`, data
  )
};