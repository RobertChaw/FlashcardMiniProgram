<template>
    <nut-cell-group>
        <card-item v-for="card in cards" :card="card"></card-item>
    </nut-cell-group>
</template>

<script setup>

import CardItem from "./Item";
import {ref, provide} from 'vue';

const props = defineProps({
    cards: Array
})


</script>

<style>

</style>
