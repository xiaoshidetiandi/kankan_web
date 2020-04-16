import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Api from '../api';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class SearchMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieNmme: props.route.params.mid,
      moves: [],
      // 当为0时显示没有更多,当为1时显示加载的圈圈
      loadMoreFoot: 1,
      refreshing: false, //下拉刷新动画的显示与否
      start: 0,
    };
  }
  // 发送数据加载数据
  _loadMovies = () => {
    fetch(
      Api.URL +
        'searchMovies?movieNmme=' +
        this.state.movieNmme +
        '&start=' +
        this.state.start,
    )
      .then(res => res.json())
      .then(resJson => {
        if (resJson.length == 0) {
          this.setState({loadMoreFoot: 0});
        }
        this.setState({moves: resJson});
      })
      .catch(error => {
        console.log(error);
      });
  };
  // 电影列表加载
  _loadList = data => {
    let item = data.item;
    let view = (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          // console.log(this.props.route.params.doDetail);
          // console.log('点击了', item.movieNmme, 'id为:', item.id);
          this.props.navigation.navigate('Detail', {mid: item.id});
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
  //列表的脚步
  _ListFooterComponent = () => {
    if (this.state.loadMoreFoot == 0) {
      return (
        <Text
          style={{textAlign: 'center', marginBottom: rpx(240), color: '#333'}}>
          没有更多数据了...
        </Text>
      );
    }
    return (
      <View style={{marginBottom: rpx(220)}}>
        <ActivityIndicator color="#eee" />
        <Text style={{textAlign: 'center', color: '#333'}}>正在加载...</Text>
      </View>
    );
  };
  // 下拉刷新
  _onRefresh = () => {
    console.log('下拉刷新');
    let start = 0;
    fetch(
      Api.URL +
        'searchMovies?movieNmme=' +
        this.state.movieNmme +
        '&start=' +
        start,
    )
      .then(res => res.json())
      .then(resJson => {
        // console.log(resJson);
        this.setState({moves: resJson, start: start, loadMoreFoot: 1});
      })
      .catch(error => {
        console.log(error);
      });
  };
  //上拉加载更多
  _onEndReached = () => {
    console.log('触发上拉加载事件');
    let start = this.state.start + 6;
    // console.log(start);
    fetch(
      Api.URL +
        'searchMovies?movieNmme=' +
        this.state.movieNmme +
        '&start=' +
        start,
    )
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
          onEndReachedThreshold={0.1}
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
  componentDidMount() {
    this._loadMovies();
  }
}

const styles = StyleSheet.create({});
