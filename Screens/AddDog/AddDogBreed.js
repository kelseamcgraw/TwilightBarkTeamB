import * as React from 'react';

import { 
    View,
    TouchableOpacity,
    Text,
    Button,
} from 'react-native';

import styles from '../Styles';
import Autocomplete from '../../Components/Autocomplete/index';

const dogBreeds = require('../../dogBreeds.json');
class AddDogBreed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breeds: [],
            query: "",
            hideSearch: true,
            token : ""
        }
        
    }

    async componentDidMount() {
        
    }

    _filterData(query) {
        
        let filterData = [];

        dogBreeds.forEach(element => {
            if(String(element.Breed).includes(query)) {
                filterData.push(element.Breed);
            }
        });
        var result = Object.keys(filterData).map((key) => {
            return [filterData[key]];
          });
        return result;
    }

    handleAddToBreeds = (item) => {
        if(this.state.breeds.length < 3) {
            this.setState({breeds: [...this.state.breeds, item]})
        }
    }

    handleNextButton = () => {
        this.props.navigation.navigate('AddDogImage',  {
            breeds: this.state.breeds
        });
    }

    render() {
        const { query } = this.state;
        const data = this._filterData(query);

        return (
            <View style={styles.container}>
                <Text>{
                    this.state.breeds.map((b, i) => {
                        b
                    })
                    }</Text>
                <Autocomplete
                    data={data}
                    defaultValue={query}
                    autoCorrect={false}
                    hideResults={this.state.hideSearch}
                    style={{width:200}}
                    keyExtractor={(item, index) => index.toString()}
                    onChangeText={text => {
                        this.setState({ query: text });
                        this.setState({hideSearch: false})
                    }}
                    renderItem={({ item, i }) => (
                    <TouchableOpacity onPress={() => {
                        this.setState({ query: item[0] }); 
                        this.setState({hideSearch: true});
                        this.handleAddToBreeds(item[0]);
                    }}>
                        <Text>{item[0]}</Text>
                    </TouchableOpacity>
                    )}
                />
                <Button
                    title={"Next"}
                    onPress={this.handleNextButton}
                />
            </View>
        );
      }

}

export default AddDogBreed;