import { useStore } from 'vuex'

function useEmit(params) {
  const store = useStore()
  const ws = store.state.ws
  const data = {
    data: `${JSON.stringify(params)}`,
  }
  ws.emit(data)
}

export default useEmit