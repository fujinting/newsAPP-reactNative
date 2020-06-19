import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList,ImageBackground } from 'react-native';


let page = 1

export default class VideoOther extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      refreshing:false


    }
  }

  // 获取数据
  getData = () => {
    let category = this.props.requestCode;

    fetch(`http://10.0.2.2:3000/app/api/list/videos/other/category=${category}&page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        //  alert(responseJson)
        this.setState({
          data: this.state.data.concat(responseJson).reverse(),
          refreshing:false

        })

        // alert('success')
      })
      .catch((error) => {
        // console.error(error);
        // alert('failed')

      });
  }

  componentDidMount() {
    this.getData();

  }
  _renderRefresh=()=>{
    this.setState({refreshing: true}); //开始刷新
    this.getData();
  }

  // 渲染操作单个数据
 renderData = ({ item }) => {
  let docid = item._id
  let last = item.image.split('/').pop()

   return (


     <View style={styles.item}>
      
          <ImageBackground source={{ uri: 'http://10.0.2.2:3000/uploads/' + last }} style={{ width: 412, height: 240 }} >
             <View style={styles.itemText}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <TouchableOpacity style={{width:400}} onPress={()=>{this.props.navigation.navigate('videosDetail', {docid}); }}>
                 <Image source={require('../../assets/img/icon/play.png')} style={styles.start}/>
              </TouchableOpacity>
              <Text style={styles.play}>  {(item.play) >9999 ? (Math.floor((item.play)/1000)/10)+'万' : (item.play)} 播放</Text>
             </View>
          </ImageBackground>
      
     </View>





   )
 }







 // 上拉加载更多数据..
 _onEndReached() {
   //  alert('加载更多')

   page = page + 1

   this.getData()
 }



 render() {
   // alert(this.state.data)
   if (!this.state.data) {
     return (<Text>没数据啊</Text>);
   }
   return (
     <FlatList showsVerticalScrollIndicator={false}
       style={styles.recom}
       data={this.state.data}
       renderItem={this.renderData}
       onEndReachedThreshold={0.1}
       onEndReached={this._onEndReached.bind(this)}
       refreshing={ this.state.refreshing }
       onRefresh={this._renderRefresh } />
   );
 }

}

let styles = StyleSheet.create({
  item: {
    width: 412,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginBottom:10

  },
  itemText: {
    width: 210,
    flexDirection: 'column',
  },
  itemTitle: {
    fontSize: 18,
    color:'white',
    width:310,
    marginTop:20,
    fontWeight:'bold',
    marginLeft:10
  },
  start:{
    width:50,
    height:50,
    marginTop:45,
    marginLeft:190
  },
  play: {
    marginTop: 70,
    fontSize: 13,
    color: 'white',
    fontWeight:'bold'
  }
})
