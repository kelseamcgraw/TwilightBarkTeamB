import * as React from 'react';

import axios from '../util/Axios';
import deviceStorage from '../services/deviceStorage';

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

    handleCardPress = () => {
        const { navigate } = this.props.navigation;
        this.props.navigation.navigate('EditDog');
    }

    render() {
        const { dogList, isLoading } = this.state;

        if(!isLoading){
            if(dogList.length > 0) {
                return (
                <View style={styles.container}>
                    {
                    dogList.map((d, i) => {
                        return (
                    <TouchableOpacity
                    key={i}
                    onPress={ this.handleCardPress.bind(this)} 
                    >
                        <Card 
                         style={styles.card}
                        >
                            <ListItem
                            style={styles.listItems}
                            leftAvatar={{
                                title: d.dogName,
                                size: "medium",
                                source: require('../images/dogo.jpeg'),
                                showEditButton: false
                            }}
                            title={d.dogName}
                            subtitle={d.dogAge + ""}
                            chevron
                            />
                        </Card>
                    </TouchableOpacity>
                        );
                    })
                    }
                    <Card style={styles.card}>
                        <TouchableOpacity onPress={ this.props.action }>
                            <Text style={styles.addDog}>
                            + Add A Dog
                            </Text>
                        </TouchableOpacity>
                    </Card>
                </View>
                );
            } else {
                return ( 
                    <View style={styles.container}>
                        <Card style={styles.card}>
                            <TouchableOpacity onPress={ this.props.action }>
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

const styles = StyleSheet.create({

    addDog: {
        fontSize: 20,
        color: "#007AFF"
    }, 

  });

export default Dog;