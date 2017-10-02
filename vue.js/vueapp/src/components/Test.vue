<template>
	<div class="test">
		<h1>Test</h1>
		<!-- 获取数据 -->
		<h2>{{title}}</h2>
		<p>{{user.firstName}}</p>
		<p v-text="user.lastName"></p>

		<!-- v-if指令 -->
		<p v-if="showName">firstName: {{user.firstName}} v-if</p>
		<!-- v-else -->
		<p v-else="showName">lastName: {{user.lastName}} v-else</p>
		<!-- v-for -->
		<ul>
			<li v-for="item in items">{{item.title}}</li>
		</ul>

		<!-- v-on 事件 -->
		<!-- 点击事件 -->
		<button v-on:click="greet('Hello Jian')">Say Greeting</button>
		<!-- 键盘事件 -->
		<input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
		<br>
		<hr>

		<!-- computed 计算属性 -->
		<label>First Name:</label>
		<input type="text" v-model="user.firstName">
		<br>
		<label>Last Name:</label>
		<input type="text" v-model="user.lastName">
		<br>
		<h3>{{fullName}}</h3>


	</div>
</template>

<script>
	export default{
		name: "test",
		//name之后的属性可以一次次添加,而不必同时添加
		data(){ //所有的数据在这里实现
			return {
				title:"Hello Vue.js!",
				user:{
					firstName:"chang",
					lastName: "jian"
				},
				showName: false,
				items:[
					{title: "item 1"},
					{title: "item 2"},
					{title: "item 3"}
				]
			}
		},
		methods:{ //所有的方法在这里实现
			greet:function(greeting){
				alert(greeting);
			},
			pressKey:function(){
				console.log("Pressed....");
			},
			enterHit:function(){
				console.log("You pressed enter key!");
			}
		},
		computed:{ // 计算属性
			fullName:function(){
				return this.user.firstName + this.user.lastName;
			}
		}

	}
</script>

//  scoped 用于限定该 style 只能用于当前文件
<style scoped>

</style>
