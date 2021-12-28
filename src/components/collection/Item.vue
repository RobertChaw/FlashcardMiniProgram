<template>
    <nut-cell :title="props.collection.name" @longpress="showActionSheet"
              @click="navToReviewPage">
        <template v-slot:link>
            <nut-tag round type="danger" v-show="props.remains > 0">{{
                    (props.remains < 100 ? props.remains : '100+')
                }}
            </nut-tag>
        </template>
    </nut-cell>
    <nut-actionsheet v-model:visible="state.actionsheet.visible" :menu-items="state.actionsheet.menuItems"
                     :choose-tag-value="state.actionsheet.chooseTagValue" @choose="chooseItem"></nut-actionsheet>
    <nut-notify v-model:visible="state.notify.show" :msg="state.notify.msg" type="primary"/>
</template>

<script setup>
import {reactive, toRefs, unref, inject, computed} from 'vue';
import Taro from '@tarojs/taro'
import {useStore} from "vuex";
import {DELETE_COL_ASYNC, UPDATE_COL_FORM, UPDATE_REV_PAGE} from "./module";
import {DELETE_CARD_ASYNC} from "../card/module";

const store = useStore()
const props = defineProps({
    collection: Object,
    remains: Number
})

const state = reactive({
    actionsheet: {
        visible: false,
        menuItems: [
            {
                name: '重命名',
                value: 0
            }, {
                name: '删除',
                value: 1
            }
        ],
        chooseTagValue: '删除'
    }, notify: {
        show: false,
        msg: ''
    },
})


function navToReviewPage(e) {
    if (!props.remains || props.remains < 1)
        return;
    console.log(e, '跳到复习页面')
    store.commit(UPDATE_REV_PAGE, {col: props.collection})
    Taro.navigateTo({
        url: '../../pages/card/review/index'
    })
}

function showActionSheet() {
    state.actionsheet.visible = true

}

function chooseItem(item, index) {
    console.log(item)
    switch (item.name) {
        case '重命名':
            store.commit(UPDATE_COL_FORM, {type: 'update', col: props.collection})
            Taro.navigateTo({
                url: '../collection/edit/index',
            })
            break
        case '删除':
            store.dispatch(DELETE_COL_ASYNC, {_id: props.collection._id})
            state.notify.show = true
            state.notify.msg = '删除成功'
            break
    }
};

</script>

<style>

</style>
