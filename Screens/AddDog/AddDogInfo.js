import * as React from 'react';

import { 
    View,
    Button,
    Text,
    TextInput,
} from 'react-native';
import styles from '../Styles.js';

class AddDogInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dogID: 0,
            dogName : "",
            dogAge : "",
            token : "",
            alert: "",
            zipCode: ""
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>What Zip Code do you want to be notified about</Text>
                <TextInput
                    value={this.state.zipCode}
                    onChangeText={(zipCode) => this.setState({ zipCode })}
                    placeholder={ "Zip Code" }
                    style={ styles.input }
                />
                <Text>Whats my name?</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={(dogName) => this.setState({ dogName })}
                    placeholder={ "Dog Name" }
                    style={ styles.input }
                />
                <Text>How old am I?</Text>
                <TextInput
                    value={this.state.dogAge}
                    onChangeText={(dogAge) => this.setState({ dogAge })}
                    placeholder={ "Dogs Age" }
                    style={ styles.input }
                />
                <Text>Please add any important info about me</Text>
                <TextInput
                    value={this.state.alert}
                    onChangeText={(alert) => this.setState({ alert })}
                    placeholder={ "Will I bite?" }
                    style={ styles.input }
                />
                <Button
                    title={ 'Next' }
                    style={ styles.input }
                    onPress={this.handleNextButton.bind(this)}
                />

            </View>
        );
    }



    async handleNextButton() {

        this.props.navigation.navigate('AddDogSize', {
            dogName: this.state.dogName,
            dogAge: this.state.dogAge,
            alerts: this.state.alert,
            zipCode: this.state.zipCode
        });    
                
    }

}


export default AddDogInfo;