import React, { Component } from 'react';

import {
          AppRegistry,
          StyleSheet,
          Text,
          View,
          TouchableOpacity
        } from 'react-native';

import FBSDK, {LoginManager} from react-native-FBSDK

export default class facebookLogin extends Component {
   
    _facebookAuthentication() {
        LoginManager.logInWithReadPermissions((['public_profile'])).then(function(result)) {
            if (result.isCancelled) {
                console.log('Login cancelled');
            } else {
                console.log('Login Successful: ' + result.grantedPermissions);
            }
        }, function(error) {
            console.log('Error occured: ' +error);
        })
    }
    render() {
        return (
            <view style = styles.container>
                <TouchableOpacity onPress = {this._facebookAuthentication}>
                    <Text>
                        Login with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
                
                )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
