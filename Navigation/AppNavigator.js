// https://stackoverflow.com/questions/53367195/invariant-violation-the-navigation-prop-is-missing-for-this-navigator
// was used as a reference for this page

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../Screens/Login';
import WelcomScreen from '../Screens/Welcome';
import QuickReportScreen from '../Screens/QuickReport';
import CreateAccountScreen from '../Screens/CreateAccount';

const AppNavigator = createStackNavigator({
    Welcome: { screen: WelcomScreen},
    Login: { screen: LoginScreen },
    QuickReport: { screen: QuickReportScreen },
    CreateAccount: { screen: CreateAccountScreen},
});

const nav = createAppContainer(AppNavigator);

export default nav;