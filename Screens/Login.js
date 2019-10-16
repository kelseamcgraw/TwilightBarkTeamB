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
            username: "",
            password: ""
        }
    }

    handleLoginButtonPress = () => {
        fetch('http://127.0.0.1:3000/user/login', {
            method: 'POST',
            headers: {
    
                Accept: 'application/json',
                'Content-Type': 'application/json',
    
            },
            body: JSON.stringify({
    
                username: this.state.username,
                password: this.state.password
    
            }),
            })
            .then((res) => res.json())
            .then((resjson) => {
    
                if(resjson.error) {
    
                    console.log("there was an error");
    
                } else {
    
                    console.log(resjson.messaage);
    
                }
    
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
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