import * as React from 'react';


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
            dogName : "",
            username : "",
            password : "",
            repassword : "",
            phoneNumber : "",
            email : ""
        }
    }

    handleCreateAccountButton = () => {
        fetch('http://127.0.0.1:3000/user/signup', {
        method: 'POST',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({

            dogName: this.state.dogName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber

        }),
        })
        .then((res) => res.json())
        .then((resjson) => {

            if(resjson.error) {

                console.log(resjson.error.msg);

            } else {

                console.log(resjson);

            }

        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>sign up with google/facebook</Text>
                <TextInput
                    value={this.state.size}
                    onChangeText={(dogName) => this.setState({ dogName })}
                    placeholder={ "Dogs Name" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.name}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={ "username" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.color}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={ "password" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.size}
                    onChangeText={(repassword) => this.setState({ repassword })}
                    placeholder={ "re enter password" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.gender}
                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                    placeholder={ "phone number" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.address}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={ "email" }
                    style={ styles.input }
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