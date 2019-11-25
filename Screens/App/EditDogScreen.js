import * as React from 'react';
import deviceStorage from '../../services/deviceStorage';
import axios from '../../util/Axios';

import { 
    View,
    TextInput, 
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator,
    Text
} from 'react-native';
import { element } from 'prop-types';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dogName: this.props.navigation.getParam('dogName', 'My Name'),
            color: this.props.navigation.getParam('color', 'What Color\'s am I '),
            size: this.props.navigation.getParam('size', 'My Size'),
            breeds: "",
            file: this.props.navigation.getParam('file', 'No file found'),
            dogAge: this.props.navigation.getParam('dogAge', 'My Age'),
            dogId: this.props.navigation.getParam('dogId', 'NO-ID'),
            alerts: this.props.navigation.getParam('dogId', 'alerts'),
            dogList: this.props.navigation.getParam('dogList', 'no data'),

        }
    }

    async handleSaveButton () {

        const token = await deviceStorage.getItem("userKey");  
        const data = {
            dogId: this.state.dogId,
            breeds: this.state.breeds,
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

    handleBreedChange(i) {
        
    }

    componentDidMount() { 
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    value={this.state.dogList.dogName}
                    onChangeText={(dogName) => this.setState({dogName})}
                />
                <TextInput
                value={this.state.dogList.colors}
                onChangeText={(color) => this.setState({color})}
                />
                <TextInput
                    value={this.state.dogList.size}
                    onChangeText={(size) => this.setState({size})}
                />
                {
                this.state.dogList.fk_dogID.map((breed, i) => {
                    return (
                    <TextInput
                        key={i}
                        value={breed.name}
                        onChangeText={() => this.handleBreedChange(i)}
                    />
                    );
                })
                }
                <TextInput
                    value={this.state.dogList.breeds}
                    onChangeText={(breed) => this.setState({breed})}
                />    
                <TextInput
                    value={this.state.dogList.dogAge.toString()}
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