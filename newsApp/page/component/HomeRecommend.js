import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

let page = 1

export default class HomeRecommend extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      refreshing:false

    }
  }

  // 获取数据
  getData() {

    fetch(`http://10.0.2.2:3000/app/api/list/news/recommend/page=${page}`)
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
        <TouchableOpacity onPress={() => {this.props.navigation.push('newsDetail', {docid});}}>
          <View style={styles.itemText}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.from}>{item.website}  {(item.read) >9999 ? (Math.floor((item.read)/1000)/10)+'万' : (item.read)} 阅读</Text>
          </View>
        </TouchableOpacity>
        <Image source={{ uri: 'http://10.0.2.2:3000/uploads/' + last }} style={{ width: 150, height: 100 }} />
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
        onRefresh={this._renderRefresh }/>
    );
  }

}

let styles = StyleSheet.create({
  recom: {
    margin: 5,
  },

  item: {
    width: 400,
    padding: 10,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  itemText: {
    width: 210,
    flexDirection: 'column',
  },
  itemTitle: {
    fontSize: 16,
  },
  from: {
    marginTop: 40,
    fontSize: 10,
    color: 'gray'
  }
})