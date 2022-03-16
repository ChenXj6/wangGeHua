export default (app) => {
    app.directive('permission',{
        mounted (el, binding) {
            // console.log("全局自定义权限指令    ", `元素自身:`, el, '|', `权限控制参数:${binding.value}`);
        }
    })
}