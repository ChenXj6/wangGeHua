import service from '@/utils/request';

export const placeList = data => {
  return service.post(
    `/api/realInfo/nine/query`, data
  )
};

export const addPlace = data => {
  return service.post(
    `/api/realInfo/nine/save`, data
  )
};

export const updatePlace = data => {
  return service.post(
    `/api/realInfo/nine/update`, data
  )
};

export const delPlace = data => {
  return service.post(
    `/api/realInfo/nine/delete`, data
  )
};