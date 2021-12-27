export const REQUEST_CARD_LIST_ASYNC = 'REQUEST_CARD_LIST'
export const UPDATE_CARD_LIST = 'UPDATE_CARD_LIST'
export const REVIEW_CARD_ASYNC = 'REVIEW_CARD_ASYNC'
export const UPDATE_CARD_ASYNC = 'UPDATE_CARD_ASYNC'
export const UPDATE_CARD = 'UPDATE_CARD'
export const INSERT_CARD_ASYNC = 'INSERT_CARD_ASYNC'
export const INSERT_CARD = 'INSERT_CARD'
export const DELETE_CARD_ASYNC = 'DELETE_CARD_ASYNC'
export const DELETE_CARD = 'DELETE_CARD'
export const UPDATE_CARD_FORM = 'UPDATE_CARD_FORM'
import db from '../../utils/db'
import supermemo2 from '../../utils/supermemo2'
import {INSERT_REVLOG_ASYNC} from "../reviewLog/module";
import util from "../../utils/util";

const state = {
    cardItems: [],
    form: {
        type: 'insert',
        card: {}
    },
}
const getters = {}
const actions = {
    async [REQUEST_CARD_LIST_ASYNC]({commit}) {
        try {
            const {result} = await wx.cloud.callFunction({
                name: 'queryCardList'
            })
            const cardList = result.cardList
            console.log(result)
            commit(UPDATE_CARD_LIST, cardList)
        } catch (e) {
            console.warn(e)
        }
    },
    async [REVIEW_CARD_ASYNC]({commit, dispatch}, {quality, card}) {
        //更新卡片
        const {factor, schedule, isRepeatAgain} = supermemo2(quality, card.interval, card.factor)
        const usn = util.now()
        const newCard = {
            ...card,
            factor,
            schedule,
            usn,
            // queue: (!isRepeatAgain ? 0 : 1)  //0 = 学习，1 = 重新学习
        }
        if (!isRepeatAgain)
            newCard.due = util.addDays(util.now(), schedule)

        const task1 = dispatch(UPDATE_CARD_ASYNC, {card: newCard})

        //添加复习记录
        const log = {
            card_id: card._id,
            interval: card.interval,
            last_interval: schedule,
            factor: card.factor,
            quality: quality,
            usn: util.now(),
        }

        const task2 = dispatch(INSERT_REVLOG_ASYNC, log)

        await Promise.all([task1, task2])
    },
    async [UPDATE_CARD_ASYNC]({commit}, {card}) {
        console.log(card)
        //浅拷贝对象
        const cloneCard = {...card}
        delete cloneCard._id
        db.collection('cards').doc(card._id).update({
            data: cloneCard,
            success: ({state}) => {
                console.log(state)
                commit(UPDATE_CARD, card)
            },
            fail: console.error
        })
    },
    async [INSERT_CARD_ASYNC]({commit}, {card}) {
        //为卡片添加默认字段
        card = {
            collection_id: card.collection_id,
            question: card.question,
            answer: card.answer,
            interval: 1,
            factor: 2.5,
            due: util.now(),
            usn: util.now(),
        }
        db.collection('cards').add({
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
        db.collection('cards').doc(_id).remove({
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
        // console.log(list)
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
    [UPDATE_CARD_FORM](state, {type, card}) {
        state.form.type = type
        state.form.card = (card ? card : {})
    }
}

export default {
    state, getters, actions, mutations
}
