import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
  Slider,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Api from '../api';
const height = Dimensions.get('window').height;
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};
function formatTime(second) {
  let h = 0,
    i = 0,
    s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function(v) {
    return v >> 0 < 10 ? '0' + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(':');
}
export default class Play extends Component {
  static navigationOptions = {
    headerTitle: '测试视频播放',
  };
  constructor(props) {
    super(props);
    this.state = {
      mid: this.props.route.params.mid,
      moviePic: this.props.route.params.moviePic,
      videoUrl: this.props.route.params.MP4,
      showVideoCover: true, // 是否显示视频封面
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: false, // 视频是否正在播放
      currentTime: 0, // 视频当前播放的时间
      duration: 0, // 视频的总时长
      // isFullScreen: true, // 当前是否全屏显示
      playFromBeginning: false, // 是否从头开始播放
      isLoad: true,
    };
  }

  render() {
    return (
      // <View style={styles.container} onLayout={this._onLayout}>
      <View
        style={{
          width: rpx(750),
          height: height,
          backgroundColor: '#000000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Video
          ref={ref => (this.videoPlayer = ref)}
          source={{uri: Api.pubURL + 'video/' + this.state.videoUrl}}
          rate={1.0}
          volume={1.0}
          muted={false}
          paused={!this.state.isPlaying}
          resizeMode={'contain'}
          playWhenInactive={false}
          playInBackground={false}
          ignoreSilentSwitch={'ignore'}
          progressUpdateInterval={250.0}
          onLoadStart={this._onLoadStart}
          onLoad={this._onLoaded}
          onProgress={this._onProgressChanged}
          onEnd={this._onPlayEnd}
          onError={this._onPlayError}
          onBuffer={this._onBuffering}
          style={{
            width: rpx(750),
            height: (rpx(750) * 9) / 16,
            transform: [{scale: 1.7}, {rotate: '90deg'}],
          }}
        />
        {this.state.showVideoCover ? (
          <Image
            style={{
              position: 'absolute',
              width: rpx(750),
              height: (rpx(750) * 9) / 16,
              transform: [{scale: 1.7}, {rotate: '90deg'}],
            }}
            resizeMode={'contain'}
            source={{
              uri: Api.pubURL + 'Imgs/movieDetailPic/' + this.state.moviePic,
            }}
          />
        ) : null}
        <TouchableWithoutFeedback
          onPress={() => {
            this.hideControl();
          }}>
          <View
            style={{
              position: 'absolute',
              width: rpx(750),
              height: (rpx(750) * 9) / 16,
              transform: [{scale: 1.7}, {rotate: '90deg'}],
              backgroundColor: this.state.isPlaying
                ? 'transparent'
                : 'rgba(0, 0, 0, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {this._isload()}
          </View>
        </TouchableWithoutFeedback>
        {this.state.showVideoControl ? (
          <View style={[styles.control, {width: rpx(700)}]}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => {
                this.onControlPlayPress();
              }}>
              <Image
                style={styles.playControl}
                source={
                  this.state.isPlaying
                    ? require('../assets/IMG/pause.png')
                    : require('../assets/IMG/paused.png')
                }
              />
            </TouchableOpacity>
            <Text style={styles.time}>
              {formatTime(this.state.currentTime)}
            </Text>
            <Slider
              style={{flex: 1}}
              maximumTrackTintColor={'#999999'}
              minimumTrackTintColor={'#00c06d'}
              thumbImage={require('../assets/IMG/shouji.png')}
              value={this.state.currentTime}
              minimumValue={0}
              maximumValue={this.state.duration}
              onValueChange={currentTime => {
                this.onSliderValueChanged(currentTime);
              }}
            />
            <Text style={[styles.time, {marginRight: rpx(40)}]}>
              {formatTime(this.state.duration)}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  /// -------Video组件回调事件-------
  _isload = () => {
    if (this.state.isLoad == true) {
      return <ActivityIndicator color="#eee" size={rpx(40)} />;
    } else if (this.state.isPlaying) {
      return;
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.onPressPlayButton();
          }}>
          <Image
            style={styles.playButton}
            source={require('../assets/IMG/paused.png')}
          />
        </TouchableWithoutFeedback>
      );
    }
  };
  _onLoadStart = () => {
    console.log('视频开始加载');
  };

  _onBuffering = () => {
    console.log('视频缓冲中...');
    // this.setState({isLoad: true});
  };
  _onLoaded = data => {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
      isLoad: false,
    });
  };

  _onProgressChanged = data => {
    // console.log('视频进度更新');
    var isload = true;
    if (this.state.currentTime != data.currentTime) {
      isload = false;
    }
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
        isLoad: isload,
      });
    }
  };

  _onPlayEnd = () => {
    // console.log('视频播放结束');
    this.setState({
      currentTime: 0,
      isPlaying: false,
      playFromBeginning: true,
    });
  };

  _onPlayError = () => {
    console.log('视频播放失败');
  };

  ///-------控件点击事件-------

  /// 控制播放器工具栏的显示和隐藏
  hideControl() {
    if (this.state.showVideoControl) {
      this.setState({
        showVideoControl: false,
      });
    } else {
      this.setState(
        {
          showVideoControl: true,
        },
        // 5秒后自动隐藏工具栏
        () => {
          setTimeout(() => {
            this.setState({
              showVideoControl: false,
            });
          }, 5000);
        },
      );
    }
  }

  /// 点击了播放器正中间的播放按钮

  onPressPlayButton() {
    let isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay,
      showVideoCover: false,
    });
    if (this.state.playFromBeginning) {
      this.videoPlayer.seek(0);
      this.setState({
        playFromBeginning: false,
      });
    }
  }

  /// 点击了工具栏上的播放按钮
  onControlPlayPress() {
    this.onPressPlayButton();
  }

  /// 点击了工具栏上的全屏按钮
  // onControlShrinkPress() {
  //   if (this.state.isFullScreen) {
  //     Orientation.lockToPortrait();
  //   } else {
  //     Orientation.lockToLandscape();
  //   }
  // }

  /// 进度条值改变
  onSliderValueChanged(currentTime) {
    this.videoPlayer.seek(currentTime);
    if (this.state.isPlaying) {
      this.setState({
        currentTime: currentTime,
      });
    } else {
      this.setState({
        currentTime: currentTime,
        isPlaying: true,
        showVideoCover: false,
      });
    }
  }

  /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  // _onLayout = event => {
  //   //获取根View的宽高
  //   let {width, height} = event.nativeEvent.layout;
  //   console.log('通过onLayout得到的宽度：' + width);
  //   console.log('通过onLayout得到的高度：' + height);

  //   // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
  //   let isLandscape = width > height;
  //   if (isLandscape) {
  //     this.setState({
  //       videoWidth: width,
  //       videoHeight: height,
  //       isFullScreen: true,
  //     });
  //   } else {
  //     this.setState({
  //       videoWidth: width,
  //       videoHeight: (width * 9) / 16,
  //       isFullScreen: false,
  //     });
  //   }
  //   Orientation.unlockAllOrientations();
  // };

  /// -------外部调用事件方法-------

  ///播放视频，提供给外部调用
  playVideo() {
    this.setState({
      isPlaying: true,
      showVideoCover: false,
    });
  }

  /// 暂停播放，提供给外部调用
  pauseVideo() {
    this.setState({
      isPlaying: false,
    });
  }

  /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
  switchVideo(videoURL, seekTime) {
    this.setState({
      videoUrl: videoURL,
      currentTime: seekTime,
      isPlaying: true,
      showVideoCover: false,
    });
    this.videoPlayer.seek(seekTime);
  }

  _addMovioPlay = async () => {
    // console.log('电影播放次数加一');
    var token = await global.storage.load({
      key: 'token',
    });
    console.log(this.state.moviePic);
    var arr = token.playHistory;
    if (arr.length == 30) {
      arr.splice(29, 1);
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].mid == this.state.mid) {
        arr.splice(i, 1);
        // console.log('出现重复');
        break;
      }
    }
    var playHistory = {
      moviePic: this.state.moviePic,
      mid: this.state.mid,
    };
    arr.unshift(playHistory);
    console.log(playHistory);
    var str = '';
    var arr1 = [];
    for (const item of arr) {
      str = item.mid + ',' + item.moviePic;
      arr1.push(str);
    }
    // console.log('这是arr1', arr1);
    str = arr1.join('|');
    console.log(str);
    await fetch(Api.URL + 'addPlay?mid=' + this.state.mid)
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson.msg);

        // console.log('这里是toKen', token);
        global.storage.save({
          key: 'token',
          data: token,
          expires: null,
        });
      })
      .catch(error => {
        console.log(error);
      });
    await fetch(Api.URL + 'setPlayHistory/', {
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
      .then(responseJson => {})
      .catch(error => {
        console.error(error);
      });
  };
  componentDidMount() {
    // Orientation.lockToLandscape(); //在组件加载完毕后进入全屏模式
    console.log('这是视频:', this.state.videoUrl);
    this._addMovioPlay();
  }
  componentWillUnmount() {
    Orientation.lockToPortrait(); //在退出的同时,退出全屏模式
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  playButton: {
    width: rpx(40),
    height: rpx(40),
  },
  playControl: {
    width: rpx(30),
    height: rpx(30),
    marginLeft: 15,
  },
  shrinkControl: {
    width: rpx(30),
    height: rpx(30),
    borderColor: '#fff',
  },
  time: {
    fontSize: rpx(15),
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  control: {
    width: rpx(700),
    height: rpx(40),
    transform: [{scale: 2}, {rotate: '90deg'}],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    borderWidth: 1,
    right: rpx(340),
  },
});
