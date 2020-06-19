
import React from 'react';

import { Text, View, StyleSheet,StatusBar,Image,TouchableOpacity } from 'react-native';

import Video from 'react-native-video';



export default class NewsDetail extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const docid = navigation.getParam("docid");
        this.state = {
            docid,
            detail_data: {},
            content: '',
            paused:false
        }
    }

    
    // 获取数据
    _getNewsDetail() {

        fetch(`http://10.0.2.2:3000/app/api/videos/detail/${this.state.docid}`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    detail_data: responseJson
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
            <View>
               <StatusBar backgroundColor={'black'} />
               <TouchableOpacity onPress={()=>{this.props.navigation.goBack() }} style={{width:50,height:50,position:'absolute',top:5,zIndex:10}}>
                    <Image source={require('../../assets/img/icon/v-return.png')} style={{width:40,height:40,position:'absolute',top:10,zIndex:10}}/>
               </TouchableOpacity>
               <Text style={{color:'gray',fontSize:20,marginLeft:110, position:'absolute',top:80}}>正在加载，请稍等......</Text>
               <Video   
                style={{width:412,height:350}}
                source={{ uri: this.state.detail_data.link }} 
                paused={this.state.paused}//暂停
                repeat={true}//确定在到达结尾时是否重复播放视频。
             >
               
            </Video>
                <TouchableOpacity
                style={{width:100,height:100,position:'absolute',top:120,marginLeft:200,zIndex:10}}
                onPress={()=>{
                    this.setState({
                        paused:!this.state.paused
                    })
                }} >
                        <Image source={require('../../assets/img/icon/v-play.png')} style={this.state.paused ? styles.play1 : styles.play2}/>
                </TouchableOpacity>
              

            </View>
        )
    }
}

let styles = StyleSheet.create({


    newsDetailTop: {
        flexDirection: "row",
        justifyContent: 'space-between',
        height: 65,
        borderBottomWidth: 1,
        paddingTop: 10,
        borderBottomColor: '#cdcdcd'

    },
    newsReturn: {
        flexDirection: 'row'
    },
    newDetailTitle:{
        fontSize:20,
        padding:10,
        fontWeight:'bold'
    },
    fromDate:{
        fontSize:12,
        color:'gray',
        padding:10
    },
    play1:{
        width:40,
        height:40,
        
    },
    play2:{
        width:40,
        height:40,
        display:'none'
    }

})