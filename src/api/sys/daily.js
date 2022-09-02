import service from '@/utils/request';

// 
export const getDaily = query => {
  return service.post(
    `/api/realInfo/sysLogMessage/select`, query
  )
};