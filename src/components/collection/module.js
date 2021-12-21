export const REQUEST_COL_LIST_ASYNC = 'REQUEST_COL_LIST_ASYNC'
export const UPDATE_COL_LIST = 'UPDATE_COL_LIST'
export const UPDATE_COL_ASYNC = 'UPDATE_COL_ASYNC'
export const UPDATE_COL = 'UPDATE_COL'
export const INSERT_COL_ASYNC = 'INSERT_COL_ASYNC'
export const INSERT_COL = 'INSERT_COL'
export const DELETE_COL_ASYNC = 'DELETE_COL_ASYNC'
export const DELETE_COL = 'DELETE_COL'
export const UPDATE_COLL_FORM = 'UPDATE_COLL_FORM'
import db from '../../utils/db'


const state = {
    colItems: [],
    form: {
        type: 'insert',
        coll: {}
    }
}
const getters = {}
const actions = {
    async [REQUEST_COL_LIST_ASYNC]({commit}) {
        await db.collection('collections').get({
            success: ({data, state}) => {
                //清除不必要的属性
                for (let i = 0; i < data.length; i++) {
                    delete data[i]._openid
                }

                commit(UPDATE_COL_LIST, data)
            },
            fail: console.error
        })
    },
    async [UPDATE_COL_ASYNC]({commit}, col) {
        //浅拷贝对象
        const cloneCol = {...col}
        delete cloneCol._id

        await db.collection('collections').doc(col._id).update({
            data: cloneCol,
            success: ({state}) => {
                // console.log(state)
                commit(UPDATE_COL, col)
            },
            fail: console.error
        })
    },
    async [INSERT_COL_ASYNC]({commit}, col) {
        await db.collection('collections').add({
            data: col,
            success: ({_id, state}) => {
                // console.log(state)
                col._id = _id
                commit(INSERT_COL, col)
            },
            fail: console.error
        })
    },
    async [DELETE_COL_ASYNC]({commit}, {_id}) {
        await db.collection('collections').doc(_id).remove({
            success: ({state}) => {
                // console.log(state)
                commit(DELETE_COL, {_id})
            },
            fail: console.error
        })
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
    [UPDATE_COLL_FORM](state, {type, coll}) {
        state.form.type = type
        state.form.coll = (coll ? coll : {})
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
