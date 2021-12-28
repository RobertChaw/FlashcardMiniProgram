<template>
    <nut-row>
        <nut-col span="24">
            <nut-menu>
                <nut-menu-item v-model="selected" :options="options"/>
            </nut-menu>
        </nut-col>
    </nut-row>
</template>

<script setup>
import {reactive, ref, computed, watch, watchEffect} from 'vue';

import {useStore} from "vuex";

const store = useStore()

const selected = ref(0)

const options = computed(() => {
    const collectionList = store.state.collection.colItems
    return collectionList.map(({usn, name, _id}, index) => {
        return {text: name, value: index, _id}
    })
})

const selectedCollectionID = ref(0)

watchEffect(() => {
    selectedCollectionID.value = options.value[selected.value]._id
})

defineExpose({
    selectedCollectionID
})
</script>

<style scoped>

</style>
