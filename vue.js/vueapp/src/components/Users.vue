<template>
<div class="users">
	<h1>Users</h1>

  <form v-on:submit="addUser">
    <fieldset>
      <h2>添加用户信息</h2>
      <input type="text" placeholder="Enter name" required v-model="newUser.name">
      <input type="email" placeholder="Enter email" required v-model="newUser.email">
      <input type="submit">
    </fieldset>
  </form>

	<!-- 展示用户信息 -->
	<h2>展示用户信息</h2>
	<ul>
		<li v-for="user in users">
      <input type="checkbox" class="toggle" v-model="user.contacted">

      <span :class="{contacted:user.contacted}">
        {{user.name}} : {{user.email}}
        <button type="button" name="button" v-on:click="deleteUser(user)">X</button>
      </span>
    </li>
	</ul>
</div>
</template>

<script>
export default {
	name: "users",
	data() {
		return {
			newUser: {},
			users: [{
					name: "Jian",
					email: "jian@gmail.com",
					contacted: false
				},
				{
					name: "Fan",
					email: "fan@gmail.com",
					contacted: false
				},
				{
					name: "Rui",
					email: "rui@gmail.com",
					contacted: false
				}
			]
		}
	},
	methods: {
		addUser: function(e) {
			// console.log("Hello");
      this.users.push({ //向数组中 push 一个元素
        name:this.newUser.name,
        email:this.newUser.email,
        contacted:false
      });

      //取消点击提交后的事件(刷新的事件)
      e.preventDefault();
		},

    deleteUser:function(user){
      // console.log("Hello");
      this.users.splice(this.users.indexOf(user),1);
    }
	},
  created:function(){
    this.$http.get("https://jsonplaceholder.typicode.com/users")
    .then(function(response){
      // console.log(response);
      this.users = response.data;
    })
  }
}
</script>

//  scoped 用于限定该 style 只能用于当前文件
<style scoped>
  .contacted{
    text-decoration: line-through;
  }
</style>
