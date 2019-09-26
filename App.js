import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import Login from './Components/Login'
import React, { useState } from 'react';
import {  TextInput, 
          Button, 
          Platform, 
          StatusBar, 
          StyleSheet, 
          View 
        } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WelcomScreen from './Components/Welcome';


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <WelcomScreen />
      </View>
      // <View style={styles.container}>
      //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      //   <AppNavigator />
      // </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
