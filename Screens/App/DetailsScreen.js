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
            zipCode: "",
            token: "",
            dataList: null,
            message: ""      
        }
    }

    handleUpdateUser = () => {

        const data = new FormData();

        data.append("citry", this.state.city);
        data.append("state", this.state.state);
        data.append("zipCode", this.state.zipCode);

        const headers = {
            'Accept':'application/json',
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer ' + this.state.token
        };
        axios.post('/user/update', data, {headers: headers})
        .then((res) => {
            this.setState({message: res.message});
        })
        .catch((err) => {
            this.setState({message: err});
        });

    }

    async componentDidMount() {
        const token = await deviceStorage.getItem("userKey");
        this.setState({dataList: this.props.navigation.getParam("dataList", "notfound")})
        this.setState({token: token});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.message}</Text>
                <Text>Add your Address</Text>
                <Text>City: {this.state.city}</Text>
                <Text>State: {this.state.state.toUpperCase()}</Text>
                <Text>zipCode: {this.state.zipCode}</Text>
                <TextInput
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city })}
                    placeholder={ "City" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.state}
                    onChangeText={(state) => this.setState({ state })}
                    placeholder={ "State" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.zipCode}
                    onChangeText={(zipCode) => this.setState({ zipCode })}
                    placeholder={ "Zip Code" }
                    style={ styles.input }
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