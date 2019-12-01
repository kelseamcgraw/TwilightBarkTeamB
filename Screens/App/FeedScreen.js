import * as React from 'react';

import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage'; 
import DogCard from '../../Components/DogCard';
import { List, ListItem} from 'react-native-elements';
import styles from '../Styles';
import { 
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import Dog from '../../Components/DogCard';
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dogList: []
        }
    }

    async componentDidMount() {
        try {
            const token = await deviceStorage.getItem("userKey");
            const dogs =  await axios.get('/dog/lost', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if(dogs.data.length > 0) {
                this.setState({dogList: dogs.data, isLoading: false});
            } else {
                this.setState({dogList: [], isLoading: false})
            }
        } catch(err) {
            console.log(err);
        }

    }

    render() {
        const {isLoading, dogList } = this.state;
        if(!isLoading) {
            return (
                <View >
                        <DogCard
                            nextScreen={"LostDog"}
                            navigation={this.props.navigation}
                            dogList={dogList}
                        />
                </View>
            );
        } else {
            return <ActivityIndicator/>
        }
    }

}

export default Home;