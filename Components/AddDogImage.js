import * as React from 'react';

import { 
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class AddDogImage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingImage: false,
            image: null
        }
        
    }

    render() {
        let { image } = this.state;
        return (
            <TouchableOpacity onPress={this._pickImage }>    

                    <Image source={this.state.isLoadingImage
                        ?
                        { uri: image }
                        :
                        require('../images/defaultImage.png')}
                        style={{ width: 200, height: 200, marginBottom: 10 }} 
                    />
    
            </TouchableOpacity>
        );
    }

    async componentDidMount() {

        this.getPermissionAsync();

    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        }
    }

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
}


export default AddDogImage;