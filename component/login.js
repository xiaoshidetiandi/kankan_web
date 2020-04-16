import React, {Component} from 'react';

import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  Dimensions,
  TextInput,
  ImageBackground,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// 屏幕配饰

const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
// 引入api文件
import Api from '../api';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否显示密码
      secureTextEntry: true,
      // 手机账号
      // phone: '17784726905',
      phone: '',
      //密码
      // pwd: '145764888Xhf',
      pwd: '',
      // 眼睛图标的切换
      pwdImg: false,
      pwdImg2: false,
      // 是否显示眼睛图标
      pwdImgShow: 0,
      pwdImgShow2: 0,
      // 眼睛图标的切换
      pwdImg: false,
      // 是否显示眼睛图标
      pwdImgShow: 0,
    };
  }
  _pwdImg = () => {
    if (this.state.pwdImg) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={this._pwdImgClick}>
          <Image
            source={require('../assets/IMG/yanjing.png')}
            style={{
              width: rpx(50),
              height: rpx(40),
              marginRight: rpx(40),
              opacity: this.state.pwdImgShow,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={this._pwdImgClick}>
          <Image
            source={require('../assets/IMG/yanjingbi.png')}
            style={{
              width: rpx(50),
              height: rpx(40),
              marginRight: rpx(40),
              opacity: this.state.pwdImgShow,
            }}
          />
        </TouchableOpacity>
      );
    }
  };
  _pwdImgClick = () => {
    this.setState({
      pwdImg: !this.state.pwdImg,
      secureTextEntry: !this.state.secureTextEntry,
    });
  };
  _login = () => {
    var phone = this.state.phone;
    var pwd = this.state.pwd;
    // console.log('手机号:', phone);
    // console.log('密码:', pwd);
    var phoneReg = /^1[3-9]\d{9}$/;
    // 判断手机号是否为空
    if (phone.trim() == '') {
      ToastAndroid.show('手机号不能为空!', ToastAndroid.SHORT);
      return;
    }
    // 验证手机号格式
    if (!phoneReg.test(phone)) {
      ToastAndroid.show('手机号格式不正确!', ToastAndroid.SHORT);
      return;
    }
    // 判断,密码不能为空
    if (pwd.trim() == '') {
      ToastAndroid.show('密码不能为空!', ToastAndroid.SHORT);
      return;
    }
    // 发送登录请求
    console.log('发送登录请求');
    fetch(Api.URL + 'login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone,
        pwd: pwd,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.code == -1) {
          ToastAndroid.show('登录失败,用户名或者密码错误!', ToastAndroid.SHORT);
        } else {
          console.log('这是登录返回结果', responseJson.data[0]);
          var data = responseJson.data[0];
          var playHistory = [];
          var collect = [];
          if (data.playHistory != '') {
            var arr = data.playHistory.split('|');
            for (const item of arr) {
              var obj1 = {};
              obj1.mid = item.split(',')[0];
              obj1.moviePic = item.split(',')[1];
              playHistory.push(obj1);
            }
          }
          if (data.collect != '') {
            var arr = data.collect.split('|');
            for (const item of arr) {
              var obj1 = {};
              obj1.mid = item.split(',')[0];
              obj1.moviePic = item.split(',')[1];
              collect.push(obj1);
            }
          }
          let obj = {
            id: data.id,
            userName: data.userName,
            phone: phone,
            pwd: pwd,
            isLogin: true,
            userHeadPic: data.userHeadPic,
            playHistory: playHistory,
            collect: collect,
          };
          global.storage.save({
            key: 'token',
            data: obj,
            expires: null,
          });
          ToastAndroid.show(
            '登录成功,即将返回登录前的页面!',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            this.props.navigation.popToTop();
          }, 200);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <ImageBackground
        source={require('../assets/IMG/beijin.jpeg')}
        style={{height: '100%', height: '100%'}}>
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={true}
          animated={true}
        />
        <View style={{marginHorizontal: rpx(40), alignItems: 'center'}}>
          <Image
            source={require('../assets/userHead/def.png')}
            style={{marginTop: rpx(60), marginBottom: rpx(80)}}
          />
          <View style={[styles.tp, {marginBottom: rpx(24)}]}>
            <Image
              source={require('../assets/IMG/shouji.png')}
              style={[
                styles.tp_img,
                {
                  width: rpx(60),
                  height: rpx(60),
                },
              ]}
            />
            <TextInput
              placeholder="手机号..."
              style={{flex: 1}}
              onChangeText={text => {
                this.setState({
                  phone: text,
                });
              }}
              value={this.state.phone}
            />
            <View
              style={{
                width: rpx(50),
                height: rpx(40),
                marginRight: rpx(40),
              }}
            />
          </View>
          <View style={[styles.tp, {justifyContent: 'space-between'}]}>
            <Image
              source={require('../assets/IMG/mima.png')}
              style={[
                styles.tp_img,
                {
                  width: rpx(50),
                  height: rpx(50),
                  marginLeft: rpx(50),
                },
              ]}
            />
            <TextInput
              value={this.state.pwd}
              placeholder="密码..."
              secureTextEntry={this.state.secureTextEntry}
              style={{flex: 1}}
              onChangeText={text => {
                if (text == '') {
                  this.setState({
                    pwd: text,
                    pwdImgShow: 0,
                  });
                } else {
                  this.setState({
                    pwd: text,
                    pwdImgShow: 1,
                  });
                }
              }}
            />
            {this._pwdImg()}
          </View>
          <TouchableOpacity
            onPress={this._login}
            activeOpacity={0.9}
            style={[
              styles.btn,
              {
                marginBottom: rpx(30),
                marginTop: rpx(90),
              },
            ]}>
            <Text style={{color: '#fff', fontSize: rpx(40)}}>登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
            <Text style={{color: '#fff', fontSize: rpx(40)}}>注册</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>忘记密码？</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // 输入框
  tp: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: rpx(670),
    height: rpx(100),
    alignItems: 'center',
    borderRadius: rpx(50),
  },
  // 输入框内的img
  tp_img: {
    marginLeft: rpx(40),
  },
  btn: {
    backgroundColor: 'skyblue',
    width: rpx(670),
    height: rpx(110),
    borderRadius: rpx(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    width: rpx(670),
    textAlign: 'center',
    marginTop: rpx(10),
  },
});
