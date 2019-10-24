import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AddDogScreen from '../Screens/App/AddDogScreen';
import DogScreen from '../Screens/App/DogScreen';
import ProfileScreen from '../Screens/App/ProfileScreen';
import FeedScreen from '../Screens/App/FeedScreen';

import AuthLoadingScreen from '../Screens/AuthLoading';
// welcome page navigator componenets
import LoginScreen from '../Screens/WelcomeScreen/LoginScreen';
import WelcomScreen from '../Screens/WelcomeScreen/WelcomeScreen';
import QuickReportScreen from '../Screens/WelcomeScreen/QuickReportScreen';
import CreateAccountScreen from '../Screens/WelcomeScreen/CreateAccount';
import SplashScreen from '../Screens/SpashScreen';
import DetailsScreen from '../Screens/App/DetailsScreen';
import EditDogScreen from '../Screens/App/EditDogScreen';

const FeedStack = createStackNavigator({
    Feed: { screen: FeedScreen },
});

const ProfileStack = createStackNavigator({
    Profile: { screen: ProfileScreen },
    AddDog: { screen: AddDogScreen },
    Dog: { screen: DogScreen },
    Details: { screen: DetailsScreen },
    EditDog : { screen: EditDogScreen }
});

const TabNavigator = createBottomTabNavigator({ 
    Home: FeedStack, 
    Profile: ProfileStack
});

const AuthStack = createStackNavigator({ 
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
    QuickReport: { screen: QuickReportScreen },
    CreateAccount: { screen: CreateAccountScreen},
    AddDog: { screen: AddDogScreen }
 });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
      Splash: SplashScreen

    },
    {
      initialRouteName: 'Splash',
    }
  )
);