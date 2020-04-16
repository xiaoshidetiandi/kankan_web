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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// 引入api文件
import Api from '../api';
// 屏幕配饰
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 是否显示密码
      secureTextEntry: true,
      secureTextEntry2: true,
      // 用户名
      // userNname: '',
      userNname: '超级用户',
      // 手机账号
      phone: '',
      // phone: '17784726905',
      //密码
      pwd: '',
      // 二次确认
      pwd2: '',
      // 眼睛图标的切换
      pwdImg: false,
      pwdImg2: false,
      // 是否显示眼睛图标
      pwdImgShow: 0,
      pwdImgShow2: 0,
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
  _pwdImg2 = () => {
    if (this.state.pwdImg2) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={this._pwdImgClick2}>
          <Image
            source={require('../assets/IMG/yanjing.png')}
            style={{
              width: rpx(50),
              height: rpx(40),
              marginRight: rpx(40),
              opacity: this.state.pwdImgShow2,
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={this._pwdImgClick2}>
          <Image
            source={require('../assets/IMG/yanjingbi.png')}
            style={{
              width: rpx(50),
              height: rpx(40),
              marginRight: rpx(40),
              opacity: this.state.pwdImgShow2,
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
  _pwdImgClick2 = () => {
    this.setState({
      pwdImg2: !this.state.pwdImg2,
      secureTextEntry2: !this.state.secureTextEntry2,
    });
  };
  // 点击登录事件
  _slogin = () => {
    var userNname = this.state.userNname;
    var phone = this.state.phone;
    var pwd = this.state.pwd;
    var pwd2 = this.state.pwd2;
    var phoneReg = /^1[3-9]\d{9}$/;
    var pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // 判断用户用户输入是否为空
    if (userNname.trim() == '') {
      ToastAndroid.show('用户名不能为空!', ToastAndroid.SHORT);
      return;
    }
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
    // 判断密码是否为空
    if (pwd.trim() == '') {
      ToastAndroid.show('密码不能为空!', ToastAndroid.SHORT);
      return;
    }
    // 密码判断二次输入是否为空
    if (pwd2.trim() == '') {
      ToastAndroid.show('密码验证不能为空!', ToastAndroid.SHORT);
      return;
    }
    // 验证密码格式
    if (!pwdReg.test(pwd)) {
      ToastAndroid.show('至少8位,由大小写字母数字组成!', ToastAndroid.SHORT);
      return;
    }
    // 判断密码和二次输入是否一致
    if (pwd !== pwd2) {
      ToastAndroid.show('两次输入的密码不一致!', ToastAndroid.SHORT);
      return;
    }
    // 发送请求,判断该用户名,是否已存在
    // http://127.0.0.1:4000/selectUserName?userName=超级用户
    function selectUserName() {
      return new Promise(function(door, err) {
        // console.log('发送用户名认证请求');
        fetch(Api.URL + 'selectUserName?userName=' + userNname)
          .then(res => res.json())
          .then(resJson => {
            // console.log(resJson);
            if (resJson.code == 1) {
              ToastAndroid.show('用户名已被占用!', ToastAndroid.SHORT);
            } else {
              door();
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    }

    // 发送请求判断,该手机号是否已经被注册
    function selectUserPhone() {
      return new Promise(function(door, err) {
        // console.log('发送手机号认证请求');
        fetch(Api.URL + 'selectUserPhone/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            // console.log(responseJson);
            if (responseJson.code == 1) {
              ToastAndroid.show('手机号已被注册!', ToastAndroid.SHORT);
            } else {
              door();
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
    selectUserName()
      // 发送请求注册账号
      .then(selectUserPhone)
      .then(() => {
        // console.log('发送请求注册账号');
        fetch(Api.URL + 'register/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userNname: userNname,
            phone: phone,
            pwd: pwd,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            // console.log(responseJson);
            if (responseJson.code == 1) {
              ToastAndroid.show(
                '注册成功!即将跳转登录页面',
                ToastAndroid.SHORT,
              );
              setTimeout(() => {
                this.props.navigation.navigate('Login');
              }, 500);
            } else {
              ToastAndroid.show('注册失败', ToastAndroid.SHORT);
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(() => {});
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/IMG/beijin.jpeg')}
        style={{height: '100%', height: '100%'}}>
        <View style={{marginHorizontal: rpx(40), alignItems: 'center'}}>
          <Image
            source={require('../assets/userHead/def.png')}
            style={{marginTop: rpx(100), marginBottom: rpx(100)}}
          />
          <View style={[styles.tp, {marginBottom: rpx(24)}]}>
            <Image
              source={require('../assets/IMG/user.png')}
              style={[
                styles.tp_img,
                {
                  width: rpx(60),
                  height: rpx(60),
                },
              ]}
            />
            <TextInput
              placeholder="用户名..."
              style={{flex: 1}}
              onChangeText={text => {
                this.setState({
                  userNname: text,
                });
              }}
            />
            <View
              style={{
                width: rpx(50),
                height: rpx(40),
                marginRight: rpx(40),
              }}
            />
          </View>
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
            />
            <View
              style={{
                width: rpx(50),
                height: rpx(40),
                marginRight: rpx(40),
              }}
            />
          </View>
          <View
            style={[
              styles.tp,
              {justifyContent: 'space-between', marginBottom: rpx(20)},
            ]}>
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
              placeholder="密码:至少8位,由大小写字母数字组成"
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
              placeholder="确认密码..."
              secureTextEntry={this.state.secureTextEntry2}
              style={{flex: 1}}
              onChangeText={text => {
                if (text == '') {
                  this.setState({
                    pwd2: text,
                    pwdImgShow2: 0,
                  });
                } else {
                  this.setState({
                    pwd2: text,
                    pwdImgShow2: 1,
                  });
                }
              }}
            />
            {this._pwdImg2()}
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btn}
            onPress={this._slogin}>
            <Text style={{color: '#fff', fontSize: rpx(40)}}>注册</Text>
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
    marginTop: rpx(50),
  },
  text: {
    color: 'red',
    width: rpx(670),
    textAlign: 'center',
    marginTop: rpx(10),
  },
});
