import { ref, onMounted, onUnmounted } from 'vue'
export function useResize() {
    let deviceMap = {
        "(min-width: 990px)" : "desktop",
        "(min-width: 700px) and (max-width: 990px)" : "tablet",
        "(max-width: 700px)" : "mobile"
    }
    let device = ref("desktop");
    function changeHandler(e) {
        if(e.matches) {
            device.value = deviceMap[e.media]
        }
    }
    onMounted( () => {
        Object.keys(deviceMap).forEach(item => {
            const mql = window.matchMedia(item)
            mql.addEventListener("change",changeHandler)
            changeHandler(mql)

        })
    })
    onUnmounted(() => {
        Object.keys(deviceMap).forEach(item => {
            const mql = window.matchMedia(item)
            mql.removeEventListener("change",changeHandler)

        })
    })
 
    return  {device}
}
//返回设备名称