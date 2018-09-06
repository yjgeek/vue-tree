<template>
  <div id="app">
    <v2-tree :sources="sources" @handleShowModal="handleShowModal">
      <template slot="modal">
      </template>
    </v2-tree>
  </div>
</template>
<script>
import data from './data'
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
