import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// tab navigator components
import HomeScreen from '../Screens/App/HomeScreen';
import ProfileScreen from '../Screens/App/ProfileScreen';

import AuthLoadingScreen from '../Screens/AuthLoading';
// stack navigator componenets
import LoginScreen from '../Screens/WelcomeScreen/LoginScreen';
import WelcomScreen from '../Screens/WelcomeScreen/WelcomeScreen';
import QuickReportScreen from '../Screens/WelcomeScreen/QuickReportScreen';
import CreateAccountScreen from '../Screens/WelcomeScreen/CreateAccount';
import VerifyAccountScreen from '../Screens/WelcomeScreen/VerifyAccount';


const TabNavigator = createBottomTabNavigator({ 
    Home: HomeScreen, 
    Profile: ProfileScreen
});

const AuthStack = createStackNavigator({ 
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
    QuickReport: { screen: QuickReportScreen },
    CreateAccount: { screen: CreateAccountScreen},
    VerifyAccount: { screen: VerifyAccountScreen},
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