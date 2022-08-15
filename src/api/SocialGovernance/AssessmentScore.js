import service from '@/utils/request';


  // 获取列表
export const getAssessmentScore = query => {
  return service.post(
    `/api/realInfo/eventAssessInfo/selectUser`, query
  )
};

  