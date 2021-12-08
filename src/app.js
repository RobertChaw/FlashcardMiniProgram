import {createApp} from 'vue'
import {Button, Toast} from '@nutui/nutui-taro';
import {Tabbar, TabbarItem} from '@nutui/nutui-taro';
import {Icon} from '@nutui/nutui-taro';
import {Layout, Row, Col} from '@nutui/nutui-taro';
import {Cell} from '@nutui/nutui-taro';
import {Badge} from '@nutui/nutui-taro';
import {Input} from '@nutui/nutui-taro';
import {TextArea} from '@nutui/nutui-taro';
import {Divider} from '@nutui/nutui-taro';

import '@nutui/nutui-taro/dist/style.css';

import './app.scss'

const App = createApp({
    onShow(options) {
    },
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Toast)
    .use(Tabbar).use(TabbarItem)
    .use(Icon)
    .use(Layout).use(Row).use(Col)
    .use(Cell)
    .use(Badge)
    .use(Input)
    .use(TextArea)
    .use(Divider)
export default App
