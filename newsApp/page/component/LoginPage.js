import React from 'react';
import {StyleSheet,View,Image,Text,StatusBar,TouchableOpacity,TextInput,AsyncStorage } from 'react-native';

export default class LoginPage extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            detail_data:{},
            swiper_all:[],
            account:'',
            password:''
        }
    }
   

    
    _login=()=>{
        if(this.state.account !=='' && this.state.password !==''){
            fetch(`http://10.0.2.2:3000/app/api/users/login/account=${this.state.account}&password=${this.state.password}`,
    
            )
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length!==0){
                    // alert('success')
                    AsyncStorage.setItem('newsApp-userInformation',responseJson._id)
                  
        
                    this.props.navigation.goBack()
                    this.props.navigation.state.params.refresh();
                    
    


                }else{
                    alert('账号或密码错误！')
                }
            })
            .catch((error) => {
                alert('网络错误')

            });
        }else{
            alert('请输入密码或账号！')
        }
    }

    render(){

        return (
            <View>
                <StatusBar backgroundColor={'black'} />
                <TouchableOpacity onPress={()=>{
                     this.props.navigation.goBack()
                    this.props.navigation.state.params.refresh();
                    }}>
                    <Image source={require('../../assets/img/icon/cross.png')} style={{width:35,height:35}}/>
                </TouchableOpacity>
                <Text style={{position:'absolute',right:10,fontSize:18,top:5}}>注册</Text>
               <View style={{alignItems:'center',marginTop:50}}>
                   <Image source={require('../../assets/img/headImg/timg.jpg')} style={{height:50,width:50}}/>
                   <Text style={{fontSize:19,marginTop:5}}>登录立即领红包</Text>
               </View>

               <View style={{alignItems:'center',marginTop:25}}>
                    <TextInput onChangeText={(text) => {
                        this.setState({
                            account: text
                        });
                    }} value={this.state.account} style={styles.account} placeholder='账号'/>
                    <TextInput onChangeText={(text) => {
                        this.setState({
                            password: text
                        });
                    }} value={this.state.password} secureTextEntry={true} style={styles.password} placeholder='密码' />
               </View>
                <View onTouchEnd={this._login} style={styles.submitBtn}>
                    <Text style={styles.submitBtnTxt}>登录</Text>
                </View>
               <View onTouchEnd={()=>{
                   AsyncStorage.removeItem('newsApp-userInformation',(error)=>{error?alert('清除失败'):alert('清除成功')})
               }} style={{marginTop:100}}><Text>清除本地缓存</Text></View>

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
        marginTop:35,
        marginLeft:160
    },
    logintxt:{
        position:'absolute',
        top:32,
        left:25,
        fontSize:24,
        color:'white'
    },
    account:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdbdb',
        width:350,
        fontSize:20
    },
    password:{
        borderBottomWidth:1,
        borderBottomColor:'#dbdbdb',
        width:350,
        fontSize:20
    },
    submitBtn:{
        marginTop:50,
        width:350,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        marginLeft:30,
        borderRadius:5

    },
    submitBtnTxt:{
        color:'#fff',
        paddingTop:10,
        fontSize:20,
        fontWeight:'bold'
    }
})