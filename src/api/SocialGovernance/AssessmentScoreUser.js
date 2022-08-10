import service from '@/utils/request';


  // 获取列表
export const getAssessmentScoreUser = query => {
  return service.post(
    `/real/realInfo/eventAssessInfo/query`, query
  )
};

  //修改
  export const updateAssessmentScoreUser = query => {
    return service.post(
      `/real/realInfo/eventAssessInfo/update`, query
    )
  };