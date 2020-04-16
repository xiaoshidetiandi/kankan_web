import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Api from '../../../api';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Islogin extends Component {
  constructor(props) {
    super(props);
    // console.log(props.userData);
    this.state = {
      // 用户昵称
      userName: '',
      // 用户头像
      userHeadPic: '',
      // 用户观看历史
      playHistory: [],
      playHistoryAll: [],
      // -- 用户收藏
      collect: [],
      collectAll: [],
    };
  }
  // 初始化
  _load = async () => {
    let token = await global.storage.load({
      key: 'token',
    });
    console.log('这是我的token', token);
    var userHeadPic = Api.pubURL + 'Imgs/useHeardPic/def.png';
    if (token.userHeadPic != '') {
      console.log('用户有头像');
      userHeadPic = Api.pubURL + 'Imgs/useHeardPic/' + token.userHeadPic;
    }
    console.log('这是userHeadPic:', userHeadPic);
    let playHistory = [];
    let collect = [];
    if (token.playHistory.length > 10) {
      for (let i = 0; i < 10; i++) {
        playHistory.push(token.playHistory[i]);
      }
    } else {
      playHistory = token.playHistory;
    }
    if (token.collect.length > 10) {
      for (let i = 0; i < 10; i++) {
        collect.push(token.collect[i]);
      }
    } else {
      collect = token.collect;
    }
    this.setState({
      // 用户昵称
      userName: token.userName,
      // 用户头像
      userHeadPic: userHeadPic,
      playHistory: playHistory,
      collect: collect,
      playHistoryAll: token.playHistory,
      collectAll: token.collect,
    });
  };
  // 观看历史
  _playHistory = () => {
    // console.log('观看历史');
    if (this.state.playHistory.length != 0) {
      return (
        <View
          style={{
            marginTop: rpx(20),
            height: rpx(330),
            borderWidth: 1,
            borderColor: '#bbb',
          }}>
          <ScrollView horizontal style={{marginHorizontal: rpx(5)}}>
            {/* pagingEnabled:按页滚动 */}
            {/* horizontal: 内容横向滚动 */}
            {/* 使用map方法遍历图片数组 */}
            {this.state.playHistory.map((item, index) => {
              let imgURL = Api.pubURL + 'Imgs/moviePic/' + item.moviePic;
              {
                /* console.log(imgURL); */
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={{
                    marginTop: rpx(10),
                    paddingLeft: rpx(10),
                    paddingRight: rpx(10),
                  }}
                  onPress={() => {
                    this.props.doIn.doIn('Detail', item.mid);
                    // alert('点击了mid:' + item.mid);
                  }}>
                  <Image
                    source={{uri: imgURL}}
                    style={{
                      width: rpx(200),
                      height: rpx(300),
                      borderWidth: 1,
                      borderColor: '#999',
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: rpx(250),
            borderWidth: 1,
            borderColor: '#bbb',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: rpx(20),
          }}>
          <Text style={{fontSize: rpx(30)}}>暂无观看记录...</Text>
        </View>
      );
    }
  };
  // 用户收藏
  _collect() {
    if (this.state.collect.length != 0) {
      return (
        <View
          style={{
            marginTop: rpx(20),
            height: rpx(330),
            borderWidth: 1,
            borderColor: '#bbb',
          }}>
          <ScrollView horizontal style={{marginHorizontal: rpx(5)}}>
            {/* pagingEnabled:按页滚动 */}
            {/* horizontal: 内容横向滚动 */}
            {/* 使用map方法遍历图片数组 */}
            {this.state.collect.map((item, index) => {
              let imgURL = Api.pubURL + 'Imgs/moviePic/' + item.moviePic;
              {
                /* console.log(imgURL); */
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={{
                    marginTop: rpx(10),
                    paddingLeft: rpx(10),
                    paddingRight: rpx(10),
                  }}
                  onPress={() => {
                    this.props.doIn.doIn('Detail', item.mid);
                    // alert('点击了mid:' + item.mid);
                  }}>
                  <Image
                    source={{uri: imgURL}}
                    style={{
                      width: rpx(200),
                      height: rpx(300),
                      borderWidth: 1,
                      borderColor: '#999',
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: rpx(250),
            borderWidth: 1,
            borderColor: '#bbb',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: rpx(20),
          }}>
          <Text style={{fontSize: rpx(30)}}>暂无观看记录...</Text>
        </View>
      );
    }
  }
  // 用户注销
  _quit = () => {
    let obj = {
      userName: '',
      phone: '',
      pwd: '',
      isLogin: false,
      userHeadPic: '',
      playHistory: [],
      collect: [],
    };
    global.storage.save({
      key: 'token',
      data: obj,
      expires: null,
      isLogin: false,
    });
  };
  // 更改用户头像
  _setUserPic = () => {
    alert('该功能暂未上线');
  };
  // 扫一扫
  _saomiao = () => {
    alert('该功能暂未上线');
  };
  // 设置
  _shezhi = () => {
    alert('该功能暂未上线');
  };
  // 对话
  _duihua = () => {
    alert('该功能暂未上线');
  };
  render() {
    return (
      <ScrollView>
        <View style={{position: 'relative'}}>
          <Image
            source={require('../../../assets/IMG/bg2.jpg')}
            style={{width: rpx(750), height: rpx(450)}}
          />
          <View
            style={{
              width: rpx(670),
              marginHorizontal: rpx(40),
              position: 'absolute',
              marginTop: rpx(40),
            }}>
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity activeOpacity={0.5} onPress={this._saomiao}>
                <Image
                  source={require('../../../assets/IMG/saomiao.png')}
                  style={{width: rpx(50), height: rpx(50)}}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity activeOpacity={0.5} onPress={this._duihua}>
                  <Image
                    source={require('../../../assets/IMG/xinxi.png')}
                    style={{width: rpx(60), height: rpx(60)}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this._shezhi}
                  style={{marginLeft: rpx(40)}}
                  activeOpacity={0.5}>
                  <Image
                    source={require('../../../assets/IMG/shezhi.png')}
                    style={{width: rpx(60), height: rpx(60)}}
                  />
                </TouchableOpacity>
              </View>
            </View> */}
            {/* 中间用户信息和注销按钮 */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: rpx(20),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* 头像 */}
                <View
                  style={{
                    borderRadius: rpx(100),
                    width: rpx(130),
                    height: rpx(130),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: rpx(2),
                    borderColor: '#fff',
                  }}>
                  <View>
                    <TouchableOpacity onPress={this._setUserPic}>
                      <Image
                        source={{uri: this.state.userHeadPic}}
                        style={{
                          width: rpx(100),
                          height: rpx(100),
                          borderRadius: rpx(60),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* 用户名 */}
                <Text
                  style={{
                    fontSize: rpx(50),
                    fontWeight: 'bold',
                    color: '#ddd',
                    marginLeft: rpx(20),
                    width: rpx(300),
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  onPress={() => {
                    this.props._doLohin.doLogin();
                  }}>
                  {this.state.userName}
                </Text>
              </View>
              {/* 注销按钮 */}
              <TouchableOpacity
                onPress={() => {
                  this._quit();
                }}>
                <Text
                  style={{
                    borderRadius: rpx(100),
                    width: rpx(130),
                    height: rpx(130),
                    backgroundColor: '#3388ff',
                    textAlign: 'center',
                    lineHeight: rpx(130),
                    color: '#ddd',
                    fontWeight: 'bold',
                    fontSize: rpx(40),
                  }}>
                  注销
                </Text>
              </TouchableOpacity>
            </View>
            {/* 下方广告按钮 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: rpx(20),
              }}>
              <TouchableOpacity activeOpacity={0.5}>
                <View
                  style={{
                    width: rpx(320),
                    height: rpx(160),
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderRadius: rpx(20),
                    justifyContent: 'center',
                  }}>
                  <View style={{marginLeft: rpx(20)}}>
                    <Text style={{color: '#eee', marginBottom: rpx(10)}}>
                      新用户首月5元
                    </Text>
                    <Text style={{color: '#bbb'}}>成为会员,畅享影视!</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <View
                  style={{
                    width: rpx(320),
                    height: rpx(160),
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderRadius: rpx(20),
                    justifyContent: 'center',
                  }}>
                  <View style={{marginLeft: rpx(20)}}>
                    <Text style={{color: '#eee', marginBottom: rpx(10)}}>
                      会员半年卡
                    </Text>
                    <Text style={{color: '#bbb'}}>只需80元</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 历史记录 */}
        <View style={{marginTop: rpx(60)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: rpx(40),
            }}>
            <Text style={{fontWeight: 'bold', fontSize: rpx(40)}}>
              历史记录
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.doIn.doIn(
                  'Playhistoryall',
                  this.state.playHistoryAll,
                );
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: rpx(30),
                    color: '#666',
                  }}>
                  更多
                </Text>
                <Image
                  source={require('../../../assets/IMG/changyongicon-.png')}
                  style={{width: rpx(40), height: rpx(40)}}
                />
              </View>
            </TouchableOpacity>
          </View>
          {this._playHistory()}
        </View>
        {/* 收藏 */}
        <View style={{marginTop: rpx(60)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: rpx(40),
            }}>
            <Text style={{fontWeight: 'bold', fontSize: rpx(40)}}>
              我的收藏
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.doIn.doIn('Collall', this.state.collectAll);
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: rpx(30),
                    color: '#666',
                  }}>
                  更多
                </Text>
                <Image
                  source={require('../../../assets/IMG/changyongicon-.png')}
                  style={{width: rpx(40), height: rpx(40)}}
                />
              </View>
            </TouchableOpacity>
          </View>
          {this._collect()}
        </View>
      </ScrollView>
    );
  }
  componentDidMount() {
    this._load();
    setInterval(async () => {
      let token = await global.storage.load({
        key: 'token',
      });
      // console.log('这是,is:', token);
      let playHistory = [];
      let collect = [];
      if (token.playHistory.length > 10) {
        for (let i = 0; i < 10; i++) {
          playHistory.push(token.playHistory[i]);
        }
      } else {
        playHistory = token.playHistory;
      }
      if (token.collect.length > 10) {
        for (let i = 0; i < 10; i++) {
          collect.push(token.collect[i]);
        }
      } else {
        collect = token.collect;
      }
      this.setState({
        isLogin: true,
        playHistory: playHistory,
        collect: collect,
        playHistoryAll: token.playHistory,
        collectAll: token.collect,
      });
    }, 200);
  }
}

const styles = StyleSheet.create({});
