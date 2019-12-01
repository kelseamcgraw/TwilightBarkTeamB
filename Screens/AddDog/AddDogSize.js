import * as React from 'react';
import axios from '../../util/Axios';

import { 
    View,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';
import styles from '../Styles.js';

class AddDogSize extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            size : "",

        }
        
    }

    handleNextButton() {
        this.props.navigation.navigate('AddDogColor', {
            dogName: this.props.navigation.getParam("dogName","dogName"),
            dogAge: this.props.navigation.getParam("dogAge", "dogAge"),
            size: this.state.size,
            zipCode: this.props.navigation.getParam("zipCode", "zipCode"),
            alert: this.props.navigation.getParam("alert", "alerts")
        });    

    }

    handleImagePress(s) {
        this.setState({size: s});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                    onPress={ this.handleImagePress.bind(this, 'Small')}
                    >
                        <Image 
                        style={styles.smallImage}
                        source={ require('../../images/paw.jpg') } 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={ this.handleImagePress.bind(this, 'Medium')}
                    >
                        <Image 
                        style={styles.mediumImage}
                        source={ require('../../images/paw.jpg') } 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={ this.handleImagePress.bind(this,'Large')}
                    >
                        <Image 
                        style={styles.largeImage}
                        source={ require('../../images/paw.jpg') } 
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    title={ 'Next' }
                    style={ styles.input }
                    onPress={this.handleNextButton.bind(this)}
                />
            </View>
        );
    }

    
}

export default AddDogSize;