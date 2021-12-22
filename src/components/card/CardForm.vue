<template>
    <!--差Picker标签-->
    <nut-form>
        <nut-cell>
            <picker mode="selector" :range="selector" range-key="name" :value="selected" @change="changePicker"
                    :style="{width:'100%'}">
                已选择记忆库: {{ selector[selected].name }}
            </picker>
        </nut-cell>
        <nut-form-item label="正面">
            <nut-textarea v-model="form.question"></nut-textarea>
        </nut-form-item>
        <nut-form-item label="背面">
            <nut-textarea v-model="form.answer"></nut-textarea>
        </nut-form-item>
        <nut-cell>
            <nut-button type="primary" block @click="submit">提交</nut-button>
        </nut-cell>
    </nut-form>
</template>

<script setup>
import {computed, reactive, ref, toRefs, unref, watch, watchEffect} from 'vue';
import Taro from '@tarojs/taro'
import {useStore} from 'vuex'
import {INSERT_COL_ASYNC} from "../collection/module";
import {INSERT_CARD, INSERT_CARD_ASYNC, UPDATE_CARD_ASYNC} from "./module";

console.log('初始化CardForm')
const store = useStore()
const props = defineProps({
    type: String,
    card: Object,
})

const form = reactive({...props.card})

const selector = computed(() => store.state.collection.colItems)
const selected = ref('0')

switch (props.type) {
    case 'insert':
        form.collection_id = selector.value[0]._id
        break
    case 'update':
        for (let i = 0; i < selector.value.length; i++) {
            if (selector.value[i]._id == form.collection_id) {
                selected.value = i
                break
            }
        }
        break
}

const changePicker = (event) => {
    const index = event.detail.value
    selected.value = index
    form.collection_id = selector.value[index]._id
}

const submit = () => {
    switch (props.type) {
        case 'insert':
            store.dispatch(INSERT_CARD_ASYNC, {card: form})
            break
        case 'update':
            store.dispatch(UPDATE_CARD_ASYNC, {card: form})
            break
    }
    Taro.navigateBack({detail: 1})
}
</script>

<style>

</style>
