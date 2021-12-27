<template>
    <ec-canvas canvas-id='ChartCardTypes' :ec="{onInit}"></ec-canvas>
</template>

<script setup>
import {reactive, ref, computed, watch, watchEffect, inject} from 'vue';
import {useStore} from "vuex";
import * as echarts from "../ec-canvas/echarts";
import util from "../../utils/util";
import MenuCollection from '../MenuCollection'

const menu = inject('menu')

const store = useStore()
const cardList = computed(() => store.state.card.cardItems)
const colList = computed(() => store.state.collection.colItems)

const filteredCardList = computed(() => {
    return cardList.value.reduce((list, item) => {
        const selectedCollectionID = menu.value.selectedCollectionID
        console.log(selectedCollectionID)
        if (item.collection_id == selectedCollectionID)
            list.push(item)

        return list
    }, [])
})

const dpr = util.getPixelRatio()

//统计每个记忆库单词总体熟悉情况的饼形图
function onInit(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    })

    const data = computed(() => {   //Todo:过滤功能未实现
        return filteredCardList.value.reduce((count, item) => {
            if (item.interval >= 180) //间隔大于180天算熟悉
                count[0].value++
            else
                count[1].value++
            return count
        }, [{name: '熟悉', value: 0}, {name: '未熟悉', value: 0}])
    })

    watchEffect(() => {
        chart.setOption({
            series: [{
                data: data.value
            }]
        })
    })

    const option = {
        title: {
            text: '熟悉程度',
            // subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '记忆库',
                type: 'pie',
                radius: '50%',
                data: data.value,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
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
