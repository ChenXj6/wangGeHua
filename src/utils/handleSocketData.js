export const handleData = (data, commit) => {
  // 当前任务
  const [task] = Object.keys(data)
  // 任务执行器
  const taskRunner = {
    healthRunner() {
      // console.log(data)
      const {
        message
      } = data[task]
      // console.log(message,'?')
      // 更新状态
      message &&
        commit('updateHealthDegree', {
          prop: task,
          healthDegree: 2,
          eventName:message
        })
    },
    defaultRunner(mutation) {

    }
  }

  // 任务映射委托
  const taskMap = {
    // 
    pressureHealthDegree() {
      // console.log(1)
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