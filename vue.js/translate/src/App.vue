<template>
  <div id="app">
    <h1>在线翻译</h1>
    <h5 class="text-muted">简单 / 易用 / 便捷</h5>
    <TranslateForm v-on:formSubmit1="translateText"></TranslateForm>
    <TranslateOutput v-text="translatedText"></TranslateOutput>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld'
import TranslateForm from './components/TranslateForm'
import TranslateOutput from './components/TranslateOutput'



export default {
  name: 'app',
  data:function () {
    return{
      translatedText:""
    }
  },
  components: {
    TranslateForm,TranslateOutput
  },
  methods:{
    translateText:function (text,language) {
//      alert("App");
//      alert(text);
      this.$http.
      get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171028T141321Z.118179ec98c10e1e.5b623ec54463e5f4e8a03bc729cb1a10d9a3aaa1&lang=' + language + '&text=' + text).
      then((response)=>{
//        console.log(response.body.text[0]);
        this.translatedText = response.body.text[0];
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
