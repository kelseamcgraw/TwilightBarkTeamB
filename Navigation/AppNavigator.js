import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../Components/Login';
import WelcomScreen from '../Components/Welcome';
import QuickReportScreen from '../Components/QuickReport';
import CreateAccountScreen from '../Components/CreateAccount';

const AppNavigator = createStackNavigator({
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
    QuickReport: { screen: QuickReportScreen },
    CreateAccount: { screen: CreateAccountScreen},
});

const nav = createAppContainer(AppNavigator);

export default nav;