import * as React from 'react';
import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage'; 

import { StackActions, NavigationActions }from 'react-navigation';
import AddDogImage from '../../Components/AddDogImage';

import { 
    Button,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

class AddDog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: "",
            dogName : "",
            dogAge : "",
            breed : "",
            color : "",
            size : "",
            token : "",
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <AddDogImage/>
                <TextInput
                    value={this.state.name}
                    onChangeText={(dogName) => this.setState({ dogName })}
                    placeholder={ "Dog Name" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.dogAge}
                    onChangeText={(dogAge) => this.setState({ dogAge })}
                    placeholder={ "Dogs Age" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.breed}
                    onChangeText={(breed) => this.setState({ breed })}
                    placeholder={ "Dogs Breed" }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <TextInput
                    value={this.state.color}
                    onChangeText={(color) => this.setState({ color })}
                    placeholder={ "What color is the Dog" }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <TextInput
                    value={this.state.size}
                    onChangeText={(size) => this.setState({ size })}
                    placeholder={ "what is the dog's size " }
                    style={ styles.input }
                    autoCapitalize = 'none'
                />
                <Button
                    title={ 'Add Dog' }
                    style={ styles.input }
                    onPress={this.handleAddDogButton.bind(this)}
                />
                <Button
                    title={ 'Done' }
                    style={ styles.input }
                    onPress={this.handleDoneButton.bind(this)}
                />
            </View>
        );
    }

    clearState() {
        this.state.dogName = "";
        this.state.dogAge = "";
        this.state.breed = "";
        this.state.color = "";
        this.state.size = "";

        let resetAction = StackActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'AddDog' })
            ],
        });
        
        this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('AddDog');

    }

    async componentDidMount() {

        this.state.isLoggedIn = await deviceStorage.getItem('isLoggedIn');

    }

    async handleDoneButton() {
        let resetAction = StackActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'Profile' })
            ],
        });

        this.props.navigation.dispatch(resetAction);

        if(this.state.isLoggedIn === "1") {

            this.props.navigation.navigate('Dog')

        } else {

            deviceStorage.saveItem('isLoggedIn', "1");
            this.props.navigation.navigate('Feed')

        }
                
    }

    async handleAddDogButton() {
        const token = await deviceStorage.getItem("userKey");    
        const data = {
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
        axios.post('/dog/add', data, {
        headers: headers
        })
        .then((res) => {
            if(res.data.message === "New Dog Added") {
                this.clearState(this);

            } 
            
        })
        .catch((err) => {
            console.log(err);
        });

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

export default AddDog;