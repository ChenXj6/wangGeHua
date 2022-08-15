import service from '@/utils/request';


// 获取列表
export const getRoastSuggestion = query => {
  return service.post(
    `/real/realInfo/suggest/select`, query
  )
};


  // 删除
export const deleteRoastSuggestion = query => {
    return service.post(
      `/real/realInfo/suggest/delete`, query
    )
  };

  //修改
  export const updateRoastSuggestion = query => {
    return service.post(
      `/real/realInfo/suggest/update`, query
    )
  };

  //新增
  export const saveRoastSuggestion = query => {
    return service.post(
      `/real/realInfo/suggest/insert`, query
    )
    
  };
  
