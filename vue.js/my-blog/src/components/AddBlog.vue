<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <form v-if="!submited">
      <label>博客标题</label>
      <input type="text" v-model="blog.title" required>
      <label>博客内容</label>
      <textarea v-model="blog.content" rows="15" cols="80"></textarea>

      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox"  value="Vue.js" v-model="blog.categories">
        <label>Node.js</label>
        <input type="checkbox"  value="Node.js" v-model="blog.categories">
        <label>React.js</label>
        <input type="checkbox"  value="React.js" v-model="blog.categories">
        <label>Angular4.js</label>
        <input type="checkbox"  value="Angular4.js" v-model="blog.categories">
      </div>

      <label>作者：</label>
      <select v-model="blog.author">
        <option v-for="author in authors">{{author}}</option>
      </select>
      <!-- prevent 可以阻止刷新页面 -->
      <button v-on:click.prevent="post">添加博客</button>
    </form>


    <div v-if="submited">
      <h3>您的博客已经成功添加</h3>
    </div>

<hr>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>
      <p>博客分类</p>
      <ul>
        <li v-for="category in blog.categories">{{category}}</li>
      </ul>
      <p>作者： {{blog.author}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'add-blog',
  data() {
    return {
      blog: {
        title: '',
        content: '',
        categories:[],
        author:""
      },
      authors:[
        "jian",
        "fan",
        "chang"
      ],
      submited: false
    }
  },
  methods:{
    post:function () {
      this.$http.post("http://jsonplaceholder.typicode.com/posts",
        { //post给服务器的对象；根据上述地址返回的 json格式即为需要post的数据格式(数据库保存的格式）
          title:this.blog.title,
          body:this.blog.content,
          userId: 1
        })
        .then(function (data) { //then表示post成功后
          console.log(data);
          this.submited = true;
        });
    }
  }
}
</script>

<style scoped>
#add-blog *{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

  #add-blog{
    margin: 20px auto;
    max-width: 800px;
    padding:20px;
  }

  label{
    display: block;
    margin:20px 0 10px;
  }

  input[type="text"],textarea,select{
    display: block;
    width:100%;
    padding:8px;
  }

  #checkboxes label{
    display: inline-block;
    margin-left:10px;
  }

  select{
    font-size: 1em;
  }

  button{
    display: block;
    margin:20px 0;
    background: crimson;
    color: #fff;
    border: 0;
    padding: 8px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    font-size:18px;
    cursor: pointer;
  }

  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
  }

  h3{
    margin-top:10px;
  }
</style>
