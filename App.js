// In App.js in a new project
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// 引入组件
import Login from './component/login'; //登录组件
import Register from './component/register'; //注册组件
import Index from './component/index'; //首页
import Detail from './component/Detail'; //电影详情页
import Play from './component/Play'; //电影播放页
import SearchMovies from './component/SearchMovies'; //搜索结果页
import Playhistoryall from './component/Playhistoryall'; //观看历史页
import Collall from './component/Collall'; //收藏页码
const Stack = createStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      phone: '',
      pwd: '',
      userHeadPic: './assets/userHead/def.png',
      // 用户观看历史
      playHistory: [],
      // 用户收藏
      collect: [],
    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Index"
            component={Index}
            // 隐藏顶部导航栏
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Play"
            component={Play}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{title: '用户登录'}}
            initialParams={{isLogin: this.isLogin}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: '用户注册'}}
          />
          <Stack.Screen
            name="SearchMovies"
            component={SearchMovies}
            options={{title: '搜索结果'}}
          />
          <Stack.Screen
            name="Playhistoryall"
            component={Playhistoryall}
            options={{title: '观看历史'}}
          />
          <Stack.Screen
            name="Collall"
            component={Collall}
            options={{title: '我的收藏'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  componentDidMount() {
    console.disableYellowBox = true;
  }
}
