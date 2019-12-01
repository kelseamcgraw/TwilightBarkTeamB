import * as React from 'react';
import deviceStorage from '../../services/deviceStorage';
import axios from '../../util/Axios';
import styles from '../Styles';
import { 
    View,
    TextInput, 
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator,
    Text,
    Image
} from 'react-native';

class Dog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            token: "",
            colors: [],
            dogList: [],

        }
    }

    async componentDidMount() { 
        this.setState({token: await deviceStorage.getItem("userKey")}); 
        this.setState({dogList: this.props.navigation.getParam('dogList', 'no data')})
        let x = this.state.dogList.colors.split(",");
        this.setState({colors: x})

        this.setState({isLoading: false});
    }

    handleFoundDog = () => {

        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + this.state.token
        };
        const data = {
            isLost: false,
            dogID: this.state.dogList.dogID
        }
        axios.post('/dog/update', data, {
        headers: headers
        })
        .then((res) => {
            this.props.navigation.navigate("Splash", {
                nextScreen: "Feed"
            });
            
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const {dogList, isLoading } = this.state;

        if(!isLoading) {
            return(
                <View style={styles.container}>
                    <Button
                        title={'Found Me'}
                        onPress={this.handleFoundDog.bind(this)}
                    />
                    <Image source={{uri: axios.defaults.baseURL + '/static/images/' + this.state.dogList.fileLocation}}
                            style={{ width: 200, height: 200, marginBottom: 10 }} 
                    />
                    <Text>{this.state.dogList.dogName}</Text>
                    {
                        this.state.colors.map((color, i) => {
                            if(color !== "") {
                                return (
                                <Text key={i}>{color}</Text>
                                )
                            }
                        })
                    }
                    <Text
                        value={this.state.dogList.size}
                        onChangeText={(size) => this.setState({size})}
                    />
                    {/* {
                    this.state.dogList.fk_dogID.map((breed, i) => {
                        return (
                        <Text
                            key={i}
                            value={breed.name}
                        />
                        );
                    })
                    } */}
                    <Text>{this.state.dogList.dogAge.toString()}</Text>
          
                </View>
            );
        } else {
            return <ActivityIndicator />
        }

    }

}

export default Dog;