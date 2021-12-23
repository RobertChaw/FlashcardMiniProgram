<template>
    <view class="mgmt-background" :class="{show:state.show}" @click="hide">
        <view class="mgmt-dropdown" :style="{left:state.x,top:state.y}" @click="operate">
            <view>
                <nut-button shape="square" plain block type="default" data-id="1" v-if="state.type == 'collection'">
                    重命名
                </nut-button>
            </view>
            <view>
                <nut-button shape="square" plain block type="default" data-id="2">删除</nut-button>
            </view>
        </view>
    </view>
    <nut-notify v-model:visible="state.notify.show" :msg="state.notify.msg" type="primary"/>
</template>

<script setup>
import {reactive} from 'vue';
import Taro, {eventCenter} from '@tarojs/taro'
import util from "../utils/util";
import {useStore} from "vuex";
import {DELETE_COL_ASYNC} from "./collection/module";
import {DELETE_CARD_ASYNC} from "./card/module";
import {UPDATE_COL_FORM} from "./collection/module";

const store = useStore()

const state = reactive({
    show: false,
    x: 0,
    y: 0,
    type: '',
    notify: {
        show: false,
        msg: ''
    },
    currentItem: {}
})


function show({x, y, type, item}) {
    // console.log('显示DropDown')
    state.show = true
    state.x = x + 'px'
    state.y = y + 'px'
    state.type = type
    state.currentItem = item
    // console.log('x:', x)
    // console.log('y:', y)
    // console.log('type:', type)
    // console.log('item:', item)
}

function hide() {
    console.log('隐藏DropDown')
    state.show = false
}

function operate(e) {
    console.log("已按按钮", e.target.dataset.id)
    switch (e.target.dataset.id) {
        case '1':
            //下拉菜单编辑记忆库事件
            console.log("跳转到记忆库编辑页")
            store.commit(UPDATE_COL_FORM, {type: 'update', col: state.currentItem})
            Taro.navigateTo({
                url: '../collection/edit/index',
            })
            break
        case '2':
            //下拉菜单删除按键事件
            switch (state.type) {
                case 'collection':
                    store.dispatch(DELETE_COL_ASYNC, {_id: state.currentItem._id})
                    break
                case 'card':
                    store.dispatch(DELETE_CARD_ASYNC, {_id: state.currentItem._id})
                    break
            }
            state.notify.show = true
            state.notify.msg = '删除成功'
            break
    }
}

defineExpose({
    show
})
</script>

<style>
.mgmt-background {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0);
    height: 100%;
    width: 100%;
    z-index: 2000;
}

.mgmt-dropdown {
    position: absolute;
    top: 0;
    left: 0;
    width: 260 rpx;
}

.show {

    display: block;
}
</style>
