import * as React from 'react';

import { 
    Button,
    View,
    Text
} from 'react-native';
import styles from '../Styles.js';

import GooglesignIn from './GoogleLogin';
import FacebooksignIn from './FacebookLogin';

class WelcomScreen extends React.Component {

    render() {
      const { navigate } = this.props.navigation;
        return (
            <View style= { styles.container}>
                <Button
                title={'Login'}
                style={styles.input}
                onPress = {() => 
                  this.props.navigation.navigate('Login')
                }
                />
                <Button
                title={"I'm new here"}
                style={styles.input}
                onPress={() =>
                  this.props.navigation.navigate('CreateAccount')
                }
                />
                <Button
                title={'Make a report without account'}
                style={styles.input}
                onPress={() =>
                  this.props.navigation.navigate("QuickReport")
                }
                />
                <Button
                    title={'Google Login'}
                    onPress={this.handleGoogleLogin}
                />
                <Button
                    title={'Facebook Login'}
                    onPress={this.handleFacebookLogin}
                />
                <Text>Your information will not be shared with third parties.</Text>
            </View>
        );
    }

    handleFacebookLogin = () => {
      // this.props.navigation.navigate('GoogleLogin')
      FacebooksignIn();
  }

  handleGoogleLogin = () => {
      GooglesignIn.signIn(this.props.navigation);
      // this.props.navigation.navigate('AddDogInfo')
  }

}

export default WelcomScreen;