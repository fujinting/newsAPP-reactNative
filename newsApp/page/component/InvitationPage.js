import React from 'react';
import {StyleSheet,View,Image,Text,AsyncStorage} from 'react-native';

export default class InvitationPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
           
            user_QR:''
        }
    }

    componentDidMount() {
       
        this._getUserDetail();
     
       
    }

    _getUserDetail=()=>{ 
        AsyncStorage.getItem('newsApp-userInformation').then((id) => {
            // alert(value)
            if (id) {
            fetch(`http://10.0.2.2:3000/app/api/users/detail/${id}`)
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({
                        user_QR: responseJson.QR.replace(/localhost/g, '10.0.2.2')
                    })
                    // alert('success')
                })
            }
          })
       
    }
    

    render(){
        return (
            <View>
            
              <View onTouchEnd={() => { this.props.navigation.goBack() }} style={styles.newsReturn}>
                 <Image source={require('../../assets/img/icon/return.png')} style={{ width: 40, height: 40 }} />
             </View>
              
              <View style={{alignItems:'center',marginTop:150}}>
                  <Image source={{uri:this.state.user_QR}} style={{height:100,width:100}}/>
              </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})