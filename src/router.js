import Vue from 'vue'
import Router from 'vue-router'
import redLight from '@/components/views/redLight.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            redirect: '/red'
        },
        {
            path: '/red',
            component: redLight,
        },
        {
            path: '/yellow',
            component: () => import('@/components/views/yellowLight.vue'),
        },
        {
            path: '/green',
            component: () => import('@/components/views/greenLight.vue'),
        }
    ]
})