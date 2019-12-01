import * as React from 'react';

import axios from '../util/Axios';
import deviceStorage from '../services/deviceStorage';

import { 
    View,
    TouchableOpacity, 
    StyleSheet,
    Text, 
    ActivityIndicator
} from 'react-native';

import { Card, ListItem, Avatar, Button } from 'react-native-elements';
const urlPath = 'http://127.0.0.1:3000/static/images/';
class DogCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dogList: []
        }
    }

    async componentDidMount() { 

        this.setState({dogList: this.props.dogList});
    }

    handleCardPress = (i, e) => {
        this.props.navigation.navigate(this.props.nextScreen, {
             dogList: this.state.dogList[i]

        });
    }

    render() {
        const { dogList, isLoading } = this.state;
                return (
                <View style={styles.container}>
                    {
                    dogList.map((d, i) => {

                        return (
                        <TouchableOpacity
                            key={i}
                            onPress={this.handleCardPress.bind(this, i)}
                        >
                            <Card 
                                key={i}
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
                </View>
                );
            
    }

}

const styles = StyleSheet.create({

    addDog: {
        fontSize: 20,
        color: "#007AFF"
    }, 

  });

export default DogCard;