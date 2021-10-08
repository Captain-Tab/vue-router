<template>
  <div id="app">
    <my-link to="/hello">hello</my-link>
    <my-link to="/universal">universal</my-link>
    <my-view />
  </div>
</template>

<script>
import myView from '@/my-router/view'
import myLink from '@/my-router/link'

export default {
  name: 'App',
  components: {
    myView,
    myLink
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
