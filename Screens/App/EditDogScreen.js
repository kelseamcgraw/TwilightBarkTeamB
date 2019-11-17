import * as React from 'react';
import deviceStorage from '../../services/deviceStorage';
import axios from '../../util/Axios';

import { 
    View,
    TextInput, 
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator
} from 'react-native';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingImage: false,
            image: null,
            isLoading: true,
            dogName: this.props.navigation.getParam('dogName', 'My Name'),
            colors: this.props.navigation.getParam('colors', 'What Color\'s am I '),
            size: this.props.navigation.getParam('size', 'My Size'),
            breeds: this.props.navigation.getParam('breeds', 'My Breed'),
            fileuri: axios.defaults.baseURL + "/static/images/" + this.props.navigation.getParam('fileLocation', 'No file found'),
            dogAge: this.props.navigation.getParam('dogAge', 'My Age'),
            dogId: this.props.navigation.getParam('dogId', 'NO-ID'),
            alerts: this.props.navigation.getParam('dogId', 'alerts')

        }
    }

    async handleSaveButton () {

        const token = await deviceStorage.getItem("userKey");  
        const data = {
            dogId: this.state.dogId,
            breeds: this.state.breeds,
            dogAge: parseInt(this.state.dogAge, 10),
            colors: this.state.colors,
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
        this.getPermissionAsync();
    }


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        }
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({isLoadingImage: true});
            this.setState({ image: result.uri });
        }
    };

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pickImage }>    

                <Image source={{ uri: this.state.fileuri }}
                    style={{ width: 200, height: 200, marginBottom: 10 }} 
                />

                </TouchableOpacity>
                <TextInput
                    value={this.state.dogName}
                    onChangeText={(dogName) => this.setState({dogName})}
                />
                <TextInput
                value={this.state.colors}
                onChangeText={(colors) => this.setState({colors})}
                />
                <TextInput
                    value={this.state.size}
                    onChangeText={(size) => this.setState({size})}
                />
                <TextInput
                    value={this.state.breeds}
                    onChangeText={(breeds) => this.setState({breeds})}
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