import * as React from 'react';

import deviceStorage from '../../services/deviceStorage';

import { 
    Button,
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            person: ""
        }
    }

    handleLogoutButton = () => {
        const { navigate } = this.props.navigation;
        deviceStorage.deleteItem('token');
        this.props.navigation.navigate('AuthLoading');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <Button
                    title={ 'Logout' }
                    style={ styles.input }
                    onPress={this.handleLogoutButton.bind(this)}
                />
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

export default Profile;