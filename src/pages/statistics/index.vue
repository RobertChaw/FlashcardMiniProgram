<template>
    <view class="container">
        <menu-collection ref="menu"></menu-collection>
        <nut-tabs v-model="tabValue">
            <nut-tabpane title="概况">
                <chart-review-count></chart-review-count>
            </nut-tabpane>
            <nut-tabpane title="间隔">
                <chart-intervals></chart-intervals>
            </nut-tabpane>
            <nut-tabpane title="类型">
                <chart-card-types></chart-card-types>
            </nut-tabpane>
        </nut-tabs>
    </view>
</template>

<script setup>
import {useStore} from 'vuex'
import ChartCardTypes from '../../components/statistic/ChartCardTypes'
import ChartReviewCount from '../../components/statistic/ChartReviewCount'
import ChartIntervals from '../../components/statistic/ChartIntervals'
import * as echarts from '../../components/ec-canvas/echarts'
import {reactive, ref, computed, provide} from 'vue';
import MenuCollection from '../../components/MenuCollection'

const store = useStore()

const tabValue = ref(0)

const menu = ref(null)

provide('menu', menu)
</script>

<style>
page {
    height: 100%;
}

.container {
    display: flex;
    flex-flow: column;
    height: 100%;
}

.nut-tabs {
    flex: 1 1 auto;
}

.nut-tabs__content {
    flex: 1 1 auto;
}
</style>
