import service from '@/utils/request';

export const weatherApi = data => {
  return service.get(
    `/weather?location=${data.lng},${data.lat}&key=663342143ca546cb879df6eb26ad483b`,
  )
};

export const noticeList = data => {
  return service.post(
    `/api/realInfo/hotline/tips`, data
  )
};