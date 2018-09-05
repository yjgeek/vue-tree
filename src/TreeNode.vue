<template>
    <div class="tree-node">
        <div class="title" @click="handleClick">
            <div :class="[
                'name',
                data.childs?data.childs.length>1?'double-line':data.childs.length==1?'one-line':'not-line':'not-line'
            ]">
                {{data.name}}
                <div class="group">
                    <span @click.stop="addChild">
                        <img src="data:image/png;base64,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" alt="">
                    </span>
                    <span @click.stop="removeItem">
                        <img class="delete" src="data:image/png;base64,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" alt="">
                    </span>
                </div>
            </div>
            <div class="line" v-if="data.childs && data.childs.length>1"></div>
        </div>
        <div class="child" v-if="data.childs && data.childs.length">
            <tree-node v-for="(item, i) in data.childs" :parents="data.childs" :key="i" :index="i" :data="item">
            </tree-node>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tree-node',
    props: ['data', 'parents', 'index'],
    data(){
        return {
            interval: null
        }
    },
    methods:{
        addChild(data){
            GLOBAL.vbus.$emit('addChild', this.data, this.parents, this.index);
        },
        removeItem(data){
            GLOBAL.vbus.$emit('removeItem', this.data, this.parents, this.index);
        },
        handleClick(data){
            GLOBAL.vbus.$emit("handleClick", this.data, this.parents, this.index);
        }
    }
}
</script>
<style lang="scss" scoped>
.tree-node{
    position: relative;
    &+&{
        margin-left: 40px;
    }
    &:not(:first-of-type):not(:last-of-type){
        >.title>.name:before{
            width: 1px;
            left: 50%;
            position: absolute;
            height: 20px;
            border-left: 1px solid #000;
            content: '';
            top: -22px;
            transform: translateY(1px)
        }
    }
    .title{
        text-align: center;
        margin-bottom: 40px;
        font-size: 0;
        position: relative;
        .name.one-line:after,.name.double-line:after{
            width: 1px;
            left: 50%;
            position: absolute;
            height: 40px;
            border-left: 1px solid #000;
            content: '';
            top: 100%;
            transform: translateY(1px)
        }
        .name.double-line:after{
            height: 20px;
        }
        .line{
            position: absolute;
            height: 1px;
            bottom: -20px;
            border-bottom: 1px solid #000;
            &:before,&:after{
                position: absolute;
                height: 20px;
                width: 1px;
                top: 2px;
                border-left: 1px solid #000;
                content: '';
            }
            &:before{
                left: 0;
            }
            &:after{
                right: -1px;
            }
        }
        .name{
            display: inline-block;
            border: 1px solid #f54422;
            padding: 5px 15px;
            font-size: 16px;
            position: relative;
            cursor: pointer;
            position: relative;
            &:hover{
                .group{
                    display: flex;
                }
            }
            .group{
                position: absolute;
                left: 100%;
                top: -1px;
                display: none;
                z-index: 2;
                transform: translateX(1px);
                background: #f1f1f1;
                box-sizing: border-box;
                span{
                    padding: 6px;
                    &:hover{
                        background: #f6f6f6;
                    }
                    img{
                        display: block;
                        width: 16px;
                        height: 16px;
                        &.delete{
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }
        }
    }
    .child{
        display: flex;
    }
}
</style>
