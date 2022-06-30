// realInfo/file/upload

import service from '@/utils/request';

export const uploadApi = data => {
  return service.post(
    `/real/realInfo/file/upload`, data
  )
};