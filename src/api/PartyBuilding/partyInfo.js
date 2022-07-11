import service from '@/utils/request';

export const PartyList = data => {
  return service.post(
    `/real/realInfo/party/org/select`, data
  )
};

export const addParty = data => {
  return service.post(
    `/real/realInfo/party/org/insert`, data
  )
};

export const updateParty = data => {
  return service.post(
    `/real/realInfo/party/org/update`, data
  )
};

export const delParty = data => {
  return service.post(
    `/real/realInfo/party/org/delete`, data
  )
};