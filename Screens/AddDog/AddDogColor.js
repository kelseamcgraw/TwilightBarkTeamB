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
            colors: [],
            count : 0

        }
        
    }

    handleAddColor = () => {
        let colorString = ""
        this.state.colors.forEach((element) => {
            colorString = colorString + element + ","
        })

        this.props.navigation.navigate('AddDogBreed',  {
            dogName: this.props.navigation.getParam("dogName","dogName"),
            dogAge: this.props.navigation.getParam("dogAge", "dogAge"),
            alerts: this.props.navigation.getParam("alerts", "dogAlerts"),
            size: this.props.navigation.getParam('size', 'size'),
            colors: colorString,
        });
    }


    handleInsertColor = (color) => {
        this.setState({colors: [...this.state.colors, color]})
    }

    handleRemoveColor = (color) => {
        var array = [...this.state.colors]; // make a separate copy of the array
        var index = array.indexOf(color)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({colors: array});
  }
    }

    render() {
        let selectedColor = '';

        return (
            <View>
                <ColorPalette
                    removeColor={(color) => this.handleRemoveColor(color)}
                    insertColor={(color) => this.handleInsertColor(color) }
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