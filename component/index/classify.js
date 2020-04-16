import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
// 引入api文件
import Api from '../../api';
// 引入搜索框组件
import Select from '../Select';
// 屏幕配饰
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Classify extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.tabbar = [
      {name: '动作', start: 0, loadMoreFoot: 1, moves: []},
      {name: '喜剧', start: 0, loadMoreFoot: 1, moves: []},
      {name: '爱情', start: 0, loadMoreFoot: 1, moves: []},
      {name: '科幻', start: 0, loadMoreFoot: 1, moves: []},
      {name: '灾难', start: 0, loadMoreFoot: 1, moves: []},
      {name: '恐怖', start: 0, loadMoreFoot: 1, moves: []},
      {name: '悬疑', start: 0, loadMoreFoot: 1, moves: []},
      {name: '战争', start: 0, loadMoreFoot: 1, moves: []},
      {name: '犯罪', start: 0, loadMoreFoot: 1, moves: []},
      {name: '惊悚', start: 0, loadMoreFoot: 1, moves: []},
      {name: '动画', start: 0, loadMoreFoot: 1, moves: []},
      {name: '伦理', start: 0, loadMoreFoot: 1, moves: []},
      {name: '剧情', start: 0, loadMoreFoot: 1, moves: []},
      {name: '冒险', start: 0, loadMoreFoot: 1, moves: []},
      {name: '历史', start: 0, loadMoreFoot: 1, moves: []},
      {name: '家庭', start: 0, loadMoreFoot: 1, moves: []},
      {name: '鬼怪', start: 0, loadMoreFoot: 1, moves: []},
    ];
    this.state = {
      // 顶部导航栏按钮变红的下标 0表示第一个
      isShow: 0,
      // 请求来的电影数据存放在该数组中
      moves: [],
      // 当为0时显示没有更多,当为1时显示加载的圈圈
      loadMoreFoot: 1,
      refreshing: false, //下拉刷新动画的显示与否
    };
  }
  // 初始化加载
  _loadMore = (key, start) => {
    // let key = '科幻';
    // console.log('初始化分类组件数据加载');
    // console.log('key:' + key);
    fetch(Api.URL + 'selectClassify?key=' + key + '&start=' + start)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.length == 0) {
          this.tabbar[this.state.isShow].loadMoreFoot = 0;
        }
        this.tabbar[this.state.isShow].moves = resJson;
        this.setState({});
      })
      .catch(error => {
        console.log(error);
      });
  };
  // 顶部导航栏加载
  _loadTabbar = () => {
    let arr = [];
    this.tabbar.forEach((item, index) => {
      let text;
      if (this.state.isShow == index) {
        text = (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            style={{backgroundColor: '#706f73'}}>
            <Text
              style={[
                styles.headbar,
                {
                  paddingTop: rpx(10),
                  paddingBottom: rpx(10),
                  width: rpx(100),
                  height: rpx(70),
                  textAlign: 'center',
                  color: '#eee',
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      } else {
        text = (
          <TouchableOpacity
            style={{
              backgroundColor: '#15161b',
            }}
            key={index}
            activeOpacity={0.5}
            onPress={() => {
              this._clickbar(index);
            }}>
            <Text
              style={[
                styles.headbar,
                {
                  paddingTop: rpx(10),
                  paddingBottom: rpx(10),
                  width: rpx(100),
                  height: rpx(70),
                  textAlign: 'center',
                  color: '#eee',
                },
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }
      arr.push(text);
    });
    return arr;
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
  // 顶部导航栏点击切换事件
  _clickbar = index => {
    // alert(index);
    let isShow = index;
    let key = this.tabbar[isShow].name;
    let start = this.tabbar[isShow].start;
    console.log('isShow:' + isShow);
    console.log('key:' + key);
    console.log('start:' + start);
    this.setState({
      isShow: isShow,
      key: key,
    });
    this._loadMore(key, start);
  };
  //列表的脚步
  _ListFooterComponent = () => {
    if (this.tabbar[this.state.isShow].loadMoreFoot == 0) {
      return (
        <Text
          style={{
            textAlign: 'center',
            marginBottom: rpx(300),
            color: '#eee',
          }}>
          没有更多数据了...
        </Text>
      );
    }
    return (
      <View style={{marginBottom: rpx(250)}}>
        <ActivityIndicator color="#eee" />
        <Text style={{textAlign: 'center', color: '#eee'}}>正在加载...</Text>
      </View>
    );
  };
  // 下拉刷新
  _onRefresh = () => {
    this.setState({refreshing: true});
    let start = 0;
    let key = this.tabbar[this.state.isShow].name;
    fetch(Api.URL + 'selectClassify?key=' + key + '&start=' + start)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.tabbar[this.state.isShow].moves = resJson;
        this.tabbar[this.state.isShow].start = 0;
        this.setState({
          refreshing: false,
          loadMoreFoot: 1,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  //上拉加载更多
  _onEndReached = () => {
    let start = this.tabbar[this.state.isShow].start + 6;
    let key = this.tabbar[this.state.isShow].name;
    fetch(Api.URL + 'selectClassify?key=' + key + '&start=' + start)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.length != 0) {
          this.tabbar[this.state.isShow].moves = this.tabbar[
            this.state.isShow
          ].moves.concat(resJson);
          this.tabbar[this.state.isShow].start = start;
          this.tabbar[this.state.isShow].loadMoreFoot = 1;
          this.setState({});
        } else {
          this.tabbar[this.state.isShow].loadMoreFoot = 0;
          this.setState({});
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
        <View>
          <ScrollView
            // 让里面的text横向,并且可左右滑动
            horizontal
            // 让滑动的状态变成翻页的
            // pagingEnabled
            // 取消触碰时出现的横向滚动条
            showsHorizontalScrollIndicator={false}>
            {this._loadTabbar()}
          </ScrollView>
        </View>
        <FlatList
          style={{
            marginHorizontal: rpx(40),
            marginTop: rpx(60),
          }}
          data={this.tabbar[this.state.isShow].moves}
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
    this._loadMore(this.tabbar[0].name, 0);
  }
}

const styles = StyleSheet.create({
  headbar: {
    paddingLeft: rpx(10),
    paddingRight: rpx(10),
    paddingTop: rpx(5),
    paddingBottom: rpx(5),
    fontSize: rpx(30),
  },
});
