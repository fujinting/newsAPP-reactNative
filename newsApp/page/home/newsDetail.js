
import React from 'react';

import { Text, View, Image, StyleSheet, ScrollView, } from 'react-native';

import HTMLView from 'react-native-htmlview';


export default class NewsDetail extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const docid = navigation.getParam("docid");
        this.state = {
            docid,
            detail_data: {},
            content: ''
        }
    }

    // 获取新闻推荐的详情
    // 获取数据
    _getNewsDetail() {

        fetch(`http://10.0.2.2:3000/app/api/news/detail/${this.state.docid}`)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    detail_data: responseJson,
                    content: responseJson.body.replace(/localhost/g, '10.0.2.2').replace(/<\s*(p+).*?>/g,'<$1>').replace(/<(\/)?p>/g , '')
                })

                // alert('success')
            })
            .catch((error) => {


            });
    }

    componentDidMount() {
        this._getNewsDetail();

    }

    renderNode = (node, index, siblings, parent, defaultRenderer) => {
         if (node.name == "img") { 
             return (<Image  style={{flex: 1, height: 230, marginBottom: 25,marginTop:10 }} 
             source={{ uri: node.attribs.src }} ></Image>); } }

    render() {
        return (
            <View>
              
                
                <View style={styles.newsDetailTop}>
                    <View onTouchEnd={() => { this.props.navigation.goBack() }} style={styles.newsReturn}>
                        <Image source={require('../../assets/img/icon/return.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ fontSize: 22, paddingTop: 5, color: '#8a8a8a' }}>返回</Text>
                    </View>
                    <Image onTouchEnd={() => { alert('不支持此功能，请在真机运行！') }} source={require('../../assets/img/icon/more.png')} style={{ width: 30, height: 30, marginTop: 5, marginRight: 8 }} />
                </View>

                <ScrollView>
                    <Text style={styles.newDetailTitle}>
                        {this.state.detail_data.title}
                    </Text>
                    <Text style={styles.fromDate}>
                    {this.state.detail_data.website} / {this.state.detail_data.date}
                    </Text>
                    
                    <HTMLView
                        value={this.state.content}
                        stylesheet={styles}
                        style={{ padding: 10 }}
                        renderNode={this.renderNode}
                       

                    />
                   
                    <View style={{height:100}}></View>
                   
                </ScrollView>

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
    }

})