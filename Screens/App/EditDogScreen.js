import * as React from 'react';
import deviceStorage from '../../services/deviceStorage';
import axios from '../../util/Axios';

import { 
    View,
    TextInput, 
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator
} from 'react-native';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dogName: this.props.navigation.getParam('dogName', 'default value'),
            color: this.props.navigation.getParam('color', 'default value'),
            size: this.props.navigation.getParam('size', 'default value'),
            breed: this.props.navigation.getParam('breed', 'default value'),
            file: this.props.navigation.getParam('file', 'default value'),
            dogAge: this.props.navigation.getParam('dogAge', 'default value'),
            dogId: this.props.navigation.getParam('dogId', 'NO-ID')

        }
    }

    async handleSaveButton () {

        const token = await deviceStorage.getItem("userKey");  
        const data = {
            dogId: this.state.dogId,
            breed: this.state.breed,
            dogAge: parseInt(this.state.dogAge, 10),
            color: this.state.color,
            size: this.state.size, 
            dogName: this.state.dogName
        };
        
        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        };
        axios.post('/dog/update', data, {
        headers: headers
        })
        .then((res) => {
            this.props.navigation.navigate("Splash", {
                nextScreen: "Dog"
            });
            
        })
        .catch((err) => {
            console.log(err);
        });

    }

    componentDidMount() { 
    }

    render() {

        return(
            <View style={styles.container}>
                <TextInput
                    value={this.state.dogName}
                    onChangeText={(dogName) => this.setState({dogName})}
                />
                <TextInput
                value={this.state.color}
                onChangeText={(color) => this.setState({color})}
                />
                <TextInput
                    value={this.state.size}
                    onChangeText={(size) => this.setState({size})}
                />
                <TextInput
                    value={this.state.breed}
                    onChangeText={(breed) => this.setState({breed})}
                />    
                <TextInput
                    value={this.state.dogAge}
                    onChangeText={(dogAge) => this.setState({dogAge})}
                /> 
                <Button
                    title={ "Save" }
                    onPress={this.handleSaveButton.bind(this)}
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
    addDog: {
        fontSize: 20,
        color: "#007AFF"
    }, 

  });

export default Dog;