<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <vue-test></vue-test>
  </div>
</template>

<script>
// import { VueTest, test } from '../../dist/vrmaker'
import { VueTest, test } from '../src'
export default {
  name: 'app',
  components: {
    VueTest
  },
  mounted () {
    console.log(test)
    // console.log(vrmaker)
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
  display: flex;
  justify-content: center;
}
.map-container {
  width: 800px;
  height: 600px;
  position: relative;
}
</style>
