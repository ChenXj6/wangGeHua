import service from '@/utils/request';


// 获取列表
export const getHotlineManageList = query => {
    return service.post(
      `/real/realInfo/build/query`, query
    )
  };