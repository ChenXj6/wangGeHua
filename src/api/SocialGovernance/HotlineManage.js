import service from '@/utils/request';


// 获取列表
export const delHotline = query => {
    return service.post(
      `/real/realInfo/hotline/delete`, query
    )
  };


  export const getHotlineManageList = query => {
    return service.post(
      `/real/realInfo/hotline/list`, query
    )
  };

  
  // 添加
export const saveHotlineManage = query => {
  return service.post(
    `/real/realInfo/hotline/insert`, query
  )
};

// 编辑
export const editHotlineManage = query => {
  return service.post(
    `/real/realInfo/hotline/update`, query
  )
};

// 删除
export const deleteHotlineManage = query => {
  return service.post(
    `/real/realInfo/hotline/delete`, query
  )
};

// realInfo/hotline/record/select   处置记录

export const getHotlineRecordList = query => {
  return service.post(
    `/real/realInfo/hotline/record/select`, query
  )
};

// 派单
export const dispatchOrder = query => {
  return service.post(
    `/real/realInfo/hotline/record/send`, query
  )
};

// 接单
export const takeOrder = query => {
  return service.post(
    `/real/realInfo/hotline/record/accept`, query
  )
};

// 撤回
export const recallOrder = query => {
  return service.post(
    `/real/realInfo/hotline/record/accept`, query
  )
};

// 回单
export const receiptOrder = query => {
  return service.post(
    `/real/realInfo/hotline/record/reply`, query
  )
};

// 审核
export const examineOrder = query => {
  return service.post(
    `/real/realInfo/hotline/record/reply`, query
  )
};