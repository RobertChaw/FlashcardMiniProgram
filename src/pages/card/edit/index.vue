<template>
    <card-form :card="card" :type="type"></card-form>
</template>

<script setup>
import CardForm from "../../../components/card/CardForm";
import Taro, {eventCenter} from '@tarojs/taro'
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
const card = computed(() => store.state.card.form.card)
const type = computed(() => store.state.card.form.type)

console.log('编辑卡片页面')
</script>

<style scoped>

</style>
