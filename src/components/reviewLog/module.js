export const REQUEST_REVLOG_LIST_ASYNC = 'REQUEST_REVLOG_LIST_ASYNC'
export const UPDATE_REVLOG_LIST = 'UPDATE_REVLOG_LIST'
export const INSERT_REVLOG_ASYNC = 'INSERT_REVLOG_ASYNC'
export const INSERT_REVLOG = 'INSERT_REVLOG'
import db from '../../utils/db'

const state = {
    revLogItems: [],
}
const getters = {}
const actions = {
    async [REQUEST_REVLOG_LIST_ASYNC]({commit}) {
        await db.collection('rev_logs').get({
            success: ({data, state}) => {
                console.log(state, data)
                commit(UPDATE_REVLOG_LIST, data)
            },
            fail: console.error
        })
    },
    async [INSERT_REVLOG_ASYNC]({commit}, log) {
        await db.collection('rev_logs').add({
            data: log,
            success: ({_id, state}) => {
                console.log(state)
                log._id = _id
                commit(INSERT_REVLOG, log)
            },
            fail: console.error
        })
    }
}
const mutations = {
    [UPDATE_REVLOG_LIST](state, list) {
        state.revLogItems = list
    },
    [INSERT_REVLOG](state, log) {
        state.revLogItems.push(log)
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}
