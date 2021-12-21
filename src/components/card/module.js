export const REQUEST_CARD_LIST_ASYNC = 'REQUEST_CARD_LIST'
export const UPDATE_CARD_LIST = 'UPDATE_CARD_LIST'
export const REVIEW_CARD_ASYNC = 'REVIEW_CARD_ASYNC'
export const UPDATE_CARD_ASYNC = 'UPDATE_CARD_ASYNC'
export const UPDATE_CARD = 'UPDATE_CARD'
export const INSERT_CARD_ASYNC = 'INSERT_CARD_ASYNC'
export const INSERT_CARD = 'INSERT_CARD'
export const DELETE_CARD_ASYNC = 'DELETE_CARD_ASYNC'
export const DELETE_CARD = 'DELETE_CARD'
import db from '../../utils/db'
import supermemo2 from '../../utils/supermemo2'
import {INSERT_REVLOG_ASYNC} from "../reviewLog/module";
import util from "../../utils/util";


const state = {
    cardItems: []
}
const getters = {}
const actions = {
    async [REQUEST_CARD_LIST_ASYNC]({commit}) {
        await db.collection('cards').get({
            success: ({data, state}) => {
                console.log(state, data)
                commit(UPDATE_CARD_LIST, data)
            },
            fail: console.error
        })
    },
    async [REVIEW_CARD_ASYNC]({commit, dispatch}, {quality, card}) {
        //更新卡片
        const {factor, schedule, isRepeatAgain} = supermemo2(quality, card.interval, card.factor)
        const newCard = {
            ...card,
            factor,
            schedule,
            queue: (!isRepeatAgain ? 0 : 1)  //0 = 学习，1 = 重新学习
        }
        if (!isRepeatAgain)
            newCard.due = util.addDays(card.due, schedule)
        const task1 = dispatch(UPDATE_CARD_ASYNC, newCard)

        //添加复习记录
        const log = {
            card_id: card.id,
            interval: card.interval,
            last_interval: newCard.schedule,
            factor: card.factor,
            quality: quality,
            usn: new Date(),
        }
        log.last_interval = schedule
        const task2 = dispatch(INSERT_REVLOG_ASYNC, log)

        await Promise.all([task1, task2])
    },
    async [UPDATE_CARD_ASYNC]({commit}, card) {
        await db.collection('cards').doc(card._id).update({
            data: card,
            success: ({state}) => {
                console.log(state)
                commit(UPDATE_CARD, card)
            },
            fail: console.error
        })
    },
    async [INSERT_CARD_ASYNC]({commit}, card) {
        await db.collection('cards').add({
            data: card,
            success: ({_id, state}) => {
                console.log(state)
                card._id = _id
                commit(INSERT_CARD, card)
            },
            fail: console.error
        })
    },
    async [DELETE_CARD_ASYNC]({commit}, {_id}) {
        await db.collection('cards').doc(_id).remove({
            success: ({state}) => {
                console.log(state)
                commit(DELETE_CARD, {_id})
            },
            fail: console.error
        })
    },
}
const mutations = {
    [UPDATE_CARD_LIST](state, list) {
        state.cardItems = list
    },
    [UPDATE_CARD](state, card) {
        for (let i = 0; i < state.cardItems.length; i++) {
            if (card._id == state.cardItems[i]._id) {
                state.cardItems.splice(i, 1, card);
                break
            }
        }
    },
    [INSERT_CARD](state, card) {
        state.cardItems.push(card)
    },
    [DELETE_CARD](state, {_id}) {
        for (let i = 0; i < state.cardItems.length; i++) {
            if (_id == state.cardItems[i]._id) {
                state.cardItems.splice(i, 1);
                break
            }
        }
    },
}

export default {
    state, getters, actions, mutations
}