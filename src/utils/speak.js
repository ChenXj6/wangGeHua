import Speech from 'speak-tts';
import { ref } from 'vue';
const speech = ref(null)
function speakInit () {
  speech.value = new Speech()
  speech.value.setLanguage('zh-CN')
  speech.value.init().then((res) => {
    // console.log(res,'...')
    console.log('语音播报初始化完成...')
  })
}
speakInit()  // 初始化语音播报功能

export default function (text) {
  // console.log(speech.value)
  speech.value.speak({ text })
}
