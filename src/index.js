import tree from './Tree';
const plug = {
    install(Vue, options){
        Vue.component(tree.name, tree)
    }
}
export default plug;