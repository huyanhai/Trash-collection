import Vue from 'vue'
import Index from './pages/index'

Vue.config.productionTip = false

Index.mpType = 'app'

const app = new Vue({
    ...Index
})
app.$mount()
