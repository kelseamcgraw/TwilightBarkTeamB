import * as React from 'react';


import { 
    Button,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

class CreateAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            color: "",
            size: "",
            gender: "",
            address: ""
        }
    }

    handleCreateAccountButton = () => {
        console.log("account Createds");
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    placeholder={ "Name" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.color}
                    onChangeText={(color) => this.setState({ color })}
                    placeholder={ "color" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.size}
                    onChangeText={(size) => this.setState({ size })}
                    placeholder={ "size" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.gender}
                    onChangeText={(gender) => this.setState({ gender })}
                    placeholder={ "gender" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.address}
                    onChangeText={(address) => this.setState({ address })}
                    placeholder={ "Dogs Address" }
                    style={ styles.input }
                />
                <Button
                    title={ 'Create Account' }
                    style={ styles.input }
                    onPress={this.handleCreateAccountButton.bind(this)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });

export default CreateAccount;