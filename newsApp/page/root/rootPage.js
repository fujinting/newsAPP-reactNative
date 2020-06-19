import React from 'react'
import {Text} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import HomePage from '../home/homePage'
import AtlasPage from '../atlas/atlasPage'
import VideoPage from '../video/videosPage'
import TaskPage from  '../task/taskPage'
import MinePage from '../mine/minePage'




const BottomNavigator = createBottomTabNavigator({
    Home:{
        screen:HomePage,
        navigationOptions:{
            title:'首页',
            tabBarLabel:'首页',
           
           
        }
    },
    Atlas:{
        screen:AtlasPage,
        navigationOptions:{
            title:'图集',
            tabBarLabel:'图集'
        }
    },
    Video:{
        screen:VideoPage,
        navigationOptions:{
            title:'视频',
            tabBarLabel:'视频'
        }
    },
    Task:{
        screen:TaskPage,
        navigationOptions:{
            title:'任务',
            tabBarLabel:'任务'
        }
    },
    Mine:{
        screen:MinePage,
        navigationOptions:{
            title:'我的',
            tabBarLabel:'我的'
        }
    }
},{
    tabBarOptions:{
        showIcon:true,
        activeTintColor:'red'
    }
})

export default BottomNavigator;