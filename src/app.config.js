export default {
    pages: [
        'pages/index/index',
        'pages/cardExplorer/index',
        'pages/statistics/index',
        'pages/card/edit/index',
        'pages/card/review/index',
        'pages/collection/edit/index',
    ],
    // "subpackages": [
    //     {
    //         "root": "",
    //         "pages": [
    //
    //         ]
    //     }
    // ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'Flashcard',
        navigationBarTextStyle: 'black'
    },
    "tabBar": {
        // "color": "#000000",
        "selectedColor": "#fa3d1b",
        // "backgroundColor": "#000000",
        "list": [{
            "pagePath": 'pages/index/index',
            "text": "首页"
        }, {
            "pagePath": 'pages/cardExplorer/index',
            "text": "卡片浏览器"
        }, {
            "pagePath": 'pages/statistics/index',
            "text": "统计"
        }]
    }
}
