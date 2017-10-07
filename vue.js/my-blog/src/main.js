// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)


Vue.directive('rainbow', {
  bind(el, binding, vnode) {
    el.style.color = "#" + Math.random().toString(16).slice(2, 8);
  }
})

Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1260px';
    } else if (binding.value == 'narrow') {
      el.style.maxWidth = '560px';
    } else {
      el.style.maxWidth = '800px';
    }

    if (binding.arg == 'column') {
      el.style.background = "#67c";
      el.style.padding = '20px';
    }
  }
})


//
Vue.filter("to-uppercase", function (value) {
  return value.toUpperCase();
})


Vue.filter("snippet", function (value) {
  return value.slice(0, 100) + " ...";
})


//3. 创建路由，通知routes映射关系
const router = new VueRouter({
  routes: Routes,
  mode: "history"
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router:router   //4.把router注册到app内，让app可以识别路由
})
