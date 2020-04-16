import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Dimensions,
  ToastAndroid,
} from 'react-native';
// 引入登录和未登录组件
import Islogin from './home/Islogin';
import Notlogin from './home/Notlogin';
// 引入StorageOpt 操作用户信息
import Api from '../../api';
import StorageOpt from '../../StorageOpt';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Home extends Component {
  constructor(props) {
    super(props);
    // console.log('props:', props.route.params.doLogin);
    this.state = {
      isLogin: false,
      userData: [],
    };
  }
  // 判断用户是否登录
  _decideLogin = () => {
    if (this.state.isLogin == false) {
      return <Notlogin _doLohin={this.props.route.params} />;
    } else {
      return (
        <Islogin
          userData={this.state.userData}
          doIn={this.props.route.params}
        />
      );
    }
  };
  // _获取用户信息
  _loadUser = async () => {
    // console.log('获取用户信息');
    //获取存储Token
    let token = await global.storage.load({
      key: 'token',
    });
    // console.log('这是token:', token);
    if (token == {}) {
      this.setState({isLogin: false});
    }
    await fetch(Api.URL + 'login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: token.phone,
        pwd: token.pwd,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code == -1) {
          this.setState({isLogin: false});
          // ToastAndroid.show('用户信息错误,请重新登录!', ToastAndroid.SHORT);
        } else {
          // console.log(responseJson.data[0]);
          this.setState({isLogin: true, userData: responseJson.data[0]});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  // 用户观看
  _playHistory = () => {};
  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        {this._decideLogin()}
      </View>
    );
  }
  componentDidMount() {
    this._loadUser();
    setInterval(async () => {
      let token = await global.storage.load({
        key: 'token',
      });
      if (token.isLogin == false) {
        this.setState({isLogin: false});
        // console.log(token.playHistory);
      } else {
        if (token.isLogin == true) {
          // console.log(token.playHistory);
          this.setState({isLogin: true});
        }
      }
    }, 500);
  }
}
const styles = StyleSheet.create({});
