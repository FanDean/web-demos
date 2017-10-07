<template>
  <nav>
    <ul>
      <li>

        <!-- exact的作用是使其可以切换选中状态 -->
        <router-link to="/" exact>博客</router-link>
        <router-link to="/add" exact>写博客</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

  export default {
    name: "blog-header"
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    text-align: center;
    margin: 0;
  }

  li {
    display: inline-block;
    margin: 0 20px;
  }

  /* 最终 router-link 会产生 a 标签 */
  a {
    color: #fff;
    text-decoration: none;
    padding: 12px;
    border-radius: 5px;
  }

  nav {
    background: crimson;
    padding: 20px 0;
    margin-bottom: 40px;
  }

  .router-link-active {
    background: rgba(255, 255, 255, 0.8);
    color: #444;
  }
</style>

