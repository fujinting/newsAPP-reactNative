import React from 'react';
import {StyleSheet,View,Image,Text,StatusBar,TextInput} from 'react-native';
import ScrollableTabView,
{
    DefaultTabBar,
    ScrollableTabBar
} from 'react-native-scrollable-tab-view';

import VideoRecommend from '../component/VideoRecommend'
import VideoOther from '../component/VideoOther'

export default class VideoPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {


        }
    }
    tabArr = [
        { columnName: '影视', requestCode: 'movie' },
        { columnName: '游戏', requestCode: 'game' },
        { columnName: '娱乐', requestCode: 'play' },
        { columnName: '音乐', requestCode: 'music ' },
        { columnName: '综艺', requestCode: 'variety' },
        { columnName: 'VLOG', requestCode: 'vlog' },
        { columnName: '美食', requestCode: 'food' },
        { columnName: '宠物', requestCode: 'pet' },
        { columnName: '搞笑', requestCode: 'funny' },
        { columnName: '体育', requestCode: 'sport ' },
       
    ];

    static navigationOptions = {
        tabBarLabel:'视频',
        tabBarIcon: ({ focused }) => {
            if(focused){
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/video_active.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/video.png')}/>
            )
        }
    }

    render(){
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor={'red'} />
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.topText}>山东新闻</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <Image source={require('../../assets/img/icon/search.png')} style={{ width: 20, height: 20, marginTop: 10, marginLeft: 6 }} />
                        <TextInput style={styles.search} placeholder="搜索你感兴趣的视频吧">

                        </TextInput>
                    </View>

                </View>

                <View style={{ flex: 1 }}>
                    <ScrollableTabView
                        tabBarTextStyle={{ fontSize: 17 }}
                        tabBarUnderlineStyle={{ backgroundColor: 'red' }}
                        tabBarActiveTextColor='red'
                        renderTabBar={() => <ScrollableTabBar />}


                    >
                        
                        <VideoRecommend navigation={this.props.navigation} tabLabel="推荐"></VideoRecommend>

                        {
                            this.tabArr.map(item => {
                                return (
                                    <VideoOther navigation={this.props.navigation} tabLabel={item.columnName} requestCode={item.requestCode}>{item.columnName}</VideoOther>
                                )
                            })
                        }

                    </ScrollableTabView>


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarIcon:{
        width:21,
        height:21,
    },
    topBar: {
        backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70
    },
    topText: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#fff'
    },
    searchContainer: {
        width: 280,
        height: 40,
        backgroundColor: '#fff',
        flexDirection: "row",
        borderRadius: 50,
        marginLeft:3
    },
    search: {
        backgroundColor: '#fff',
        width: 230,
        height: 40,
        color: '#000',
        marginLeft: 6


    },
})