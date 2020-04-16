import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import Api from '../api';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Collall extends Component {
  constructor(props) {
    super(props);
    // console.log(props.route.params.mid);
    this.state = {
      loadMoreFoot: 1,
      token: [],
    };
  }
  // 电影列表加载
  _loadList = data => {
    let item = data.item;
    let view = (
      <View
        style={{
          borderRadius: rpx(10),
          marginBottom: rpx(20),
          flexDirection: 'row',
          backgroundColor: '#ddd',
          borderColor: '#ccc',
          borderWidth: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: Api.pubURL + 'Imgs/moviePic/' + item.moviePic,
          }}
          resizeMode="cover"
          style={{
            width: rpx(140),
            height: rpx(200),
            borderRadius: rpx(10),
          }}
        />
        <TouchableOpacity
          style={{marginRight: rpx(20)}}
          onPress={() => {
            this._delete(item);
          }}>
          <Image
            source={require('../assets/IMG/del.png')}
            style={{width: rpx(80), height: rpx(80)}}
          />
        </TouchableOpacity>
      </View>
    );
    return view;
  };
  _delete = data => {
    // console.log(data);
    Alert.alert('是否删除?', '', [
      {text: '取消', onPress: () => {}},
      {
        text: '确认',
        onPress: () => {
          var token = this.state.token;
          var collect = token.collect;
          for (let i = 0; i < collect.length; i++) {
            if (collect[i].mid == data.mid) {
              collect.splice(i, 1);
              break;
            }
          }
          token.collect = collect;
          var arr1 = [];
          var str = '';
          for (const item of collect) {
            str = item.mid + ',' + item.moviePic;
            arr1.push(str);
          }
          // console.log('这是arr1', arr1);
          str = arr1.join('|');
          //   console.log(str);
          fetch(Api.URL + 'setCollect/', {
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
              global.storage.save({
                key: 'token',
                data: token,
                expires: null,
              });
              ToastAndroid.show('删除成功!', ToastAndroid.SHORT);
              this.setState({});
            })
            .catch(error => {
              console.error(error);
            });
        },
      },
    ]);
  };
  loadData = async () => {
    let token = await global.storage.load({
      key: 'token',
    });
    this.setState({token: token});
  };
  render() {
    return (
      <FlatList
        style={{
          marginHorizontal: rpx(40),
          marginTop: rpx(20),
        }}
        data={this.state.token.collect}
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
      />
    );
  }
  componentDidMount() {
    this.loadData();
  }
}

const styles = StyleSheet.create({});
