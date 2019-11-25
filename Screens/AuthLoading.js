import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Text,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import deviceStorage from '../services/deviceStorage';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await deviceStorage.getItem('userKey');

    if(userToken) {
      deviceStorage.saveItem('isLoggedIn', '1');
      this.props.navigation.navigate('App');
    } else {
      deviceStorage.saveItem('isLoggedIn', '0');
      this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content 
  render() {
    return (
      <View styles= {styles.container}>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });