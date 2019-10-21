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
    ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

import { Card, ListItem, Avatar, Button } from 'react-native-elements';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            uri : "",
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

    renderItem(data) {
            return (
                <View style={styles.dataView}>
                    <Image
                    source={ require('../dogo.jpeg') }
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                    /><Text style={styles.text}>
                        {data.item.dogName} 
                        {data.item.dogAge} 
                        {data.item.size} 
                        {data.item.breed}
                        </Text>
                </View>
            );
    }


    render() {
        const { dogList, isLoading } = this.state;

        if(!isLoading){
            if(dogList.length > 0) {
                return (
                    <View style={styles.cardContainer}>
                        <Card style={styles.card} >
                        {
                        dogList.map((d, i) => {
                            return (
                            <ListItem
                                key={i}
                                style={styles.listItems}
                                roundAvatar
                                title={d.dogName}
                                avatar={{uri: require('../dogo.jpeg')}}
                            />
                            );
                        })
                        }
                    </Card>
                    <Card style={styles.card}>
                        <Icon
                            style={styles.inputs}
                            name="md-add"
                            color="#007AFF"
                            size={25}
                            onPress={ this.props.action}
                        ><Text>
                            Add A Dog
                        </Text></Icon>
                    </Card>
                  </View>
                );
            } else {
                return ( 
                    <View style={styles.container}>
                        <Card style={styles.card}>
                        <Icon
                            name="md-add"
                            color="#007AFF"
                            size={25}
                            onPress={ this.props.action}
                        ><Text>
                            Add A Dog
                        </Text></Icon>
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
    container: {
      backgroundColor: '#ecf0f1',
    },  
    cardContainer: {
        alignItems: 'center'
    },
    card: {
        flex: 1,
        padding: 0, 
        maxHeight: 100,
        alignItems: 'center'
    },
    image: {
        width: 100, 
        height: 100
    },
    text: {
        width: 250,
        height: 44,
        padding: 10,
      },
    listItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        
    },
  });

export default Dog;