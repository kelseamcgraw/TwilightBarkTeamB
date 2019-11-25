import * as React from 'react';
import axios from '../../util/Axios';
// https://snack.expo.io/@zvona/a-simple-login-form was referenced for this file

import deviceStorage from '../../services/deviceStorage';

import { 
    Button,
    View,
    TextInput,
    Text
} from 'react-native';
import styles from '../Styles.js';
import GooglesignIn from './GoogleLogin';
import FacebooksignIn from './FacebookLogin';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleLoginButtonPress = () => {

        axios.post('/user/login', {

            username: this.state.username,
            password: this.state.password
    
        })
        .then((res) => {

            if(res.data.message !== undefined || res.data.error !== undefined) {
                //to-do show error or message
                console.log(res.data);
    
            } else if (res.data.token !== undefined) {

                const { navigate } = this.props.navigation;
                deviceStorage.saveItem("userKey", res.data.token);
                this.props.navigation.navigate('AuthLoading');
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }
    
    handleFailedLogin = (data) => {



    }

    handleFacebookLogin = () => {
        // this.props.navigation.navigate('GoogleLogin')
        FacebooksignIn();
    }

    handleGoogleLogin = () => {
        // this.props.navigation.navigate('GoogleLogin')
        GooglesignIn();
    }

    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                autoCapitalize = 'none'
                style={styles.input}
                />
                <TextInput
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                autoCapitalize = 'none'
                secureTextEntry={true}
                style={styles.input}
                />
                <Button
                title={'Login'}
                style={styles.input}
                onPress={this.handleLoginButtonPress.bind(this)}
                />
                <Button
                    title={'Google Login'}
                    onPress={this.handleGoogleLogin}
                />
                <Button
                    title={'Facebook Login'}
                    onPress={this.handleFacebookLogin}
                />
            </View>
        );
    }

}

export default Login;