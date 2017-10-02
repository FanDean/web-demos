<!-- 模板部分 -->
<template>
  <div id="app">
    <!-- <hello></hello> -->
    <!-- <test msg="这是新的值"></test> -->
    <users></users>
    <img src="./assets/logo.png" width="40">
  </div>
</template>

<!-- 逻辑部分 -->
<script>
import Hello from './components/Hello'
import Test from './components/Test'
import Users from './components/Users'

export default {
  name: 'app',
  components: {
    Hello,
    Test,
    Users
  }
}
</script>

<!--  样式部分 -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
