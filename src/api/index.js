import service from '@/utils/request';

export const fetchData = query => {
  return service.post(
    `/api/route/to/demo`, query
  )
};
