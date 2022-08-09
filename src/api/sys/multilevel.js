import service from '@/utils/request';

// 添加角色
export const saveDictTh = query => {
  return service.post(
    `/api/sys/sysDictTh/save`, query
  )
};

// 删除角色
export const deleteDictTh = query => {
  return service.post(
    `/api/sys/sysDictTh/delete`, query
  )
};

// 删除角色
export const updateDictTh = query => {
  return service.post(
    `/api/sys/sysDictTh/delete`, query
  )
};

// 获取角色列表
export const getDictThTree = query => {
  return service.post(
    `/api/sys/sysDictTh/dictThTree`, query
  )
};

// 根据角色获取资源树
export const getDictThTreeBy = query => {
  return service.post(
    `/api/sys/sysDictTh/selectByParentId`, query
  )
};