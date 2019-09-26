import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../Components/Login';
import { createAppContainer } from 'react-navigation';
import WelcomScreen from '../Components/Welcome';

const AppNavigator = createStackNavigator({
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
});

const nav = createAppContainer(AppNavigator);

export default nav;