export const handleData = (data, commit) => {
  // 当前任务
  const [task] = Object.keys(data)

  // 任务执行器
  const taskRunner = {
    healthRunner() {
      const {
        message: { dataContent }
      } = data[task]
      // 更新状态
      dataContent &&
        commit('updateHealthDegree', {
          prop: task,
          healthDegree: dataContent[0].health
        })
    },
    defaultRunner(mutation) {
      const {
        message: { dataContent }
      } = data[task]
      // 更新状态
      dataContent && commit(mutation, dataContent)
    }
  }

  // 任务映射委托
  const taskMap = {
    // 
    pressureHealthDegree() {
      taskRunner.healthRunner()
    },
  }

  // 执行任务
  if (task in taskMap) {
    taskMap[task]()
  }
}