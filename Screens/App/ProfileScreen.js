import * as React from 'react';

import deviceStorage from '../../services/deviceStorage';

import { 
    Button,
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

import { Card } from 'react-native-elements';


class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            person: ""
        }
    }

    handleLogoutButton = () => {
        const { navigate } = this.props.navigation;
        deviceStorage.removeAllKeys();
        deviceStorage.deleteItem("userKey");
        this.props.navigation.navigate('Splash', {
            nextScreen: "Auth"
        });
    }

    handleDogsButton = () => {
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('Dog');
    }

    handleDetailsButton = () => {
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('Details');
    }


    render() { 
        return (
            <View style={styles.container}>
                <TouchableOpacity
                onPress={this.handleLogoutButton.bind(this)}
                >
                    <Card 
                    style={styles.card}
                    >
                        <Text style={styles.text}>Logout</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={this.handleDetailsButton.bind(this)}
                >
                    <Card 
                    style={styles.card}
                    >
                        <Text style={styles.text}>Details</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={this.handleDogsButton.bind(this)}
                >
                    <Card 
                    style={styles.card}
                    >
                        <Text style={styles.text}>My Dogs</Text>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    card: {
        flex: 1,
        padding: 0, 
        maxHeight: 50,
    },
    text: {
        alignSelf: 'center'
    }
  });

export default Profile;