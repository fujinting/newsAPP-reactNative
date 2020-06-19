import React from 'react';
import { StyleSheet, View, Image, Text, TextInput,StatusBar, FlatList, TouchableWithoutFeedback } from 'react-native';

let page = 1

export default class AtlasPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          data: [],
          page: 1,
          refreshing:false

    
        }
      }
    

    static navigationOptions = {
        tabBarLabel:'图集',
        tabBarIcon: ({ focused }) => {
            if(focused){
                return (
                    <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/atlas_active.png')} />
                );
            }
            return (
                   <Image style={styles.tabBarIcon} source={require('../../assets/img/icon/atlas.png')}/>
            )
        }
    }

    // 获取数据
  getData() {

    fetch(`http://10.0.2.2:3000/app/api/list/atlas/page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        //  alert(responseJson)
        this.setState({
          data: this.state.data.concat(responseJson),
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
 
     let last = item.items[0].image.split('/').pop()
 
 
     return (
 
 
         <TouchableWithoutFeedback onPress={() => {this.props.navigation.push('atlasDetail', {docid});}}>
             <View style={styles.item}>
                <Image source={{ uri: 'http://10.0.2.2:3000/uploads/' + last }} style={{ width: 412, height: 230 }} />
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.from}>{item.website}  {(item.read) >9999 ? (Math.floor((item.read)/1000)/10)+'万' : (item.read)} 阅读</Text>
             </View>
         </TouchableWithoutFeedback>
 
 
 
 
 
     )
   }
 
 
 
 
 
 
 
   // 上拉加载更多数据..
   _onEndReached() {
     //  alert('加载更多')
 
     page = page + 1
 
     this.getData()
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
                        <TextInput style={styles.search} placeholder="搜索你感兴趣的图集吧">
                        </TextInput>
                    </View>

                    
                </View>

                <FlatList showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderData}
                    onEndReachedThreshold={0.1}
                    onEndReached={this._onEndReached.bind(this)} 
                    refreshing={ this.state.refreshing }
                    onRefresh={this._renderRefresh }/>
            
             
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
    
    item: {
        width: 412,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        backgroundColor:'#fff',
        marginBottom:10
    
    },
    itemTitle: {
        fontSize: 17,
        padding:10

    },
    from: {
        fontSize: 10,
        color: 'gray',
        padding:10
    }
})