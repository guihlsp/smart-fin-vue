import Loading from '@/views/Layout/Loading.vue'

const LoadingPlugin = {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          carregando: false
        }
      },
      methods: {
        startLoading() {
          this.carregando = true
        },
        stopLoading() {
          this.carregando = false
        }
      }
    })

    Vue.component('Loading', Loading)

    Vue.prototype.$startLoading = function () {
      this.startLoading()
    }

    Vue.prototype.$stopLoading = function () {
      this.stopLoading()
    }
  }
}

export default LoadingPlugin
