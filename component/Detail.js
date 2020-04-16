import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import Api from '../api';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mid: props.route.params.mid,
      data: [],
      resourceUp: '',
      // 是否登录
      isLogin: false,
      // 是否收藏
      isColl: false,
      req: 0,
      collect: [],
    };
  }
  // 加载电影详情数据
  _loadData = () => {
    fetch(Api.URL + 'detail?mid=' + this.state.mid)
      .then(res => res.json())
      .then(resJson => {
        console.log('详情数据返回', resJson[0]);
        let time = resJson[0].resourceUp.split('T')[0];
        console.log(time);
        this.setState({data: resJson[0], resourceUp: time});
      })
      .catch(error => {
        console.log(error);
      });
  };
  _isLogin = async () => {
    let token = await global.storage.load({
      key: 'token',
    });
    console.log('这是详情页的token:', token);
    if (token.isLogin == true) {
      this.setState({isLogin: true, token: token.collect});
    } else {
      this.setState({isLogin: false});
    }
  };
  // 点击播放事件
  _doPlay = () => {
    if (this.state.isLogin == false) {
      ToastAndroid.show('请登录!', ToastAndroid.SHORT);
    } else {
      this.props.navigation.navigate('Play', {
        MP4: this.state.data.movieResource,
        mid: this.state.mid,
        moviePic: this.state.data.moviePic,
      });
    }
  };
  // 判断是否收藏
  _isColl = async () => {
    let token = await global.storage.load({
      key: 'token',
    });
    for (const item of token.collect) {
      if (item.mid == this.state.mid) {
        this.setState({isColl: true});
      }
    }
  };
  // 收藏按钮的加载
  _coll = () => {
    if (this.state.isColl == false) {
      return (
        <TouchableOpacity onPress={this._collect}>
          <Text style={[styles.btn]}>收藏</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this._remColl}>
          <Text style={[styles.btn, {fontSize: rpx(40)}]}>取消收藏</Text>
        </TouchableOpacity>
      );
    }
  };
  //点击收藏
  _collect = async () => {
    // await ToastAndroid.show('收藏功能暂未开放!', ToastAndroid.SHORT);
    let token = await global.storage.load({
      key: 'token',
    });
    if (token.isLogin == false) {
      ToastAndroid.show('请登录!', ToastAndroid.SHORT);
      return;
    }
    var obj = {
      moviePic: this.state.data.moviePic,
      mid: this.state.mid,
    };
    if (token.collect.length == 30) {
      ToastAndroid.show('收藏的最大数为30!', ToastAndroid.SHORT);
    } else {
      token.collect.unshift(obj);
    }

    var arr = [];
    for (const item of token.collect) {
      var strItem = item.mid + ',' + item.moviePic;
      arr.push(strItem);
    }
    var str = arr.join('|');
    console.log('这里是收藏的str:', str);
    await global.storage.save({
      key: 'token',
      data: token,
      expires: null,
    });
    await fetch(Api.URL + 'setCollect/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: token.id,
        str: str,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({isColl: true});
      })
      .catch(error => {
        console.error(error);
      });
  };
  // 取消收藏
  _remColl = async () => {
    let token = await global.storage.load({
      key: 'token',
    });
    for (let i = 0; i < token.collect.length; i++) {
      if (token.collect[i].mid == this.state.mid) {
        token.collect.splice(i, 1);
        break;
      }
    }
    var arr = [];
    for (const item of token.collect) {
      var strItem = item.mid + ',' + item.moviePic;
      arr.push(strItem);
    }
    var str = arr.join('|');
    console.log('这里是取消收藏的str:', str);
    await global.storage.save({
      key: 'token',
      data: token,
      expires: null,
    });
    await fetch(Api.URL + 'setCollect/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: token.id,
        str: str,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        ToastAndroid.show('取消成功!', ToastAndroid.SHORT);
        this.setState({isColl: false});
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <ScrollView>
        <View>
          <Image
            resizeMode="center"
            source={{
              uri:
                Api.pubURL + 'Imgs/movieDetailPic/' + this.state.data.moviePic,
            }}
            style={{
              width: rpx(750),
              height: rpx(500),
              backgroundColor: '#333',
            }}
          />
        </View>
        <View style={{flexDirection: 'row', marginHorizontal: rpx(40)}}>
          <View style={{flex: 2}}>
            <Text style={styles.listTex}>
              电影名:{this.state.data.movieNmme}
            </Text>
            <Text style={styles.listTex}>
              导演:{this.state.data.movieDirect}
            </Text>
            <Text style={styles.listTex}>
              语言:{this.state.data.movieLanguage}
            </Text>
            <Text style={styles.listTex}>类型:{this.state.data.movieType}</Text>
            <Text style={styles.listTex}>
              拍摄国家:{this.state.data.movieCountry}
            </Text>
            <Text style={styles.listTex}>
              时长:{this.state.data.movieTimeLength}
            </Text>
            <Text style={styles.listTex}>
              上映时间:{this.state.data.movieTime}
            </Text>
            <Text style={styles.listTex}>更新时间:{this.state.resourceUp}</Text>
            <Text style={styles.listTex}>
              播放数量:{this.state.data.moviePlay}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: rpx(20),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.scoreText}>{this.state.data.movieScore}</Text>
            <TouchableOpacity onPress={this._doPlay}>
              <Text style={[styles.btn]}>播放</Text>
            </TouchableOpacity>
            {this._coll()}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: rpx(40),
            marginBottom: rpx(60),
            marginTop: rpx(40),
          }}>
          <Text>电影简介:</Text>
          <Text>{this.state.data.movieIntr}</Text>
        </View>
      </ScrollView>
    );
  }
  componentDidMount() {
    this._loadData();
    this._isLogin();
    this._isColl();
  }
}

const styles = StyleSheet.create({
  listTex: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingTop: rpx(20),
    paddingBottom: rpx(20),
  },
  btn: {
    width: rpx(200),
    height: rpx(200),
    borderRadius: rpx(100),
    textAlign: 'center',
    lineHeight: rpx(200),
    fontSize: rpx(70),
    backgroundColor: 'green',
    color: '#eee',
    // marginBottom: rpx(100),
  },
  scoreText: {
    fontSize: rpx(90),
  },
});
