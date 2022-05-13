import service from '@/utils/request';

export const getUserList = query => {
  return service.post(
    `/sc/sys/user/findPage`, query
  )
};