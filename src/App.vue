<template>
  <div id="app">
    <v2-tree :sources="sources" @handleRemove="removeItem" @handleAdd="addChild"></v2-tree>
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
    /**
     * 添加节点
     * params: {
     *  type: 1|2     1是添加兄弟节点 2是添加节点
     *  name: '金字塔'   节点名称
     * }
     * obj: {
     *  data: {}    当前操作的对象
     *  parent: []  当前操作的对象的父级数据
     *  index: 1    当前操作对象的索引
     * }
     * closeModalCallback   关闭弹窗的回调参数
     */
    addChild({params, form, closeModalCallback}) {
      if (form.type == 2) {
        if(!params.data.childs){
          this.$set(params.data, 'childs', []);
        }
        params.data.childs.push({name: form.name})
      } else {
        params.parent.push({name: form.name})
      }
      closeModalCallback();
    },
    /***  
     *  删除节点
     *  data: {}    当前操作的对象
     *  parent: []  当前操作的对象的父级数据
     *  index: 1    当前操作对象的索引
     */
    removeItem(data, parent, index) {
      parent.splice(index, 1)
    },
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
