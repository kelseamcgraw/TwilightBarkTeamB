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
            isLoggedIn: "0",
            token : "",
            dogAge: "",
            size: "",
            dogName: "",
            colors: "",
            breeds: "",
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
                    title={ 'Add Another' }
                    style={ styles.input }
                    onPress={this.handleAddAnotherButton.bind(this)}
                />
                <Button
                    title={ 'Done' }
                    style={ styles.input }
                    onPress={this.handleDoneButton.bind(this)}
                />
            </View>
        );
    }


    async componentDidMount() {
        this.setState({dogName:this.props.navigation.getParam("dogName","dogName")});
        this.setState({dogAge: this.props.navigation.getParam("dogAge", "dogAge")});
        this.setState({size: this.props.navigation.getParam('size', 'size')});
        this.setState({colors: this.props.navigation.getParam('colors', 'colors')});
        this.setState({breeds: this.props.navigation.getParam('breeds', 'breeds')});
        this.getPermissionAsync();
        
    }

    async handleDoneButton() {

        this.postData();
        let resetAction = StackActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'Profile' })
            ],
        });

        this.props.navigation.dispatch(resetAction);

            deviceStorage.saveItem('isLoggedIn', "1");
            this.props.navigation.navigate('Feed')
                
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

    async handleAddAnotherButton() {
        this.postData();
        let resetAction = StackActions.reset({
            index: 0,
            actions: [
            NavigationActions.navigate({ routeName: 'Profile' })
            ],
        });

        this.props.navigation.dispatch(resetAction);

        this.props.navigation.navigate('AddDogInfo')
    }

    async postData() {
        const token = await deviceStorage.getItem("userKey");    
        const data = new FormData();
        data.append("breeds", this.state.breeds);
        data.append("dogAge", this.state.dogAge);
        data.append("colors", this.state.colors);
        data.append("size", this.state.size);
        data.append("dogName", this.state.dogName);
        data.append("dogImage", this.state.dogImage);

        data.append('dogImage', {
            uri: this.state.image,
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