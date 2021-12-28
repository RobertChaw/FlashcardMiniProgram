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
        // try {
        const {result} = await wx.cloud.callFunction({
            name: 'queryRevLogList'
        })
        const revLogList = result.revLogList
        commit(UPDATE_REVLOG_LIST, revLogList)
        // } catch (e) {
        //     console.warn(e)
        // }
    },
    async [INSERT_REVLOG_ASYNC]({commit}, log) {
        // try {
        const {_id} = await db.collection('rev_logs').add({
            data: log,
        })
        log._id = _id
        commit(INSERT_REVLOG, log)
        // } catch (e) {
        //     console.warn(e)
        // }
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
