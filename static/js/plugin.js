import config from './config.js';
export  const  plugin = [
    { 
        name:'师资配置',
        key:'teacher',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
                type:2,//背景颜色  1 边框  2 跑马灯
                color:'#f9f9f9',
                more:0,//是否展开
                dataSetting:[],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'师资配置',//文字内容
            pluginData:[ //老师的数据
                {name:'张老师',face:config.staticUrl+ 'h5_img_head_default_big@2x.png',work:'1年经验'},
                {name:'李老师',face:config.staticUrl+ 'h5_img_head_default_big@2x.png',work:'3年经验'},
				{name:'张老师',face:config.staticUrl+ 'h5_img_head_default_big@2x.png',work:'1年经验'},
				{name:'李老师',face:config.staticUrl+ 'h5_img_head_default_big@2x.png',work:'3年经验'},
				{name:'张老师',face:config.staticUrl+ 'h5_img_head_default_big@2x.png',work:'1年经验'},
				{name:'李老师',face:config.staticUrl+ 'h5_img_head_default_big@2x.png',work:'3年经验'}
            ], //内容
        },
             
    },

    {
        name:'图文组件',
        key:'tuwen',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
                type:3,//样式
                more:0,//是否展开
                space:10,//行和行之间的间距
                dataSetting:[
                    {lt:0,lb:0,rt:0,rb:0,bg:'#f9f9f9',color:'#000000',align:1},
				    {lt:0,lb:0,rt:0,rb:0,bg:'#f9f9f9',color:'#000000',align:0} ,//图片所在的位置预留字段部分样式有
			    ],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'图文模块',//文字内容
            pluginData:[ //老师的数据
                {pic:config.staticUrl + 'banner01@2x.png',content:'测试内容'},
				 {pic:config.staticUrl + 'banner02@2x.png',content:'测试内容'}
            ], //内容
        },
              
    },

    
    {
        name:'ICON内容',
        key:'icon',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
                more:0,//是否展开
                dataSetting:[

                ],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'ICON内容',//文字内容
            pluginData:[ //老师的数据
                {icon:config.staticUrl + 'h5_btn_close@2x.png',title:'测试',content:'内容'}
            ], //内容
        },
    },

    {
        name:'口碑点评',
        key:'comment',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
                style: {lt:10,lb:10,rt:10,rb:10,bg:'#f2f2f2',color:'#000000'},
                dataSetting:[
                    //图片所在的位置预留字段部分样式有
                ],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'评价模块',//文字内容
            pluginData:[ //
                {pic:config.staticUrl + 'h5_img_head_default_big@2x.png',content:'老师特别好'},
				 {pic:config.staticUrl + 'h5_img_head_default_big@2x.png',content:'老师特别好1'}
            ], //内容
        },
          
    },

    {
        name:'图文图表',
        key:'table',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
                space:10,//行和行之间的间距
                align:0,//0 左边 1 右边
                dataSetting:[
                    {align:0,space:10,lt:0,lb:0,rt:0,rb:0,plr:10,ptb:10,ft:16,isb:0,w:100,imgW:40,imgH:40,bg:'#f2f2f2',color:'#000000'} //图片所在的位置预留字段部分样式有
                ],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'图文图表',//文字内容
            pluginData:[ //老师的数据
                {pic:config.staticUrl + 'h5_icon_money@3x.png',content:'测试内容'}
            ], //内容
        },
             
    },

    {
        name:'图文轮播',
        key:'tuwenswiper',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
              
                dataSetting:[
                    {lt:0,lb:0,rt:0,rb:0,bg:'#f2f2f2',color:'#ffffff'} //图片所在的位置预留字段部分样式有
                ],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'图文轮播',//文字内容
            pluginData:[ //老师的数据
                {pic:config.staticUrl + 'banner01@2x.png',title:'测试内容',content:'测试内容测试内容测试内容测试内容测试内容测试内容'}
            ], //内容
        }
          
    },

    
    {
        name:'长图文',
        key:'tuwenlong',
        setting:{
            isBg:0,//是否添加背景图片
            bg:{
                photo:'',
                align:0,//1底部 0 顶部
                w:0,
                h:0,
                l:0,
                tb:0,//距离上面或下面
            },
            plugin:{
                space:24,//行间距
                dataSetting:[
                    {
                        titColor:'#333333',
                        titW:100,
                        align:0,
                        lineH:22,
                        titSize:16,
                        titb:0,
                        conColor:'#666666',
                        conSize:14,
                        conLine:18,
                        space:20,
                    } 

                ],//这里放数据对应的设置 
            }
        },
        datas:{ //商户端可以配置的内容部分
            title:'长图文',//文字内容
            pluginData:[ //老师的数据
                {pic:config.staticUrl + 'banner01@2x.png',title:'测试内容',content:'测试内容测试内容测试内容测试内容测试内容测试内容'}
            ], //内容
        }
             
    },

];