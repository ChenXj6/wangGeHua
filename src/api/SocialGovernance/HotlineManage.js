import service from '@/utils/request';

// 导入
export const importHotline = query => {
  return service.post(
    `/api/realInfo/hotline/InputExcel`, query
  )
};

// 导出
export const exportHotline = query => {
  return service.post(
    `/api/realInfo/hotline/OutExcel`, query,
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;chartset=uft-8' },
      responseType: `blob`,
    }
  )
};
// 导出承办单
export const exportZipHotline = query => {
  return service.post(
    `/api/realInfo/hotline/downZip`, query,
    {
      headers: { 'Content-Type': 'application/json;application/octet-stream;chartset=uft-8' },
      responseType: `blob`,
    }
  )
};


// 
export const delHotline = query => {
    return service.post(
      `/api/realInfo/hotline/delete`, query
    )
  };


  export const getHotlineManageList = query => {
    return service.post(
      `/api/realInfo/hotline/select`, query
    )
  };

  
  // 添加
export const saveHotlineManage = query => {
  return service.post(
    `/api/realInfo/hotline/insert`, query
  )
};

// 编辑
export const editHotlineManage = query => {
  return service.post(
    `/api/realInfo/hotline/update`, query
  )
};

// 删除
export const deleteHotlineManage = query => {
  return service.post(
    `/api/realInfo/hotline/delete`, query
  )
};

// realInfo/hotline/record/select   处置记录

export const getHotlineRecordList = query => {
  return service.post(
    `/api/realInfo/hotline/record/select`, query
  )
};

// 派单
export const dispatchOrder = query => {
  return service.post(
    `/api/realInfo/hotline/record/send`, query
  )
};

// 接单
export const takeOrder = query => {
  return service.post(
    `/api/realInfo/hotline/record/accept`, query
  )
};

// 撤回
export const recallOrder = query => {
  return service.post(
    `/api/realInfo/hotline/record/recall`, query
  )
};

// 回单
export const receiptOrder = query => {
  return service.post(
    `/api/realInfo/hotline/record/reply`, query
  )
};

// 审核
export const examineOrder = query => {
  return service.post(
    `/api/realInfo/hotline/record/verify`, query
  )
};