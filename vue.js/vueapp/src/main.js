// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入 vue
import Vue from 'vue'
// 引入文件 App.vue
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Users from './components/Users'
import Test from './components/Test'


//使用中间件
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

//设置路由
const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
    {path:"/", component:Users},
    {path:"/test", component:Test},
  ]
})


/* eslint-disable no-new */
// new Vue({
  // el: '#app',
  // template: '<App/>',
  // components: { App }
// })

new Vue({
  router,
  template: `
    <div id="app">
      <ul>
        <li>
          <router-link to="/">Users</router-link>
          <router-link to="/test">Test</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  `
}).$mount("#app")
