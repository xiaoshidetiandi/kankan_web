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
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Notlogin extends Component {
  render() {
    return (
      <ScrollView>
        <View style={{position: 'relative'}}>
          <Image
            source={require('../../../assets/IMG/bg1.jpg')}
            style={{width: rpx(750), height: rpx(450)}}
          />
          <View
            style={{
              width: rpx(670),
              marginHorizontal: rpx(40),
              position: 'absolute',
              marginTop: rpx(40),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity activeOpacity={0.5}>
                <Image
                  source={require('../../../assets/IMG/saomiao.png')}
                  style={{width: rpx(50), height: rpx(50)}}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity activeOpacity={0.5}>
                  <Image
                    source={require('../../../assets/IMG/xinxi.png')}
                    style={{width: rpx(60), height: rpx(60)}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginLeft: rpx(40)}}
                  activeOpacity={0.5}>
                  <Image
                    source={require('../../../assets/IMG/shezhi.png')}
                    style={{width: rpx(60), height: rpx(60)}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: rpx(20),
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: rpx(100),
                  width: rpx(130),
                  height: rpx(130),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: rpx(5),
                  borderColor: '#fff',
                }}>
                <View>
                  <Image
                    source={require('../../../assets/userHead/def.png')}
                    style={{
                      width: rpx(100),
                      height: rpx(100),
                    }}
                  />
                </View>
              </View>
              <View style={{marginLeft: rpx(20)}}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: rpx(50),
                      fontWeight: 'bold',
                      color: '#ddd',
                    }}
                    onPress={() => {
                      this.props._doLohin.doLogin();
                    }}>
                    登录/注册
                  </Text>
                </TouchableOpacity>
                <Text style={{fontSize: rpx(30), color: '#bbb'}}>
                  快速登录,多端同步
                </Text>
              </View>
            </View>
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
          </View>
          <View
            style={{
              height: rpx(250),
              borderWidth: 1,
              borderColor: '#bbb',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: rpx(20),
            }}>
            <Text style={{fontSize: rpx(30)}}>请登录...</Text>
          </View>
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
          </View>
          <View
            style={{
              height: rpx(250),
              borderWidth: 1,
              borderColor: '#bbb',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: rpx(20),
            }}>
            <Text style={{fontSize: rpx(30)}}>请登录...</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
