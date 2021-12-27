<template>
    记忆库编辑页面
    <collection-form :type="type" :collection="col"></collection-form>
</template>

<script setup>
import CollectionForm from "../../../components/collection/Form";
import Taro, {eventCenter} from '@tarojs/taro'
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
console.log(store)
const col = computed(() => store.state.collection.form.col)
const type = computed(() => store.state.collection.form.type)

console.log('编辑记忆库页面')

</script>

<style scoped>

</style>
