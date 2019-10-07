import * as React from 'react';

// https://snack.expo.io/@zvona/a-simple-login-form was referenced for this file

import { 
    Button,
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    
    handleLoginButtonPress = () => {
        console.log("Username: " + this.state.email + " Password: " + this.state.password);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                value={this.state.username}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Username'}
                style={styles.input}
                />
                <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
                />
                <Button
                title={'Login'}
                style={styles.input}
                onPress={this.handleLoginButtonPress.bind(this)}
                />
                <Text>google/facebook here</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 250,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });

export default Login;