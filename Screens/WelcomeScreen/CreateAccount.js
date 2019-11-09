import * as React from 'react';
import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage';

import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

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
                //to-do show error or message
                console.log(res.data);

            } else if (res.data.token !== undefined) {
                const { navigate } = this.props.navigation;
                deviceStorage.saveItem("token", res.data.token);
                this.props.navigation.navigate('AuthLoading');
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    render() {
        return (
            <View style={styles.container}>
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
                <Text>Your information will not be shared with third parties.</Text>
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

export default CreateAccount;
