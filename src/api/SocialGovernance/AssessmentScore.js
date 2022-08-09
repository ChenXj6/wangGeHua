import service from '@/utils/request';


  // 获取列表
export const getAssessmentScore = query => {
  return service.post(
    `/real/realInfo/eventAssessInfo/selectUser`, query
  )
};

  