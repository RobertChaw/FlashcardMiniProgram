<template>
    <nut-cell :title="props.collection.name" @longpress="showDropdown"
              @click="navigateToReviewPage">
        <template v-slot:link>
            <nut-tag round type="danger" v-show="props.remains > 0">{{ props.remains }}</nut-tag>
        </template>
    </nut-cell>
</template>

<script setup>
import {reactive, toRefs, unref, inject, computed} from 'vue';
import Taro from '@tarojs/taro'

const props = defineProps({
    collection: Object,
    remains: Number
})

const dropdown = inject('dropdown')

function navigateToReviewPage(e) {
    console.log(e, '跳到复习页面')
    Taro.navigateTo({
        url: '../../pages/card/review/index'
    })
}

function showDropdown(e) {
    const data = {
        x: e.detail.x,
        y: e.detail.y,
        type: 'collection',
        item: props.collection
    }
    // console.log(data)
    console.log('显示 DropDown')
    dropdown.value.show(data)
}

</script>

<style>

</style>
