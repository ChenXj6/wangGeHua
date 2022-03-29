import service from '@/utils/request';

export const fetchData = query => {
  return service.post(
    `/api/route/to/demo`, query
  )
};
export const get = query => {
  return service.post(
    `/sc/route/to/demo`, query
  )
};
