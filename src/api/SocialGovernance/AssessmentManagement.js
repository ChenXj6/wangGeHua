import service from '@/utils/request';


// 获取列表
export const getAssessmentManagement = query => {
  return service.post(
    `/real/realInfo/eventAssessMent/query`, query
  )
};

  // 删除
export const deleteAssessmentManagement = query => {
    return service.post(
      `/real/realInfo/eventAssessMent/delete`, query
    )
  };

  //修改
  export const updateAssessmentManagement = query => {
    return service.post(
      `/real/realInfo/eventAssessMent/update`, query
    )
  };

  //新增
  export const saveAssessmentManagement = query => {
    return service.post(
      `/real/realInfo/eventAssessMent/save`, query
    )
  };
