import {createStore, createLogger} from 'vuex'

import card from '../components/card/module'
import collection from '../components/collection/module'
import reviewLog from '../components/reviewLog/module'

const state = {}

const mutations = {}

const actions = {}

const getters = {}

const store = createStore({
    state,
    mutations,
    actions,
    getters,
    modules: {
        card,
        collection,
        reviewLog
    },
    plugins: [createLogger()]
})

export default store
