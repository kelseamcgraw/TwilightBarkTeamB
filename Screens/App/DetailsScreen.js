import * as React from 'react';

import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage'; 

import { List, ListItem} from 'react-native-elements';

import { 
    Text,
    TextInput,
    Button,
    View,
    StyleSheet
} from 'react-native';

class DetailsScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            city: "",
            state: "",
            zipCode: ""            
        }
    }

    handleUpdateUser = () => {

        axios.post('/user/update', {

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
                const { navigate } = this.props.navigation;
                deviceStorage.saveItem("userKey", res.data.token);
                this.props.navigation.navigate('AddDog');
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Add your Address</Text>
                <TextInput
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city })}
                    placeholder={ "City" }
                    autoCapitalize = 'none'
                    style={ styles.input }
                />
                <TextInput
                    secureTextEntry={true}
                    value={this.state.state}
                    onChangeText={(state) => this.setState({ state })}
                    placeholder={ "State" }
                    autoCapitalize = 'none'
                    style={ styles.input }
                />
                <TextInput
                    secureTextEntry={true}
                    value={this.state.zipCode}
                    onChangeText={(zipCode) => this.setState({ zipCode })}
                    placeholder={ "Zip Code" }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <Button
                    title={ 'Save' }
                    style={ styles.input }
                    onPress={this.handleUpdateUser.bind(this)}
                />
            </View>
        )
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
    text: {
      width: 250,
      height: 44,
      padding: 10,
    },
  });

export default DetailsScreen;