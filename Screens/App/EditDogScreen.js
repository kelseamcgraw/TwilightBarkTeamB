import * as React from 'react';


import { 
    View,
    Image,  
    FlatList, 
    TouchableOpacity, 
    StyleSheet,
    Text, 
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { Card, ListItem, Avatar, Button } from 'react-native-elements';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dogList: []
        }
    }

    async componentDidMount() { 
        
    }

    render() {

        return(
            <View style={styles.container}>
                <Text>dog edit</Text>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      },
    addDog: {
        fontSize: 20,
        color: "#007AFF"
    }, 

  });

export default Dog;