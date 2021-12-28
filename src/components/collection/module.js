export const REQUEST_COL_LIST_ASYNC = 'REQUEST_COL_LIST_ASYNC'
export const UPDATE_COL_LIST = 'UPDATE_COL_LIST'
export const UPDATE_COL_ASYNC = 'UPDATE_COL_ASYNC'
export const UPDATE_COL = 'UPDATE_COL'
export const INSERT_COL_ASYNC = 'INSERT_COL_ASYNC'
export const INSERT_COL = 'INSERT_COL'
export const DELETE_COL_ASYNC = 'DELETE_COL_ASYNC'
export const DELETE_COL = 'DELETE_COL'
export const UPDATE_COL_FORM = 'UPDATE_COL_FORM'
export const UPDATE_REV_PAGE = 'UPDATE_REV_PAGE'

import db from '../../utils/db'


const state = {
    colItems: [], form: {
        type: 'insert', col: {}
    }, reviewPage: {
        col: {}
    }
}
const getters = {}
const actions = {
    async [REQUEST_COL_LIST_ASYNC]({commit}) {
        // try {
        const {result} = await wx.cloud.callFunction({
            name: 'queryColList'
        })
        const colList = result.colList
        commit(UPDATE_COL_LIST, colList)
        // } catch (e) {
        //     console.warn(e)
        // }
    },
    async [UPDATE_COL_ASYNC]({commit}, col) {
        //浅拷贝对象
        const cloneCol = {...col}
        delete cloneCol._id

        // try {
        await db.collection('collections').doc(col._id).update({
            data: cloneCol
        })
        commit(UPDATE_COL, col)
        // } catch (e) {
        //     console.warn(e)
        // }
    },
    async [INSERT_COL_ASYNC]({commit}, col) {
        // try {
        const {_id} = await db.collection('collections').add({
            data: col
        })
        col._id = _id
        commit(INSERT_COL, col)
        // } catch (e) {
        //     console.warn(e)
        // }
    },
    async [DELETE_COL_ASYNC]({commit}, {_id}) {
        // try {
        await db.collection('collections').doc(_id).remove()
        commit(DELETE_COL, {_id})
        // } catch (e) {
        //     console.warn(e)
        // }
    }
}

const mutations = {
    [UPDATE_COL_LIST](state, list) {
        // console.log(list)
        state.colItems = list
    },
    [UPDATE_COL](state, col) {
        for (let i = 0; i < state.colItems.length; i++) {
            if (col._id == state.colItems[i]._id) {
                state.colItems.splice(i, 1, col);
                break
            }
        }
    },
    [INSERT_COL](state, col) {
        state.colItems.push(col)
    },
    [DELETE_COL](state, {_id}) {
        for (let i = 0; i < state.colItems.length; i++) {
            if (_id == state.colItems[i]._id) {
                state.colItems.splice(i, 1);
                break
            }
        }
    },
    [UPDATE_COL_FORM](state, {type, col}) {
        state.form.type = type
        state.form.col = (col ? col : {})
    },
    [UPDATE_REV_PAGE](state, {col}) {
        state.reviewPage.col = col
    }
}

export default {
    state, getters, actions, mutations
}
