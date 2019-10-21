import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AddDogScreen from '../Screens/App/AddDogScreen';
import HomeScreen from '../Screens/App/HomeScreen';
import ProfileScreen from '../Screens/App/ProfileScreen';

import AuthLoadingScreen from '../Screens/AuthLoading';
// welcome page navigator componenets
import LoginScreen from '../Screens/WelcomeScreen/LoginScreen';
import WelcomScreen from '../Screens/WelcomeScreen/WelcomeScreen';
import QuickReportScreen from '../Screens/WelcomeScreen/QuickReportScreen';
import CreateAccountScreen from '../Screens/WelcomeScreen/CreateAccount';

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    AddDog: { screen: AddDogScreen }
});

const TabNavigator = createBottomTabNavigator({ 
    Home: HomeStack, 
    Profile: ProfileScreen
});

const AuthStack = createStackNavigator({ 
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
    QuickReport: { screen: QuickReportScreen },
    CreateAccount: { screen: CreateAccountScreen},
 });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);