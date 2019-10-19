import * as React from 'react';


import { 
    Button,
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            person: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
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
    input: {
      width: 250,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });

export default Home;