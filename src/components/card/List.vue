<template>
    <nut-cell-group>
        <card-item v-for="card in cards" :card="card"></card-item>
    </nut-cell-group>
    <management-drop-down ref="dropdown"></management-drop-down>
</template>

<script setup>
import ManagementDropDown from "../../components/ManagementDropDown";
import CardItem from "./Item";
import {ref, provide} from 'vue';

const props = defineProps({
    cards: Array
})
const dropdown = ref(null)
provide('dropdown', dropdown)

</script>

<style>

</style>
