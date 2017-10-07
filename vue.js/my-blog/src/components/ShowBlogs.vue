<template>
  <div id="show-blogs" v-theme:column="'null'">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="关键字">
    <div v-for="blog in filteredBlogs" class="single-blog">

      <router-link v-bind:to="'/blog/' + blog.id">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>

      <article>
        {{blog.body | snippet}}
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data() {
    return {
      blogs: [],
      search: ""
    }
  },
  created() { //在此请求数据
    //      this.$http.get('http://jsonplaceholder.typicode.com/posts')
    this.$http.get('../../static/blogs') // 下载好的json数据需放到 static 文件夹下才能访问
      .then(function(data) {
        //          console.log(data);
        this.blogs = data.body.slice(0, 10);
        //          console.log(this.blogs);
      })
  },
  computed: { //使用计算属性实现过滤功能(而非过滤器)
    filteredBlogs: function() {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      })
    }
  }
}
</script>


<style>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
  /*padding:20px;*/
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-decoration: none;
}


input[type="text"]{
  padding: 8px;
  width: 100%;
  /* 关键 */
  box-sizing: border-box;
}
</style>
