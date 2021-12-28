<template>
    <nut-cell @click="navigateToEditPage" @longpress="showActionSheet">
        <nut-row>
            <nut-col :span="12">
                <text class="card-text">{{ props.card.question }}</text>
            </nut-col>
            <nut-col :span="12">
                <text class="card-text">{{ props.card.answer }}</text>
            </nut-col>
        </nut-row>
    </nut-cell>
    <nut-actionsheet v-model:visible="state.actionsheet.visible" :menu-items="state.actionsheet.menuItems"
                     :choose-tag-value="state.actionsheet.chooseTagValue" @choose="chooseItem"></nut-actionsheet>
    <nut-notify v-model:visible="state.notify.show" :msg="state.notify.msg" type="primary"/>
</template>

<script setup>
import {reactive, toRefs, unref, inject} from 'vue';
import Taro, {eventCenter} from '@tarojs/taro'
import util from '../../utils/util'
import {DELETE_CARD_ASYNC, UPDATE_CARD_FORM} from "./module";
import {useStore} from "vuex";

const store = useStore()
const props = defineProps({
    card: Object
})

const state = reactive({
    actionsheet: {
        visible: false,
        menuItems: [
            {
                name: '删除',
                value: 0
            }
        ],
        chooseTagValue: '删除'
    }, notify: {
        show: false,
        msg: ''
    },
})

function navigateToEditPage(e) {
    store.commit(UPDATE_CARD_FORM, {type: 'update', card: props.card})
    Taro.navigateTo({
        url: '../../pages/card/edit/index',
    })
}

function showActionSheet() {
    state.actionsheet.visible = true

}

function chooseItem(item, index) {
    console.log(item)
    switch (item.name) {
        case '删除':
            store.dispatch(DELETE_CARD_ASYNC, {_id: props.card._id})
            state.notify.show = true
            state.notify.msg = '删除成功'
            break
    }
};

</script>

<style>
.card-text {
    display: -webkit-box;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>
