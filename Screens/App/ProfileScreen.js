import * as React from 'react';

import axios from '../../util/Axios';
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
            dataList: [],
            isLoading: true
        }
    }

    handleLogoutButton = () => {
        deviceStorage.removeAllKeys();
        this.props.navigation.navigate('Splash', {
            nextScreen: "Auth"
        });
    }

    handleDogsButton = () => {
        this.props.navigation.navigate('MyDogs', {
            dataList: this.state.dataList
        });
    }

    handleDetailsButton = () => {
        this.props.navigation.navigate('Details', {
            dataList: this.state.dataList
        });
    }

    async componentDidMount() { 
        try {
            const token = await deviceStorage.getItem("userKey");
            const data =  await axios.get('/user/dogs', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if(data.data.length > 0) {
                this.setState({dataList: data.data[0], isLoading: false});
            } else {
                this.setState({dataList: [], isLoading: false})
            }
        } catch(err) {
            console.log(err);
        }
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