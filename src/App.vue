<template>
  <div id="app">
    <v2-tree :sources="sources"></v2-tree>
  </div>
</template>
<script>
import Vue from 'vue'
import data from './data'
// Vue.use(vueTree['default'])
export default {
  name: 'app',
  data () {
    return {
      isShowModal: false,
      sources: data
    }
  },
  methods:{
    handleShowModal(){
      this.isShowModal = true;
    }
  }
}
</script>

<style>
#app{
  padding: 30px;
}
</style>
