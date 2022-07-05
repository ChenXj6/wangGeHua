import service from '@/utils/request';


// 获取列表
export const getManagementList = query => {
    return service.post(
      `/real/realInfo/build/query`, query
    )
  };