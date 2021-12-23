<template>
    <nut-fixednav v-model:visible="visible" :nav-list="navList" @selected="goto"
                  :position="{bottom:'70px' }" un-active-text="快速添加" active-text="收起"/>
</template>

<script setup>
import {reactive, ref} from 'vue';
import Taro, {eventCenter} from '@tarojs/taro'
import util from "../utils/util";
import {useStore} from "vuex";
import {UPDATE_CARD_FORM} from "./card/module";
import {UPDATE_COL_FORM} from "./collection/module";

const store = useStore()
const visible = ref(false)
const navList = reactive([
    {
        id: 1,
        text: '新增记忆库',
        icon: ''
    },
    {
        id: 2,
        text: '新增卡片',
        icon: ''
    }
]);

function goto({item, event}) {
    console.log(item, event)
    switch (item.id) {
        case 1:
            //新增记忆库事件
            store.commit(UPDATE_COL_FORM, {type: 'insert'})
            Taro.navigateTo({
                url: '../collection/edit/index',

            })
            break
        case 2:
            //新增卡片事件
            store.commit(UPDATE_CARD_FORM, {type: 'insert'})
            Taro.navigateTo({
                url: '../card/edit/index',
            })
            break
    }
}
</script>

<style scoped>

</style>
