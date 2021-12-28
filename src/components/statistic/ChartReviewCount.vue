<template>
    <ec-canvas canvas-id='ChartReviewCount' :ec="{onInit}"></ec-canvas>
</template>

<script setup>
import {reactive, ref, computed, watchEffect, inject} from 'vue';
import dayjs from "dayjs";
import {useStore} from "vuex";
import * as echarts from "../ec-canvas/echarts";
import util from "../../utils/util";
import MenuCollection from '../MenuCollection'

const menu = inject('menu')
const store = useStore()

const revLogList = computed(() => store.state.reviewLog.revLogItems)
const cardList = computed(() => store.state.card.cardItems)
const colList = computed(() => store.state.collection.colItems)
const today = dayjs().endOf('day')

const cardCollMap = computed(() => {
    const map = new Map()

    cardList.value.forEach(item => {
        map.set(item._id, item.collection_id)
    })

    return map
})

const filteredLogList = computed(() => {
    const arr = []

    revLogList.value.forEach(item => {
        const selectedCollectionID = menu.value.selectedCollectionID
        if (cardCollMap.value.get(item.card_id) == selectedCollectionID) {
            arr.push(item)
        }
    })

    return arr
})

const lastMonthLog = computed(() => {
    const arr = Array.from({length: 30}, () => [])
    filteredLogList.value.forEach(item => {
        const diffTime = parseInt(today.diff(item.usn, 'day'))
        if (diffTime >= 30)
            return;
        arr[diffTime].push(item)
    })
    return arr
})

const dpr = util.getPixelRatio()

//统计最近一个月每日复习数量的柱形图
function onInit(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    })

    const seriesDataList = computed(() => {
        const arr = []
        arr[0] = {name: "重来", data: new Array(30).fill(0, 0, 30)}
        arr[1] = {name: "困难", data: new Array(30).fill(0, 0, 30)}
        arr[2] = {name: "一般", data: new Array(30).fill(0, 0, 30)}
        arr[3] = {name: "简单", data: new Array(30).fill(0, 0, 30)}

        lastMonthLog.value.forEach((day, nowDiff) => {
            day.forEach((item) => {
                switch (item.quality) {
                    case '0':
                        arr[0].data[nowDiff]++
                        break
                    case '3':
                        arr[1].data[nowDiff]++
                        break
                    case '4':
                        arr[2].data[nowDiff]++
                        break
                    case '5':
                        arr[3].data[nowDiff]++
                        break
                }
            })
        })
        return arr
    })

    watchEffect(() => {
        chart.setOption({
            series: seriesDataList.value
        })
    })

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: Array.from(Array(30).keys()),
                name: '天前',
                nameLocation: 'middle',
                nameGap: 20
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '数量',
                nameLocation: 'middle',
            }
        ],
        series: [
            {
                name: '简单',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: seriesDataList.value[3].data
            },
            {
                name: '一般',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: seriesDataList.value[2].data
            },
            {
                name: '困难',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: seriesDataList.value[1].data
            },
            {
                name: '重来',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series'
                },
                data: seriesDataList.value[0].data
            },
        ]
    };

    chart.setOption(option)

    return chart
}
</script>

<style>
/*ec-canvas {*/
/*    width: 100%;*/
/*    height: 100%;*/
/*}*/
</style>
