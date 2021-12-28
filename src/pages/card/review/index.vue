<template>
    <view class="remainBar">{{ remains }}</view>

    <view class="card-content">
        <view>{{ curCard?.question }}</view>
        <view :class="{hide:!state.showAnswer }">
            <nut-divider class="divider"></nut-divider>
            <view>{{ curCard?.answer }}</view>
        </view>
    </view>

    <view class="answer-area">
        <nut-row :class="{hide:state.showAnswer}">
            <nut-col :span="24">
                <nut-button shape="square" block type="default" size="large" @click="showAnswer">显示答案
                </nut-button>
            </nut-col>
        </nut-row>

        <nut-row :class="{hide:!state.showAnswer}" @click="qualityConfirm">
            <nut-col :span="6">
                <nut-button shape="square" block type="default" size="large" data-quality="0">重来</nut-button>
            </nut-col>
            <nut-col :span="6">
                <nut-button shape="square" block type="default" size="large" data-quality="3">困难</nut-button>
            </nut-col>
            <nut-col :span="6">
                <nut-button shape="square" block type="primary" size="large" data-quality="4">一般</nut-button>
            </nut-col>
            <nut-col :span="6">
                <nut-button shape="square" block type="default" size="large" data-quality="5">简单</nut-button>
            </nut-col>
        </nut-row>
    </view>

</template>

<script setup>
import {reactive, toRefs, computed, watch, watchEffect} from 'vue';
import {useStore} from "vuex";
import {navigateBack} from "@tarojs/taro";
import {REVIEW_CARD_ASYNC} from "../../../components/card/module";
import util from "../../../utils/util";

const store = useStore()
const state = reactive({
    showAnswer: false
})

const curColl = computed(() => store.state.collection.reviewPage.col)
const dueCardList = computed(() => {
    const cardList = store.state.card.cardItems
    const now = util.now()
    const filteredList = cardList.reduce((list, card) => {

        if (card.collection_id != curColl.value._id)
            return list

        if (now < card.due)
            return list

        list.push(card)
        return list
    }, [])

    const sortedList = filteredList.sort((a, b) => {
        return b.usn - a.usn
        }
    )
    return sortedList
})

const curCard = computed(() => dueCardList.value.pop())

const remains = computed(() => dueCardList.value.length)

watchEffect(() => {
    if (remains.value == 0)
        navigateBack({detail: 1})
})

function showAnswer() {
    state.showAnswer = true
}

function hideAnswer() {
    state.showAnswer = false
}

const qualityConfirm = function () {
    let isProcess = false
    return async function (e) {
        if (isProcess)
            return;
        isProcess = true
        const quality = e.target.dataset.quality
        await store.dispatch(REVIEW_CARD_ASYNC, {quality, card: curCard.value})
        isProcess = false
        hideAnswer()
    }
}()

</script>

<style lang="scss">
.hide {
    display: none;
}

.remainBar {
    text-align: right;
    color: rgb(66, 166, 238);
    background-color: rgb(255, 255, 255);
    padding: 20 rpx 20 rpx 0 0;
    text-decoration: underline;
}

.answer-area {
    position: fixed;
    bottom: 0;
    width: 100%;

}

.card-content {
    text-align: center;
    margin-top: 10%;

    .divider {
        padding: 0 16px;
        width: auto;
    }
}

</style>
