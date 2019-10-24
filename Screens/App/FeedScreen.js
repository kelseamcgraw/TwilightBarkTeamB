import * as React from 'react';

import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage'; 

import { List, ListItem} from 'react-native-elements';

import { 
    Text,
    View,
    StyleSheet
} from 'react-native';

import Dog from '../../Components/Dog';
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
            
        }
    }




    

    render() {
        return (
            <View style={styles.container}>
                <Text>Feed</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    text: {
      width: 250,
      height: 44,
      padding: 10,
    },
  });

export default Home;