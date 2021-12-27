<template>
    <nut-form>
        <nut-form-item label="记忆库名称">
            <input class="nut-input-text" placeholder="请输入名称" type="text" v-model="form.name"/>
        </nut-form-item>
        <nut-cell>
            <nut-button type="primary" block @click="submit">提交</nut-button>
        </nut-cell>
    </nut-form>
</template>

<script setup>
import {reactive, ref, toRefs, unref, toRaw, watch} from 'vue';
import Taro from '@tarojs/taro'
import {useStore} from "vuex";
import {INSERT_COL_ASYNC, REQUEST_COL_LIST_ASYNC, UPDATE_COL_ASYNC} from "./module";

const store = useStore()

const props = defineProps({
    type: String,
    collection: Object
})

const form = reactive({...props.collection})

function submit() {
    switch (props.type) {
        case 'insert':
            store.dispatch(INSERT_COL_ASYNC, form)
            break
        case 'update':
            store.dispatch(UPDATE_COL_ASYNC, form)
            break
    }
    Taro.navigateBack({detail: 1})
}
</script>

<style scoped>

</style>
