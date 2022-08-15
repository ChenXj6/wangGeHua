import service from '@/utils/request';


// 获取列表
export const getTree = query => {
    return service.post(
      `/api/realInfo/gridHotlineWorkOrder/findAllTree`, query
    )
  };

  // 获取列表
export const delTree = query => {
  return service.post(
    `/api/realInfo/gridHotlineWorkOrder/delete`, query
  )
};

// 获取列表
export const updateTree = query => {
  return service.post(
    `/api/realInfo/gridHotlineWorkOrder/update`, query
  )
};

// 获取列表
export const saveTree = query => {
  return service.post(
    `/api/realInfo/gridHotlineWorkOrder/insert`, query
  )
};