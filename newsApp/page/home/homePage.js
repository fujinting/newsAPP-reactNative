import React from 'react';
import { StyleSheet, View, Image, Text, TextInput,StatusBar} from 'react-native';
import ScrollableTabView,
{
    DefaultTabBar,
    ScrollableTabBar
} from 'react-native-scrollable-tab-view';



import HomeRecommend from '../component/HomeRecommend'
import HomeOther from '../component/HomeOther'




export default class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {


        }
    }
    tabArr = [
        { columnName: '热点', requestCode: 'hot' },
        { columnName: '财经', requestCode: 'finance' },
        { columnName: '健康', requestCode: 'health' },
        { columnName: '娱乐', requestCode: 'play' },
        { columnName: '女人', requestCode: 'women' },
        { columnName: '军事', requestCode: 'military' },
        { columnName: '游戏', requestCode: 'game' },
        { columnName: '汽车', requestCode: 'car' },
        { columnName: '科技', requestCode: 'science' },
        { columnName: '文化', requestCode: 'culture' }
    ];

    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/home_active.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/home.png')} />
            )
        }
    }
    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={'red'} />
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.topText}>山东新闻</Text>
                    </View>

                    <View style={styles.searchContainer}>
                        <Image source={require('../../assets/img/icon/search.png')} style={{ width: 20, height: 20, marginTop: 10, marginLeft: 6 }} />
                        <TextInput style={styles.search} placeholder="搜索你感兴趣的新闻吧">

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
                        
                        <HomeRecommend navigation={this.props.navigation} tabLabel="推荐"></HomeRecommend>

                        {
                            this.tabArr.map(item => {
                                return (
                                    <HomeOther navigation={this.props.navigation} tabLabel={item.columnName} requestCode={item.requestCode}>{item.columnName}</HomeOther>
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
    tabBarIcon: {
        width: 21,
        height: 21,
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
    smallNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 600,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 20,
        paddingTop: 6
    },
    textActive: {
        color: 'red', paddingTop: 4, fontSize: 21
    }

})