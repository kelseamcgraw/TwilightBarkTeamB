import * as React from 'react';
import axios from '../../util/Axios';

import { 
    View,
    Button,
    TextInput,
} from 'react-native';
import styles from '../Styles.js';

class AddDogBreed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breed : "",
        }
        
    }

    render() {
        return (
            <View>
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