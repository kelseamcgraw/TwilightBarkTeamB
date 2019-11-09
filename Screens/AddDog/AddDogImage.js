import * as React from 'react';
import axios from '../../util/Axios';

import { 
    View,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';
import deviceStorage from '../../services/deviceStorage'; 
import styles from '../Styles.js';

import { StackActions, NavigationActions }from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class AddDogImage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            isLoadingImage: false,
            image: null,
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
                <Button
                    title={ 'Done' }
                    style={ styles.input }
                    onPress={this.handleDoneButton.bind(this)}
                />
            </View>
        );
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
        data.append({
            breed: this.state.breed,
            dogAge: parseInt(this.state.dogAge, 10),
            color: this.state.color,
            size: this.state.size, 
            dogName: this.state.dogName,
            dogImage: this.state.image
        });

        data.append('dogImage', {
            uri: this.state.image, // your file path string
            name: 'my_image',
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
                this.clearState(this);

            } 
            
        })
        .catch((err) => {
            console.log(err);
        });

    }

}

export default AddDogImage;