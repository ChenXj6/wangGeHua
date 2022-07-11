import service from '@/utils/request';


// 获取列表
// export const getHotlineManageList = query => {
//     return service.post(
//       `/real/realInfo/build/query`, query
//     )
//   };


  export const getHotlineManageList = query => {
    return service.post(
      `/real/realInfo/hotline/list`, query
    )
  };

  
  // 添加
export const saveHotlineManage = query => {
  return service.post(
    `/real/realInfo/hotline/insert`, query
  )
};

// 编辑
export const editHotlineManage = query => {
  return service.post(
    `/real/realInfo/hotline/update`, query
  )
};

// 删除
export const deleteHotlineManage = query => {
  return service.post(
    `/real/realInfo/hotline/delete`, query
  )
};