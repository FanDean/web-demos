<template>
  <div id="show-blogs" v-theme:column="'wide'">
    <h1>博客总览</h1>
    <div v-for="blog in blogs" class="single-blog">
      <h2 v-rainbow>{{blog.title}}</h2>
      <article>
        {{blog.body}}
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'show-blogs',
    data() {
      return {
        blogs: []
      }
    },
    created() { //在此请求数据
//      this.$http.get('http://jsonplaceholder.typicode.com/posts')
      this.$http.get('../../static/blogs') // 下载好的json数据需放到 static 文件夹下才能访问
        .then(function (data) {
//          console.log(data);
          this.blogs = data.body.slice(0, 10);
//          console.log(this.blogs);
        })
    }
  }
</script>


<style>
  #show-blogs {
    max-width: 800px;
    margin: 0 auto;
  }

  .single-blog {
    padding: 20px;
    margin:20px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #eee;
  }
</style>
