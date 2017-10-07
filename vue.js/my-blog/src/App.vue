<template>
<div id="app">
  <!--<add-blog></add-blog>-->
  <!--<show-blogs></show-blogs>-->
  <blog-header></blog-header>
  <router-view></router-view>
</div>
</template>

<script>
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'
// import SingleBlog from './components/SingleBlog'

export default {
  name: 'app',
  components: {
    AddBlog,ShowBlogs,BlogHeader 
    //,SingleBlog
  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
