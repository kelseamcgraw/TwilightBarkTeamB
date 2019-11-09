import * as React from 'react';

import { 
    View,
    TouchableOpacity,
    Text,
    Button,
} from 'react-native';

import styles from '../Styles';
import Autocomplete from 'react-native-autocomplete-input';

const dogBreeds = require('../../dogBreeds.json');
class AddDogBreed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breed : "",
            breeds: [],
            query: "",
            token : ""
        }
        
    }

    async componentDidMount() {
        
    }

    async _filterData(query) {
        
        // let queryData = this.state.breeds.filter((e) => {
        //     String(e).includes(query);
        // });

        let filterData = [];
        // // console.log(String(this.state.breeds[0].data));

        dogBreeds.forEach(element => {
            if(String(element.Breed).includes(query)) {
                filterData.push(element.Breed);
            }
        });


        console.log(filterData);
        return filterData;
    }

    
    render() {
        const { query } = this.state;
        const data = this._filterData("");

        return (
            <View style={styles.container}>
                <Autocomplete
                    data={data}
                    defaultValue={query}
                    autoCorrect={false}
                    style={{width:200}}
                    keyExtractor={(item, index) => index.toString()}
                    onChangeText={text => this.setState({ query: text })}
                    renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => this.setState({ query: item })}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                    )}
                />
            </View>
        );
      }

}

export default AddDogBreed;