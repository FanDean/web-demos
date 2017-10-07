import ShowBlogs from "./components/ShowBlogs"
import AddBlog from "./components/AddBlog"
import SingleBlog from "./components/SingleBlog"

// 1. 先创建 ShowBlogs 和 AddBlog组件（这里已经创建好了）
// 2. 做好组件和URL的映射
export default [
  {path: "/", component: ShowBlogs},
  {path: "/add", component: AddBlog},
  {path: "/blog/:id", component: SingleBlog}
]
