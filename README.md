# vue-tree

**先来看下效果图:**
![vue树形结构展示插件](http://p3x5m4etk.bkt.clouddn.com/1536200555123w3nqi8dix3)

**安装:**
```js
$ npm install v2-tree
```
**引入方式:**
```js
import Tree from "v2-tree"

const Tree = require("v2-tree");

<script src="./dist/tree.js"></script>
```


## API
|属性|说明|类型|默认值|
|-|-|-|-|
|sources|数据结构|Array|[]|
|onClick|单击节点的回调函数|Function(data,parent,index)|-|
|add|添加节点的回调函数，注意如果是自定义弹框(showModal)，此回调无效|Function({params, obj, closeModalCallback})|-|
|remove|删除节点的回调函数|Function(data, parent, index)|-|
|showModal|显示自定义添加节点弹框回调函数,必须要有具名插槽slot="modal"|Function(data, parent, index)|-|
|slot|具名插槽，请看slot用法|-|-|

### Slot

适用于自定义添加弹框节点

|名称|说明|
|-|-|
|modal|自定义添加弹框|

示例: 
[点击跳转到我的博客查看吧](http://www.yjgeek.com/article/2018-09-06/vue%E6%A0%91%E5%BD%A2%E7%BB%93%E6%9E%84(%E9%87%91%E5%AD%97%E5%A1%94)%E6%8F%92%E4%BB%B6)

## License
[MIT](http://opensource.org/licenses/MIT)