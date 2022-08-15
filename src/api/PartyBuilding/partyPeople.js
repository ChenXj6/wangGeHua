import service from '@/utils/request';

export const PartyPeopleList = data => {
  return service.post(
    `/api/realInfo/party/member/select`, data
  )
};

export const addPartyPeople = data => {
  return service.post(
    `/api/realInfo/party/member/insert`, data
  )
};

export const updatePartyPeople = data => {
  return service.post(
    `/api/realInfo/party/member/update`, data
  )
};

export const delPartyPeople = data => {
  return service.post(
    `/api/realInfo/party/member/delete`, data
  )
};