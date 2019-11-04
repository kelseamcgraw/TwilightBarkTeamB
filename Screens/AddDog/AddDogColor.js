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
import Icon from "react-native-vector-icons/Ionicons";

import ColorPalette from 'react-native-color-palette'

class AddDogColor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: "",
            color : "",

        }
        
    }

    render() {
        return (
            <ControlledColorPicker/>
        );
    }

}

const ControlledColorPicker = () => {
    let selectedColor = '#C0392B';
    return (
      <ColorPalette
        onChange={color => selectedColor = color}
        value={selectedColor}
        colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
        title={"Choose your dogs color's up to three"}
        
    />)
  }

export default AddDogColor;