import React from 'react';
import {StyleSheet,View,Image,Text,AsyncStorage,DeviceEventEmitter} from 'react-native';
import Swiper from 'react-native-swiper'


export default class MinePage extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            swiper_all:[],
            user_name:'',
            user_avatar:''
        }
    }
    mineData=[
        {txt:'消息通知',  src:require('../../assets/img/mine-icon/1.png')},
        {txt:'我的收藏' ,     src:require('../../assets/img/mine-icon/2.png')},
        {txt:'系统设置' , src:require('../../assets/img/mine-icon/3.png')},
        {txt:'我的关注' ,     src:require('../../assets/img/mine-icon/4.png')},
        {txt:'我的历史' ,     src:require('../../assets/img/mine-icon/5.png')},
        {txt:'.小程序.' ,   src:require('../../assets/img/mine-icon/6.png')},
        {txt:'我的书架' , src:require('../../assets/img/mine-icon/7.png')},
        {txt:'我的钱包' ,     src:require('../../assets/img/mine-icon/8.png')},
        {txt:'.扫一扫.' ,   src:require('../../assets/img/mine-icon/9.png')},
        {txt:'用户反馈' , src:require('../../assets/img/mine-icon/10.png')},
        {txt:'圆梦精灵' , src:require('../../assets/img/mine-icon/11.png')},
        {txt:'玩法攻略' , src:require('../../assets/img/mine-icon/12.png')},
    ]

    static navigationOptions = {
        tabBarLabel:'我的',
        tabBarIcon: ({ focused }) => {
            if(focused){
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/mine_active.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/mine.png')}/>
            )
        }
    }

     // 获取数据
     _getAds() {

        fetch('http://10.0.2.2:3000/app/api/list/ads')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    swiper_all: responseJson[0].items
                })
                // alert('success')
            })
            .catch((error) => {


            });
    }

    componentDidMount() {
        this._getAds();
        this._getUserDetail();
        this.render()
       
    }
   
    _getUserDetail=()=>{ 
        AsyncStorage.getItem('newsApp-userInformation').then((id) => {
            
            if (id) {
            fetch(`http://10.0.2.2:3000/app/api/users/detail/${id}`)
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        user_name: responseJson.username,
                        user_avatar: responseJson.avatar.replace(/localhost/g, '10.0.2.2')
                    })
                    // alert('success')
                })
            }
          })
       
    }
    _showLogin=()=>{
            if(this.state.user_name){
                return(
                    <View style={{marginTop:20,flexDirection:'row',marginLeft:20}}>
                        <Image source={{uri:this.state.user_avatar}} style={styles.avatar}/>
                        <Text style={{fontSize:23,marginTop:15,marginLeft:10,fontWeight:'bold'}}>{this.state.user_name}</Text>
                    </View>
                )
            }else{

                return(
                    <View style={styles.loginBtn}  onTouchStart={()=>{this.props.navigation.navigate('LoginPage',{
                        refresh:()=>{this._getUserDetail()}
                          });}} >
                        <Text style={styles.logintxt}>登录</Text>
                    </View> 
                )
            }
       
    }
    render(){

        return (
            <View style={{height:680}}>

                {/* <View style={styles.loginBtn}  onTouchStart={()=>{this.props.navigation.navigate('LoginPage',{
                    refresh:()=>{this._getUserDetail()}
                      });}} >
                    <Text style={styles.logintxt}>登录</Text>
                </View>  */}

                {
                  
                    this._showLogin()
                }



               <View style={styles.wrapper}>
                <Swiper autoplay={true}
                            key={this.state.swiper_all.length}
                             >
                        {
                                this.state.swiper_all.map(item => {
                                    return (
                                    <View>
                                    <Image height="140" source={{uri:item.image.replace(/localhost/g, '10.0.2.2')}} style={{width:390,height:140,borderRadius:10,margin:10}}/>
                                    </View>
                                    
                                    )
                                })
                        }
                    </Swiper>
               </View>
                

                <View style={{width:400}}> 

                        <Text onTouchStart={()=>{
                             AsyncStorage.removeItem('newsApp-userInformation',(error)=>{error?alert('清除失败'):alert('清除成功')})

                        }} style={{marginLeft:10,marginTop:20,fontSize:18}}>常用</Text> 
                        <View style={styles.mineContent}>
                            {
                              this.mineData.map(item => {
                                return (
                                  <View style={styles.mineItem}>
                                      <View>
                                          <Image source={item.src} style={{width:20,height:20,marginLeft:16}}/>
                                      </View>
                                      <Text style={{marginTop:5,fontSize:15}}>{item.txt}</Text>
                                  </View>
  
                                )
                               })
                            }
                        </View>
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
    loginBtn:{
        width:100,
        height:100,
        backgroundColor:'red',
        borderRadius:50,
        marginTop:25,
        marginLeft:160
    },
    loginBtn1:{
        display:'none'
    },
    logintxt:{
        position:'absolute',
        top:32,
        left:25,
        fontSize:24,
        color:'white'
    },
    wrapper:{
        marginTop:40,
        height:140
    },
    mineContent:{
        marginTop:15,
        flexWrap:'wrap',
        width:400,
        display:"flex",
        flexDirection:'row',
        marginLeft:30
    },
    mineItem:{
        width:100,
        height:90
    },
    avatar:{
        width:60,
        height:60,
        borderRadius:50,
       
    }
})