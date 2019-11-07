import * as React from 'react';
import { List, ListItem} from 'react-native-elements';

import { 
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

import Dog from '../../Components/Dog';
class DogScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
            
        }
    }



    handleAddDog = () => {

        this.props.navigation.navigate('AddDog');
        
    }
    

    render() {
        return (
            <ScrollView style={styles.container}>
                <Dog 
                style={styles.dogo} 
                action={this.handleAddDog.bind(this)}
                navigation={ this.props.navigation }
                />
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {

      backgroundColor: '#ecf0f1',
    },
    dogo: {
        flex: 1,
        flexDirection: 'row'
    }

  });

export default DogScreen;