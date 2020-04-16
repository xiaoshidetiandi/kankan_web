import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
// 导入api;
import Api from '../../api';
// 引入搜索框组件
import Select from '../Select';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [
        'https://imgcps.jd.com/ling/12158735/6Im65pyv55WF6ZSA5aW95Lmm/5q-P5ruhMTAw5YePNTA/p-5bd8253082acdd181d02f9d3/ab02b443.jpg',
        'https://imgcps.jd.com/ling/12177266/55Sf5rS755m-56eR5aW95Lmm/5q-P5ruhMTAw5YePNTA/p-5bd8253082acdd181d02fa75/db3db678.jpg',
        'https://img14.360buyimg.com/pop/s1180x940_jfs/t1/103115/13/17978/72324/5e8d25bdE3808f6dd/bffe1ac40e3645c7.jpg.webp',
        'https://img20.360buyimg.com/pop/s1180x940_jfs/t1/96739/10/15604/83840/5e730bbcEb278a9a3/3a76808f9051140d.jpg.webp',
      ],
      // 请求来的电影数据存放在该数组中
      moves: [],
      // 当为0时显示没有更多,当为1时显示加载的圈圈
      loadMoreFoot: 1,
      refreshing: false, //下拉刷新动画的显示与否
      start: 0,
    };
  }
  // 电影列表加载
  _loadList = data => {
    let item = data.item;
    let view = (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          // console.log(this.props.route.params.doDetail);
          // console.log('点击了', item.movieNmme, 'id为:', item.id);
          // this.props.navigation.navigate('Detail');
          this.props.route.params.doIn('Detail', item.id);
        }}>
        <View
          style={{
            borderRadius: rpx(10),
            marginBottom: rpx(60),
            flexDirection: 'row',
            backgroundColor: '#ddd',
          }}>
          <Image
            source={{
              uri: Api.pubURL + 'Imgs/moviePic/' + item.moviePic,
            }}
            resizeMode="cover"
            style={{
              width: rpx(300),
              height: rpx(500),
              borderRadius: rpx(10),
            }}
          />
          <View style={{marginLeft: rpx(10), flex: 1, marginTop: rpx(20)}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>电影名:</Text>
              <Text
                style={{fontSize: rpx(30), flex: 1}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.movieNmme}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>导演:</Text>
              <Text
                style={{fontSize: rpx(30), flex: 1}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.movieDirect}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>评分:</Text>
              <Text style={{fontSize: rpx(30), flex: 1}}>
                {item.movieScore}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>类型:</Text>
              <Text
                style={{fontSize: rpx(30), flex: 1}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.movieType}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>制片国家:</Text>
              <Text
                style={{fontSize: rpx(30), flex: 1}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.movieCountry}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>语言:</Text>
              <Text
                style={{fontSize: rpx(30), flex: 1}}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.movieLanguage}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: rpx(10),
              }}>
              <Text style={{fontSize: rpx(40)}}>时长:</Text>
              <Text style={{fontSize: rpx(30), flex: 1}}>
                {item.movieTimeLength}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return view;
  };
  // 初始化加载
  _loadMore = () => {
    // let key = '科幻';
    // console.log('初始化推荐组件数据加载');
    // console.log('key:' + key);
    fetch(Api.URL + 'recommend?start=' + this.state.start)
      .then(res => res.json())
      .then(resJson => {
        // console.log(resJson);
        if (resJson.length == 0) {
          this.setState({loadMoreFoot: 0});
        }
        this.setState({moves: resJson});
      })
      .catch(error => {
        console.log(error);
      });
  };
  //列表的脚步
  _ListFooterComponent = () => {
    if (this.state.loadMoreFoot == 0) {
      return (
        <Text
          style={{textAlign: 'center', marginBottom: rpx(240), color: '#eee'}}>
          没有更多数据了...
        </Text>
      );
    }
    return (
      <View style={{marginBottom: rpx(220)}}>
        <ActivityIndicator color="#eee" />
        <Text style={{textAlign: 'center', color: '#eee'}}>正在加载...</Text>
      </View>
    );
  };
  // 下拉刷新
  _onRefresh = () => {
    let start = 0;
    this.setState({
      loadMoreFoot: 1,
    });
    setTimeout(() => {
      fetch(Api.URL + 'recommend?start=' + start)
        .then(res => res.json())
        .then(resJson => {
          // console.log(resJson);
          this.setState({moves: resJson, start: start});
        })
        .catch(error => {
          console.log(error);
        });
    }, 200);
  };
  //上拉加载更多
  _onEndReached = () => {
    // console.log('触发上拉加载事件');
    let start = this.state.start + 6;
    // console.log(start);
    fetch(Api.URL + 'recommend?start=' + start)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.length == 0) {
          this.setState({
            loadMoreFoot: 0,
          });
        } else {
          let movies = this.state.moves.concat(resJson);
          this.setState({
            moves: movies,
            start: start,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <View>
        {/* 顶部搜索框 */}
        <Select doIn={this.props.route.params.doIn} />
        <FlatList
          style={{
            marginHorizontal: rpx(40),
            marginTop: rpx(20),
          }}
          data={this.state.moves}
          renderItem={this._loadList}
          keyExtractor={(item, index) => {
            // console.log(index);
            return '' + index;
          }}
          // 0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发上拉加载事件
          onEndReachedThreshold={0.05}
          // 下拉加载函数
          onEndReached={this._onEndReached}
          //尾部组件,一般是加载的圈圈或者加载完的提示
          ListFooterComponent={this._ListFooterComponent}
          // 上拉刷新时,在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。
          refreshing={this.state.refreshing}
          // 上拉刷新
          onRefresh={this._onRefresh}
        />
      </View>
    );
  }
  //初始化加载数据
  componentDidMount() {
    this._loadMore();
  }
}

const styles = StyleSheet.create({});
