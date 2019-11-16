import * as React from 'react';
import deviceStorage from '../../services/deviceStorage'; 
import axios from '../../util/Axios';


import { 
    View,
    Text,
    Button,
} from 'react-native';

import styles from '../Styles';
import MultiSelect from 'react-native-multiple-select';
class AddDogBreed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            selectedItems: [],
        }
        
    }

    async componentDidMount() {
        token =  await deviceStorage.getItem("userKey");    
        const headers = {
            'Accept':'application/json',
            'Content-Type':'multipart/form-data',
            'Authorization':'Bearer ' + token
        };
        let res =  await axios.get('/breed/breeds', { headers: headers })
        const data = res.data;
        let filterData = [];
        await data.forEach(element => {
            // must set id to string in order to pass to multiselect
            filterData.push({id: element.breedID.toString(), name: element.name});
        });

        this.setState({data: [...this.state.data, ...filterData]})
        this.setState({isLoading: false})
    }

    handleNextButton = () => {
        let breedString = "";
        this.state.selectedItems.forEach((element) => {
            breedString = breedString + element.toString() + ",";
        })
        this.props.navigation.navigate('AddDogImage',  {
            breeds: breedString,
            dogName: this.props.navigation.getParam("dogName","dogName"),
            dogAge: this.props.navigation.getParam("dogAge", "dogAge"),
            size: this.props.navigation.getParam('size', 'size'),
            colors: this.props.navigation.getParam('colors', 'colors')
        });
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    render() {
        const data = this.state.data
        const { selectedItems } = this.state;
        if(!this.state.isLoading) {
            return (
                    <View style={{ flex: 1, padding: 30 }}>
                        <Text>Choose what breeds you are</Text>
                        <MultiSelect
                            hideTags
                            items={data}
                            uniqueKey="id"
                            hideSubmitButton={true}
                            ref={component => {
                            this.multiSelect = component;
                            }}
                            removeSelected={true}
                            hideTags={false}
                            onAddItem={(item) => this.setState({selectedItems: [...this.state.selectedItems, item]})}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Pick Breed"
                            searchInputPlaceholderText="Search Breeds..."
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            searchInputStyle={{ color: '#CCC' }}
                            />
                        <View>
                            {this.multiselect
                            ? 
                            this.multiselect.getSelectedItemsExt(selectedItems)
                            :
                            null}
                        </View>
                        <Button
                            title={"Next"}
                            onPress={this.handleNextButton}
                        />
                    </View>
            );
        } else {
            return (<View>
                        <Text>Loading Data...</Text>
                    </View>
            );
        }
      }

}

export default AddDogBreed;