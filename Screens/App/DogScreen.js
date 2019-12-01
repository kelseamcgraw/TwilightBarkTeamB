import * as React from 'react';

import axios from '../../util/Axios';
import deviceStorage from '../../services/deviceStorage';

import { 
    View,
    TouchableOpacity, 
    StyleSheet,
    Text, 
    ActivityIndicator
} from 'react-native';
import styles from '../Styles';
import DogCard from '../../Components/DogCard';
import { Card, ListItem} from 'react-native-elements';
class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataList: null,
            isLoading: true,
            dogList: []
        }
    }

    async componentDidMount() { 
        try {
            const token = await deviceStorage.getItem("userKey");
            const dogs =  await axios.get('/user/dogs', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if(dogs.data.length > 0) {
                this.setState({dogList: dogs.data[0].dogs, isLoading: false});
            } else {
                this.setState({dogList: [], isLoading: false})
            }
        } catch(err) {
            console.log(err);
        }
    }
// breed access this.state.dogList[0].fk_dogID[0].name

    handleCardPress = (i, e) => {
        this.props.navigation.navigate('EditDog', {
             dogList: this.state.dogList

        });
    }

    handleAddDogPress = () => {
        this.props.navigation.navigate("AddDogInfo");
    }

    render() {
        const { dogList, isLoading } = this.state;

        if(!isLoading){
            if(dogList.length > 0) {
                return (
                <View >
                        <DogCard
                            navigation={this.props.navigation}
                            dogList={this.state.dogList}
                            nextScreen={'EditDog'}
                        />
                    <Card style={styles.card}>
                        <TouchableOpacity onPress={ this.handleAddDogPress.bind(this) }>
                            <Text style={styles.addDog}>
                            + Add A Dog
                            </Text>
                        </TouchableOpacity>
                    </Card>
                </View>
                );
            } else {
                return ( 
                    <View >
                        <Card style={styles.card}>
                            <TouchableOpacity onPress={ this.handleAddDogPress.bind(this) }>
                                <Text style={styles.addDog}>
                                + Add A Dog
                                </Text>
                            </TouchableOpacity>
                        </Card>
                    </View>
                );
            }
        } else {
            return <ActivityIndicator />
        }
    }

}

export default Dog;