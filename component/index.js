import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Dimensions,
  StatusBar,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//引入icon组件
// import {Ionicons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// 引入3个组件
// 分类
import Classify from './index/classify';
// 我的
import Home from './index/home';
// 推荐
import Recommend from './index/recommend';
const Tab = createBottomTabNavigator();
// 屏幕配饰
const rpx = dp => {
  return (Dimensions.get('window').width / 750) * dp;
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#38373d',
  },
};
export default class index extends Component {
  static navigationOptions = {
    header: null, //隐藏顶部导航栏
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  doLogin = () => {
    this.props.navigation.navigate('Login');
  };
  doIn = (where, mid) => {
    this.props.navigation.navigate(where, {mid: mid});
  };
  onBackAndroid = () => {
    //这里的路由信息是你自己项目中的，通过这个原理，我们还是可以提示一些其他信息，比如表单没填写完整等等
    console.log(this.props);
    // alert('是否退出?');
    if (this.props.route.name == 'Index') {
      //写入当前页面的路由信息
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //按第二次的时候，记录的时间+2000 >= 当前时间就可以退出
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp(); //退出整个应用
        return false;
      }
      this.lastBackPressed = Date.now(); //按第一次的时候，记录时间
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT); //显示提示信息
      return true;
    } else {
      return true;
    }
  };
  render() {
    return (
      <NavigationContainer independent={true} theme={MyTheme}>
        {/* 隐藏顶部状态栏 */}
        <StatusBar
          backgroundColor="#ff0000"
          translucent={true}
          hidden={true}
          animated={true}
        />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              // console.log('color', color);
              if (route.name == '推荐') {
                iconName = focused ? 'ios-home' : 'ios-home';
              } else if (route.name == '分类') {
                iconName = focused ? 'ios-tv' : 'ios-tv';
              } else if (route.name == '我的') {
                iconName = focused ? 'ios-person' : 'ios-person';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          // 文字颜色
          tabBarOptions={{
            // 处于点击状态的文字颜色
            activeTintColor: '#129fff',
            // 未点击的文字状态
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="推荐"
            component={Recommend}
            initialParams={{
              doIn: this.doIn,
            }}
          />
          <Tab.Screen
            name="分类"
            component={Classify}
            initialParams={{
              doIn: this.doIn,
            }}
          />
          <Tab.Screen
            name="我的"
            component={Home}
            initialParams={{
              doLogin: this.doLogin,
              doIn: this.doIn,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  componentWillMount() {
    //执行一次，在初始化render之前执行，
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({});
    //   console.log('这里是index', this.props.route.params);
    // }, 3000);
  }
  componentWillUnmount() {
    //当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }
}

const styles = StyleSheet.create({});
