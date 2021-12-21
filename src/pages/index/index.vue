<template>
    <view class="index">
        <collection-list></collection-list>
    </view>
    <fixed-nav></fixed-nav>
</template>

<script setup>
import {reactive, toRefs, computed, onMounted, ref} from 'vue';
import FixedNav from "../../components/FixedNav";
import CollectionList from "../../components/collection/CollectionList";
import CardList from "../../components/card/CardList";
import Taro, {eventCenter, getCurrentInstance} from '@tarojs/taro'
import {useStore} from 'vuex'

</script>

<style lang="scss">
.index {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //text-align: center;
}
</style>
