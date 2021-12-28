<template>
    <nut-cell-group>

        <nut-row>
            <nut-col :span="24">
                <nut-menu>
                    <nut-menu-item v-model="selectedIndex" :options="options"/>
                </nut-menu>
            </nut-col>
        </nut-row>

        <nut-cell>
            <nut-searchbar v-model="searchValue"></nut-searchbar>
        </nut-cell>
        <nut-cell>
            <nut-row :style="{color:'gray',}">
                <nut-col :span="12">
                    <text>问题</text>
                </nut-col>
                <nut-col :span="12">
                    <text>答案</text>
                </nut-col>
            </nut-row>
        </nut-cell>

        <card-list :cards="cards"></card-list>
    </nut-cell-group>

    <fixed-nav></fixed-nav>
</template>

<script setup>
import {reactive, toRefs, computed, ref, watchEffect, watch} from 'vue';
import FixedNav from "../../components/FixedNav";
import CardList from "../../components/card/List";
import {useStore} from 'vuex'

const store = useStore()
const selectedIndex = ref(0)
const searchValue = ref('')

const options = computed(() => {
    const collectionList = store.state.collection.colItems
    return collectionList.map(({usn, name, _id}, index) => {
        return {text: name, value: index, _id}
    })
})

const cards = computed(() => {
    const selectedId = options.value[selectedIndex.value]._id
    const keyword = searchValue.value
    const cardList = store.state.card.cardItems
    const filteredCardList = cardList.filter(card => {
        if (card.collection_id != selectedId)
            return false

        return card.question.includes(keyword) || card.answer.includes(keyword)
    })
    return filteredCardList
})

</script>

<style>

</style>
