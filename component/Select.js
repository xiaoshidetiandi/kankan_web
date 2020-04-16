import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Value} from 'react-native-reanimated';
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
export default class Select extends Component {
  constructor(props) {
    super(props);
    // console.log('这里是select', props.doIn);
    this.state = {
      movieName: '',
    };
  }
  // 搜索事件
  _searchMovies = () => {
    let movieName = this.state.movieName;
    this.props.doIn('SearchMovies', movieName);
    this.setState({movieName: ''});
  };
  render() {
    return (
      <View
        style={{
          borderWidth: 1,
          marginHorizontal: rpx(40),
          borderRadius: rpx(50),
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: rpx(20),
          marginBottom: rpx(20),
          backgroundColor: '#fff',
        }}>
        <TextInput
          ref="movieName"
          value={this.state.movieName}
          placeholder="搜索..."
          style={{
            fontSize: rpx(40),
            height: rpx(100),
            width: rpx(580),
            paddingLeft: rpx(60),
          }}
          // 文本改变触发
          onChangeText={text => {
            this.setState({
              movieName: text,
            });
          }}
          // 点击手机键盘的确认按钮触发
          onSubmitEditing={this._searchMovies}
        />
        <TouchableOpacity onPress={this._searchMovies}>
          <Image
            source={require('../assets/IMG/select.png')}
            style={{width: rpx(60), height: rpx(60)}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
