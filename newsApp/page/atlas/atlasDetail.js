
import React from 'react';

import { Text, View, Image, StyleSheet, ScrollView,StatusBar } from 'react-native';

import Swiper from 'react-native-swiper'


export default class AtlasDetail extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const docid = navigation.getParam("docid");
        this.state = {
            docid,
            detail_data: {},
            swiper_all:[]
        }
    }

    // 获取新闻推荐的详情
    // 获取数据
    _getNewsDetail() {

        fetch(`http://10.0.2.2:3000/app/api/atlas/detail/${this.state.docid}`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    detail_data: responseJson,
                    swiper_all: responseJson.items
                })

                // alert('success')
            })
            .catch((error) => {


            });
    }

    componentDidMount() {
        this._getNewsDetail();
    }
    render() {
        return (
            <View style={styles.atlas}>
                <StatusBar backgroundColor={'black'} />
                <View style={styles.atlasDetailTop}>
                    <Image onTouchEnd={() => { this.props.navigation.goBack() }} source={require('../../assets/img/icon/cross.png')}  style={{width:35,height:35}} />    
                    <Image onTouchEnd={() => { alert('不支持此功能，请在真机运行！') }} source={require('../../assets/img/icon/more.png')} style={{ width: 35, height: 35, marginTop: 5, marginRight: 8 }} />
                </View>
                <Swiper loop={false} activeDotColor='black' dotColor='black' style={styles.wrapper} >
                       {
                            this.state.swiper_all.map(item => {
                                return (
                                  <View>
                                   <Image source={{uri:item.image.replace(/localhost/g, '10.0.2.2')}} style={{width:409,height:350}}/>
                                   <Text style={{marginTop:15,color:'#fff',fontSize:15}}>{item.text}</Text>
                                  </View>
                                 
                                )
                            })
                        }
                </Swiper>

            </View>
        )
    }
}

let styles = StyleSheet.create({

  atlas:{
    backgroundColor:'#000',
    height:680
  },
  atlasDetailTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:80,
    paddingTop:20
  },
  wrapper:{
    marginTop:30,
    borderWidth:1,
    borderColor:'black'
  }

})