import {createApp} from 'vue'
import {Button, Toast} from '@nutui/nutui-taro';
import {Tabbar, TabbarItem} from '@nutui/nutui-taro';
import {Icon} from '@nutui/nutui-taro';
import {Layout, Row, Col} from '@nutui/nutui-taro';
import {Cell, CellGroup} from '@nutui/nutui-taro';
import {Badge} from '@nutui/nutui-taro';
import {Input} from '@nutui/nutui-taro';
import {TextArea} from '@nutui/nutui-taro';
import {Divider} from '@nutui/nutui-taro';
import {Tag} from '@nutui/nutui-taro';
import {FixedNav} from '@nutui/nutui-taro';
import {Menu, MenuItem} from '@nutui/nutui-taro';
import {OverLay} from '@nutui/nutui-taro';
import {Tabs, TabPane} from '@nutui/nutui-taro';
import {Notify} from '@nutui/nutui-taro';
import {Form, FormItem} from '@nutui/nutui-taro';
import {SearchBar} from '@nutui/nutui-taro';
import {ActionSheet, Popup} from '@nutui/nutui-taro';
import store from "./store/store";

import '@nutui/nutui-taro/dist/style.css';


import './app.scss'
import Taro from '@tarojs/taro'
import {REQUEST_COL_LIST_ASYNC} from "./components/collection/module";
import {REQUEST_CARD_LIST_ASYNC} from "./components/card/module";
import {REQUEST_REVLOG_LIST_ASYNC} from "./components/reviewLog/module";


const App = createApp({
    onShow(options) {
        const store = this.$store
        store.dispatch(REQUEST_COL_LIST_ASYNC)
        store.dispatch(REQUEST_CARD_LIST_ASYNC)
        store.dispatch(REQUEST_REVLOG_LIST_ASYNC)
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
App.use(Button).use(Toast)
    .use(Tabbar).use(TabbarItem)
    .use(Icon)
    .use(Layout).use(Row).use(Col)
    .use(Cell).use(CellGroup)
    .use(Badge)
    .use(Input)
    .use(TextArea)
    .use(Divider)
    .use(Tag)
    .use(FixedNav)
    .use(Menu).use(MenuItem)
    .use(OverLay)
    .use(Tabs).use(TabPane)
    .use(Notify)
    .use(Form).use(FormItem)
    .use(SearchBar)
    .use(ActionSheet).use(Popup)

export default App
