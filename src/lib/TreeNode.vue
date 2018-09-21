<template>
    <div class="tree-node">
        <div class="title" @click="$emit('handleClick', data, parents, index)" @dblclick="$emit('handleDblclick', data, parents, index)">
            <div :class="[
                'name',
                data.childs?data.childs.length>1?'double-line':data.childs.length==1?'one-line':'not-line':'not-line'
            ]">
                {{data.name}}
                <div class="group">
                    <span @click.stop="$emit('handleAdd', data, parents, index)">
                        <img src="data:image/png;base64,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" alt="">
                    </span>
                    <span @click.stop="$emit('handleRemove', data, parents, index)">
                        <img class="delete" src="data:image/png;base64,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" alt="">
                    </span>
                    <span @click.stop="$emit('handleEdit', data, parents, index)">
                        <img class="edit" src="data:image/png;base64,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" alt="">
                    </span>
                </div>
            </div>
            <div class="line" v-if="data.childs && data.childs.length>1"></div>
        </div>
        <div class="child" v-if="data.childs && data.childs.length">
            <tree-node 
                v-for="(item, i) in data.childs"
                :parents="data.childs"
                :key="i"
                :index="i"
                :data="item"
                @handleClick="$emit('handleClick', arguments[0],arguments[1],arguments[2])"
                @handleDblclick="$emit('handleDblclick', arguments[0],arguments[1],arguments[2])"
                @handleAdd="$emit('handleAdd', arguments[0],arguments[1],arguments[2])"
                @handleRemove="$emit('handleRemove', arguments[0],arguments[1],arguments[2])"
                @handleEdit="$emit('handleEdit', arguments[0],arguments[1],arguments[2])"
            />
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
                        &.delete,&.edit{
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
        justify-content: center;
    }
}
</style>
