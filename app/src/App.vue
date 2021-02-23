<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Dashboard from './components/Dashboard.vue'
import $ from 'jquery'
export default {
  name: 'App',
  components: {
    Dashboard
  }
}
$(window).scroll(function() {
  var scrolledY = $(window).scrollTop();
  $('body').css('background-position', 'center ' + ((scrolledY)) + 'px');
});
</script>

<style>
  @import './assets/styles/global.css';
</style>
