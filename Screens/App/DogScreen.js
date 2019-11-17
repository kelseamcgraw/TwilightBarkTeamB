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
            this.setState({dataList: this.props.navigation.getParam("dataList", "no data")});
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
        console.log(this.state.dataList)
        // this.props.navigation.navigate('EditDog', {
        //      dogId: this.state.dogList[i].dogID,
        //     colors: this.state.dogList[i].colors,
        //     alerts: this.state.dogList[i].alerts,
        //     breeds: this.state.dogList[i].fk_dogID,
        //     dogAge: this.state.dogList[i].dogAge.toString(),
        //     fileLocation: this.state.dogList[i].fileLocation,
        //     size: this.state.dogList[i].size,
        //     dogName: this.state.dogList[i].dogName,

        // });
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
                    onPress={ this.handleCardPress.bind(this, i) }
                    >
                        <Card 
                         style={styles.card}
                        >
                            <ListItem
                            style={styles.listItems}
                            leftAvatar={{
                                title: d.dogName,
                                size: "large",
                                source: { uri: axios.defaults.baseURL + '/static/images/' + d.fileLocation },
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
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#e4e4e4',
        marginLeft: 10,
      },
      leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 1,
      },
      rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        // flex: 1,
        alignItems: 'flex-end',
      }
  });

export default Dog;