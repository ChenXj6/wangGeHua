
import service from '@/utils/request';

// 添加角色
export const savePeople = query => {
  return service.post(
    `/real/realInfo/population/save`, query
  )
};

//
// 添加角色
export const editPeople = query => {
  return service.post(
    `/real/realInfo/population/update`, query
  )
};

// 删除角色
export const deletePeople = query => {
  return service.post(
    `/real/realInfo/population/delete`, query
  )
};

// 
export const getPeopleList = query => {
  return service.post(
    `/real/realInfo/population/query`, query
  )
};

export const getGISPeople = query => {
  return service.post(
    `/real/realInfo/population/queryHouse`, query
  )
};