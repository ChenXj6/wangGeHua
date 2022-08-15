import service from '@/utils/request';


  // 获取列表
export const getAssessmentScoreUser = query => {
  return service.post(
    `/api/realInfo/eventAssessInfo/query`, query
  )
};

  //修改
  export const updateAssessmentScoreUser = query => {
    return service.post(
      `/api/realInfo/eventAssessInfo/update`, query
    )
  };