<template>
  <div id="single-blog">
	<h1>{{blog.title}}</h1>
	<article>{{blog.body}}</article>
  </div>
</template>

<script>
export default {
  name:"single-blog",
  data(){
	  return{
		//   this.$route.params.id
		  id:this.$route.params.id,
		  blog:{}
	  }
  },
  created(){
	  this.$http.get("http://jsonplaceholder.typicode.com/posts/" + this.id)
	  .then(function(data){
		//   console.log(data);
		this.blog = data.body;
	  })
  }
}
</script>

<style scoped>
#single-blog{
	max-width: 960px;
	margin: 0 auto;
}

#single-blog>article{
	border: 1px dotted #aaa;
	padding: 20px;
	background: #eee;
}
</style>

