import service from '@/utils/request';

export const loginApi = data => {
  return service.post(
    `/api/sys/login`, data
  )
};