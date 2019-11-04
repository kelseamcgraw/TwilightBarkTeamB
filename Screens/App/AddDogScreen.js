import * as React from 'react';
import axios from '../../util/Axios';

import { 
    View,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    StyleSheet,
} from 'react-native';
import deviceStorage from '../../services/deviceStorage'; 

import { StackActions, NavigationActions }from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class AddDog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: "",
            dogName : "",
            dogAge : "",
            breed : "",
            color : "",
            isLoadingImage: false,
            image: null,
            size : "",
            token : "",
        }
        
    }

    render() {
        let { image } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pickImage }>    

                    <Image source={this.state.isLoadingImage
                        ?
                        { uri: image }
                        :
                        require('../../images/defaultImage.png')}
                        style={{ width: 200, height: 200, marginBottom: 10 }} 
                    />

                </TouchableOpacity>
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
        this.setState({dogName: ""});
        this.setState({dogAge: ""});
        this.setState({breed: ""});
        this.setState({color: ""});
        this.setState({size: ""});
        this.setState({isLoadingImage: false});
        this.setState({image: null});
        console.log("state cleared");
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
        this.getPermissionAsync();

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

    async handleAddDogButton() {
        const token = await deviceStorage.getItem("userKey");    
        const data = new FormData();
        data.append('breed', this.state.breed)
        data.append('dogAge', parseInt(this.state.dogAge, 10))
        data.append('color', this.state.color)
        data.append('size', this.state.size)
        data.append('dogName', this.state.dogName)


        data.append('dogImage', {
            uri: this.state.image, 
            name: 'my-image',
            type: 'image/jpg'
        })

        const headers = {
            'Accept':'application/json',
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer ' + token
        };
        axios.post('/dog/add', data, {
        headers: headers
        })
        .then((res) => {

            if(res.data.message === "New Dog Added") {

                this.clearState();

            } 
            
        })
        .catch((err) => {
            console.log(err.message);
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