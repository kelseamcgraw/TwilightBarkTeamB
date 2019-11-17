import * as React from 'react';
import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage'; 

import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';

import { 
    Button,
    View,
    Text,
    TextInput,
} from 'react-native';
import styles from '../Styles.js';

class CreateAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username : "",
            password : "",
            repassword : "",
            phoneNumber : "",
            email : ""
        }
    }



    handleCreateAccountButton = () => {

        axios.post('/user/signup', {

            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
    
        })
        .then((res) => {
            if(res.data.message !== undefined || res.data.error !== undefined) {
                //to-do show error or message and check repassword and password match
                console.log(res.data);
    
            } else if (res.data.token !== undefined) {
                deviceStorage.saveItem("userKey", res.data.token);
                this.props.navigation.navigate('AddDogInfo');
            }
        })
        .catch((err) => {
            console.log(err);
        });
 
    }

    render() {
        return (
            <View style={styles.co/ntainer}>
                <Button/>
                <Text>sign up with google/facebook</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={ "username" }
                    autoCapitalize = 'none'
                    style={ styles.input }
                />
                <TextInput
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={ "password" }
                    autoCapitalize = 'none'
                    style={ styles.input }
                />
                <TextInput
                    secureTextEntry={true}
                    value={this.state.repassword}
                    onChangeText={(repassword) => this.setState({ repassword })}
                    placeholder={ "re enter password" }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <TextInput
                    value={this.state.phoneNumber}
                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    placeholder={ "phone number" }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={ "email" }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <Button
                    title={ 'Create Account' }
                    style={ styles.input }
                    onPress={this.handleCreateAccountButton.bind(this)}
                />
            </View>
        );
    }

}

// First- obtain access token from Expo's Google API
// const { type, accessToken, user } = await Google.logInAsync(config);

// if (type === 'success') {
//   // Then you can use the Google REST API
//   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });
// }

export default CreateAccount;