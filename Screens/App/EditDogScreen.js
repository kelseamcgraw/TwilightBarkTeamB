import * as React from 'react';
import deviceStorage from '../../services/deviceStorage';
import axios from '../../util/Axios';
import styles from '../Styles';
import { 
    View,
    TextInput, 
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator,
    Text,
    Image
} from 'react-native';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            token: "",
            colors: [],
            dogList: [],

        }
    }

    async handleSaveButton () {
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
            'Authorization':'Bearer ' + this.state.token
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

    async componentDidMount() { 
        this.setState({token: await deviceStorage.getItem("userKey")}); 
        this.setState({dogList: this.props.navigation.getParam('dogList', 'no data')})
        let x = this.state.dogList.colors.split(",");
        this.setState({colors: x})

        this.setState({isLoading: false});
        

    }

    handleLostDog = () => {

        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + this.state.token
        };
        const data = {
            isLost: true,
            dogID: this.state.dogList.dogID
        }
        axios.post('/dog/update', data, {
        headers: headers
        })
        .then((res) => {
            this.props.navigation.navigate("Splash", {
                nextScreen: "Feed"
            });
            
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const {dogList, isLoading } = this.state;

        if(!isLoading) {
            return(
                <View style={styles.container}>
                    <Button
                        title={'Report Lost'}
                        onPress={this.handleLostDog.bind(this)}
                    />
                    <Image source={{uri: axios.defaults.baseURL + '/static/images/' + this.state.dogList.fileLocation}}
                            style={{ width: 200, height: 200, marginBottom: 10 }} 
                    />
                    <Text>{this.state.dogList.dogName}</Text>
                    {
                        this.state.colors.map((color, i) => {
                            if(color !== "") {
                                return (
                                <Text key={i}>{color}</Text>
                                )
                            }
                        })
                    }
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
        } else {
            return <ActivityIndicator />
        }

    }

}

export default Dog;