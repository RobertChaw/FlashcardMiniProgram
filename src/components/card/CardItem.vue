<template>
    <nut-cell @click="navigateToEditPage" @longpress="showDropdown">
        <nut-row>
            <nut-col :span="12">
                <text class="card-text">{{ props.card.question }}</text>
            </nut-col>
            <nut-col :span="12">
                <text class="card-text">{{ props.card.answer }}</text>
            </nut-col>
        </nut-row>
    </nut-cell>
</template>

<script setup>
import {reactive, toRefs, unref, inject} from 'vue';
import Taro, {eventCenter} from '@tarojs/taro'
import util from '../../utils/util'
import {UPDATE_CARD_FORM} from "./module";
import {useStore} from "vuex";

const store = useStore()
const props = defineProps({
    card: Object
})


const dropdown = inject('dropdown')

function navigateToEditPage(e) {
    console.log(e, '跳到编辑页面')
    store.commit(UPDATE_CARD_FORM, {type: 'update', card: props.card})
    Taro.navigateTo({
        url: '../../pages/card/edit/index',
    })
}

function showDropdown(e) {
    const data = {
        x: e.detail.x,
        y: e.detail.y,
        type: 'card',
        item: props.card,
    }
    // console.log(data)
    console.log('显示 DropDown')
    dropdown.value.show(data)
}
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
