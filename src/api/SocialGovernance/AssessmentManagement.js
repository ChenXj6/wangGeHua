import service from '@/utils/request';

// 获取列表
export const getAssessmentManagement = query => {
    // return service.post(
    //   `/real/realInfo/basic/query`, query
    // )
  };

  
  // 删除
export const deleteAssessmentManagement = query => {
    return service.post(
      `/real/realInfo/basic/delete`, query
    )
  };
