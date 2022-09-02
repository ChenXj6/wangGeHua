import service from '@/utils/request';


export const getWg = query => {
  return service.post(
    `/api/realInfo/chart/queryWg`, query
  )
};
