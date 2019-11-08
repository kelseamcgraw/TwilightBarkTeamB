import * as React from 'react';
import axios from '../../util/Axios';
import deviceStorage from '../../services/deviceStorage';

import { 
    View,
    Button,
    TextInput,
} from 'react-native';
import styles from '../Styles';

class AddDogBreed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breed : "",
            token : ""
        }
        
    }

    async componentDidMount() {
        try {
            this.state.token = await deviceStorage.getItem("userKey");

            const tmp =  await axios.get('https://dog.ceo/api/breeds/list/all')
            const breeds = tmp.data.message;
            console.log(breeds);

        } catch(err) {
                console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.breed}
                    onChangeText={(breed) => this.setState({ breed })}
                    placeholder={ "choose your breed up to three " }
                    style={ styles.input }
                    autoCapitalize = 'none'
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
       
                
    }

}

export default AddDogBreed;