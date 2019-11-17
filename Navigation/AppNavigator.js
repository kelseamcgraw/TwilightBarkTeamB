import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
import AddDogInfoScreen from '../Screens/AddDog/AddDogInfo';
import AddDogImageScreen from '../Screens/AddDog/AddDogImage';
import AddDogColorScreen from '../Screens/AddDog/AddDogColor';
import AddDogBreedScreen from '../Screens/AddDog/AddDogBreed';
import AddDogSizeScreen from '../Screens/AddDog/AddDogSize'

const FeedStack = createStackNavigator({
    Feed: { screen: FeedScreen },
});

const AddDogStack = createStackNavigator({
  AddDogInfo: { screen: AddDogInfoScreen },
  AddDogImage: { screen: AddDogImageScreen },
  AddDogColor : { screen: AddDogColorScreen },
  AddDogBreed: { screen: AddDogBreedScreen },
  AddDogSize: { screen: AddDogSizeScreen }
});

const ProfileStack = createStackNavigator({
    Profile: { screen: ProfileScreen },
    EditDog : { screen: EditDogScreen },
    AddDogInfo: { screen: AddDogInfoScreen },
    AddDogSize: { screen: AddDogSizeScreen },
    AddDogImage: { screen: AddDogImageScreen },
    AddDogColor : { screen: AddDogColorScreen },
    AddDogBreed: { screen: AddDogBreedScreen },
    Details: { screen: DetailsScreen },
    MyDogs: { screen: DogScreen }
});

const TabNavigator = createBottomTabNavigator({ 
    Feed: FeedStack, 
    Profile: ProfileStack
});

const AuthStack = createStackNavigator({ 
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
    QuickReport: { screen: QuickReportScreen },
    CreateAccount: { screen: CreateAccountScreen},
    AddDogInfo: { screen: AddDogInfoScreen },
    AddDogSize: { screen: AddDogSizeScreen },
    AddDogImage: { screen: AddDogImageScreen },
    AddDogColor : { screen: AddDogColorScreen },
    AddDogBreed: { screen: AddDogBreedScreen },
 });

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Splash: SplashScreen

    },
    {
      initialRouteName: 'Splash',
    }
  )
);