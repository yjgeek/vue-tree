<template>
    <div class="tree" id="tree">
      <tree-node
        v-for="(item, i) in sources"
        :key="i"
        :parents="sources"
        :index="i"
        :data="item"
        @handleClick="$emit('handleClick', arguments[0],arguments[1],arguments[2])"
        @handleDblclick="$emit('handleDblclick', arguments[0],arguments[1],arguments[2])"
        @handleAdd="handleAdd"
        @handleRemove="$emit('handleRemove', arguments[0],arguments[1],arguments[2])"
        @handleEdit="handleEdit"
      ></tree-node>
      <template v-if="isShowModal">
          <div class="make"></div>
          <div class="add-modal">
              <div class="modal-content">
                  <div class="title">添加节点</div>
                  <div class="form">
                      <div class="item">
                          <input type="text" v-model="form.name" placeholder="请输入节点名字">
                      </div>
                      <div class="item">
                          <input name="status" type="radio" id="parent" v-model="form.type" :value="1">
                          <label for="parent">添加兄弟节点</label>
                          <input name="status" type="radio" id="child" v-model="form.type" :value="2">
                          <label for="child">添加子节点</label>
                      </div>
                  </div>
                  <div class="footer">
                      <button @click="closeModal">取消</button>
                      <button class="primary" @click="handleSubmit">确定</button>
                  </div>
              </div>
          </div>
      </template>
      <slot name="modal"></slot>
    </div>
</template>
<script>
import TreeNode from "./TreeNode";
export default {
  name: "v2-tree",
  props: {
    sources: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      params:{
        data: {},
        parent: {},
        index: ''
      },
      form:{
        name: "",
        type: 2
      },
      operatingType: '', //操作类型
      isShowModal: false
    };
  },
  methods: {
    //划线
    crossLine () {
      let $tree = document.getElementById("tree");
      if (!$tree) return ;
      let childs = $tree.getElementsByClassName("child");
      let titles = $tree.getElementsByClassName("title");
      let len = childs.length;
      for (let i = 0; i < len; i++) {
        let el = childs[i];
        let nodeLen = el.children.length;
        if (nodeLen > 1) {
          let $firstEl = el.firstChild.children[0].children[0];
          let $lastEl = el.lastChild.children[0].children[0];
          let left = $firstEl.getBoundingClientRect().left;
          let right = $lastEl.getBoundingClientRect().right;
          let leftStep = $firstEl.getBoundingClientRect().width / 2;
          let rightStep = $lastEl.getBoundingClientRect().width / 2;
          let total = right - left - leftStep - rightStep;
          let $line = el.previousElementSibling.children[1];
          $line.style.width = total + 1 + "px";
          $line.style.left = el.firstChild.getBoundingClientRect().width / 2 + "px";
        }
      }
    },
    //关闭弹框的回调
    closeModal () {
      this.isShowModal = false;
      this.form = {
        name: '',
        type: 2
      }
      this.operatingType = '';
    },
    //添加事件，如果有具名modal则发射弹框事件
    handleAdd () {
      if (this.$slots.modal) {
        this.$emit('handleShowModal', 'add', ...arguments)
      } else {
        this.params = {
          data: arguments[0],
          parent: arguments[1],
          index: arguments[2]
        }
        this.isShowModal = true
        this.operatingType = 'add'
      }
    },
    //更改事件，如果有具名modal则发射弹框事件
    handleEdit () {
      if (this.$slots.modal) {
        this.$emit('handleShowModal', 'edit', ...arguments)
      } else {
        this.params = {
          data: arguments[0],
          parent: arguments[1],
          index: arguments[2]
        }
        this.isShowModal = true
        this.form.name = arguments[0].name
        this.operatingType = 'edit'
      }
    },
    handleSubmit () {
      const {params, form, operatingType} = this
      let obj = {
        form,
        params,
        closeModalCallback: this.closeModal
      }
      this.$emit(operatingType=='add'?"handleAdd":"handleEdit", obj)
    }
  },
  components: {
    TreeNode
  },
  watch: {
    sources: {
      handler(val){
        this.$nextTick(() => {
          this.crossLine();
        });
      },
      deep: true
    }
  },
  mounted () {
    window.onresize = this.crossLine;
    this.$nextTick(() => {
      this.crossLine();
    });
  },
  beforeDestroy () {
    window.onresize = null;
  }
};
</script>
<style>
#tree.tree > .tree-node > .title > .name:before {
  height: 0 !important;
}
</style>

<style lang="scss" scoped>
.tree {
  display: flex;
  padding: 0 30px;
  .make {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .add-modal {
    width: 450px;
    height: 230px;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    z-index: 2;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    .title {
      height: 35px;
      text-align: center;
      line-height: 35px;
      font-size: 16px;
      background: #f1f1f1;
      border-bottom: 1px solid #ccc;
    }
    button:focus,
    input:focus {
      outline: none;
    }
    .form {
      padding: 20px;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
      }
      input[type="text"] {
        height: 30px;
        border: 1px dotted #ccc;
        width: 80%;
        padding-left: 10px;
        border-radius: 3px;
      }
      input[type="radio"] {
        width: 20px;
        height: 20px;
        &#child {
          margin-left: 30px;
        }
      }
      label {
        cursor: pointer;
      }
    }
    .footer {
      height: 60px;
      line-height: 60px;
      text-align: center;
      button {
        border: none;
        cursor: pointer;
        height: 35px;
        font-size: 16px;
        padding: 0 15px;
        border-radius: 5px;
        &.primary {
          color: #fff;
          background: #1890ff;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
