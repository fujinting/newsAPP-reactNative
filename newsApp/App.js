import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import BottomNavigator from './page/root/rootPage.js'

import newsDetail from './page/home/newsDetail'
import atlasDetail from './page/atlas/atlasDetail'
import videosDetail from './page/video/videosDetail'
import LoginPage from './page/component/LoginPage'
import InvitationPage from './page/component/InvitationPage'

import {
  StatusBar,
} from 'react-native';

<StatusBar backgroundColor={'blue'} />


const AppStack = createStackNavigator(

  {
    BottomNavigator:{
      screen:BottomNavigator,
      navigationOptions:{
        headerShown: false,
      }
    },
    newsDetail:{
      screen:newsDetail

    },
    atlasDetail:{
      screen:atlasDetail
    },
    videosDetail:{
      screen:videosDetail
    },
    LoginPage:{
      screen:LoginPage
    },
    InvitationPage:{
      screen:InvitationPage
    }
  },
 
  {
    mode:'modal',
    headerMode:'none'
  }


);



export default createAppContainer(AppStack);