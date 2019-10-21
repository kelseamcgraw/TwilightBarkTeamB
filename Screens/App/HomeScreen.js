import * as React from 'react';

import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage'; 

import { List, ListItem} from 'react-native-elements';

import { 
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



    handleAddDog = () => {
        const { navigate } = this.props.navigation;

        this.props.navigation.navigate('AddDog');
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Dog action={this.handleAddDog.bind(this)}/>
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