<template>
    <nut-cell-group title="记忆库">
        <collection-item v-for="collection in collectionList" :collection="collection"
                         :remains="remainsOfCollList[collection._id]"></collection-item>
    </nut-cell-group>
    <management-drop-down ref="dropdown"></management-drop-down>
</template>

<script setup>
import CollectionItem from './CollectionItem'
import ManagementDropDown from "../../components/ManagementDropDown";
import {ref, provide, computed} from 'vue';
import {useStore} from 'vuex';
import {REQUEST_COL_LIST_ASYNC} from "./module";

const dropdown = ref(null)
provide('dropdown', dropdown)

const store = useStore()

const collectionList = computed(() => {
    return store.state.collection.colItems
})

//返回统计每个记忆库逾期未复习卡片
const remainsOfCollList = computed(() => {
    const cards = store.state.card.cardItems
    return cards.reduce((() => {
        const now = new Date()
        return (count, card) => {
            let index = card.collection_id
            if (count[index] == undefined)
                count[index] = 0
            if (now > card.due)
                count[index]++
            return count
        }
    })(), {})
})

</script>

<style>

</style>
