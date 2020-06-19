import React from 'react';
import {StyleSheet,View,Image,Text,AsyncStorage} from 'react-native';

export default class TaskPage extends React.Component {

    static navigationOptions = {
        tabBarLabel:'任务',
        tabBarIcon: ({ focused }) => {
            if(focused){
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/task_active.png')} />
                );
            }
            return (
                <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/task.png')}/>
            )
        }
    }
    _inviTa=()=>{
        AsyncStorage.getItem('newsApp-userInformation').then((id) => {
            if(id){
                this.props.navigation.navigate('InvitationPage')
            }else{
                alert('请先登录')
            }
        })
    }

    render(){
        return (
            <View>
                <View style={{marginTop:200,alignItems:'center',width:400}}>
                <Text onPress={this._inviTa} style={{fontSize:20}}>邀请</Text>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarIcon:{
        width:21,
        height:21,
    }
})