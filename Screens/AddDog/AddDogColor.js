import * as React from 'react';
import axios from '../../util/Axios';

import { 
    View,
    TouchableOpacity,
    Image,
    Button,
    TextInput,
    StyleSheet,
    Text,
} from 'react-native';

import ColorPalette from '../../Components/ColorPalette/index';

class AddDogColor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: "",
            colors: [],
            count : 0

        }
        
    }

    handleAddColor = () => {
        console.log(this.state.colors);
    }

    handleButtonPress() {
        this.props.navigation.navigate('AddBreed');
    }

    render() {
        let selectedColor = '';

        return (
            <View>
                <ColorPalette
                
                    // onChange={(color) => selectedColor = color}
                    maxCount={3}
                    setCount={(count) => this.setState({count: count})}
                    title={ "Choose your colors up to three" }
                    value={selectedColor}
                    colors={['#000000', '#A52A2A', '#FFFFFF', '#FFD700', '#F5F5DC', '#D2B48C', '#808080']}        
                />
                <Button
                    title={ "Next" }
                    onPress={ this.handleAddColor.bind(this)}
                />
            </View>
        );
    }

}


export default AddDogColor;