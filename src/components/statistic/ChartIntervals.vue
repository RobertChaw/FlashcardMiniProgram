<template>
    <ec-canvas canvas-id='ChartIntervals' :ec="{onInit}"></ec-canvas>
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
        const diffDays = parseInt(today.diff(item.usn, 'day'))
        if (diffDays >= 30)
            return;
        arr[diffDays].push(item)
    })
    return arr
})

const dpr = util.getPixelRatio()

//统计最近一个月每日复习间隔总和的柱形图
function onInit(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    })

    //记录每日复习时间间隔的累计和的数组
    const data = computed(() => {
        const arr = new Array(30)
        arr.fill(0)
        for (let i = 0; i < 30; i++) {
            arr[i] = lastMonthLog.value[i].reduce((count, item) => {
                return count + item.interval
            }, 0)
        }
        return arr
    })

    watchEffect(() => {
        chart.setOption({
            series: [
                {data: data.value}
            ]
        })
    })

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
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
                axisTick: {
                    alignWithLabel: true
                },
                name: '天前',
                nameLocation: 'middle',
                nameGap: 20
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '累计',
                nameLocation: 'middle',
                nameGap: 25
            }
        ],
        series: [
            {
                name: '间隔累计',
                type: 'bar',
                barWidth: '60%',
                data: data.value
            }
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
