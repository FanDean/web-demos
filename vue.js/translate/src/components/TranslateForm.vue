<template>
  <div id="translateForm" class="row">
    <div class="col-md-6 col-md-offset-3">
      <form v-on:submit="formSubmit" class="well form-inline" id="transForm">
        <input class="form-control" type="text" v-model="textToTranslate" placeholder="输入要翻译的内容">
        <select class="form-control" v-model="language">
          <option value="en">English</option>
          <option value="zh">Chinese</option>
          <option value="ru">Russian</option>
          <option value="ko">Korean</option>
          <!--<option value="ja">Japanese</option>-->
        </select>
        <input class="btn btn-primary" type="submit" value="翻译">
      </form>
    </div>
  </div>
</template>

<script>
  //import HelloWorld from './components/HelloWorld'

  export default {
    name: 'translateForm',
    data: function () {
      return {
        textToTranslate: "",
        language: ""
      }
    },
    methods: {
      formSubmit: function (e) {
//        alert(this.textToTranslate);
        //第一个参数为注册的事件名；第二个参数为传递的数据
        this.$emit("formSubmit1", this.textToTranslate, this.language);
        //取消默认事件，这里指取消点击提交后的自动刷新
        e.preventDefault();
      }
    },
    created: function () {
      this.language = "en"
    }
  }
</script>

<style>
  #transForm {
    border-radius: 10px;
    border: 1px #ccc solid;
  }
</style>
