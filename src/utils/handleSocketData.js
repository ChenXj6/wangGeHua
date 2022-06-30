export const handleData = (data, commit) => {
  // 当前任务
  const [task] = Object.keys(data)
  // 任务执行器
  const taskRunner = {
    healthRunner() {
      const {
        remarks,
        eventName,
        cityName,
        cityCode,
        communityName,
        communityCode,
        gridName,
        gridCode,
        streetName,
        streetCode,
        happenTime,
        eventLat,
        eventLong,
        eventContent,
        id,
        eventPlace,
        mainPeopleName,
        mainPeopleAddress,
        mainPeopleCertificateNum,
        aboutPeopleNum,
        eventScope,
        eventFirstType,
      } = data[task]
      let obj = {id,remarks,eventLat,eventLong,eventName,cityName,communityName,gridName,streetName,happenTime,eventContent,eventPlace,cityCode,communityCode,gridCode,streetCode,mainPeopleName,mainPeopleAddress,mainPeopleCertificateNum,aboutPeopleNum,eventScope,eventFirstType}
      // 更新状态
      !!id &&
        commit('updateHealthDegree', [obj])
    },
    defaultRunner(mutation) {

    }
  }

  // 任务映射委托
  const taskMap = {
    // 
    eventName() {
      taskRunner.healthRunner()
    },
    b(){

    }
  }

  // 执行任务
  if (task in taskMap) {
    taskMap[task]()
  }
}