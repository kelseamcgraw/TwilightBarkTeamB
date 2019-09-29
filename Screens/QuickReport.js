import * as React from 'react';


import { 
    Button,
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';

class QuickReport extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breed: "",
            color: "",
            size: "",
            gender: ""
        }
    }

    handleQuickReportButtonPress = () => {
        console.log("Quick Report made");
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.breed}
                    onChangeText={(breed) => this.setState({ breed })}
                    placeholder={ "Breed" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.color}
                    onChangeText={(color) => this.setState({ color })}
                    placeholder={ "Color" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.size}
                    onChangeText={(size) => this.setState({ size })}
                    placeholder={ "Size" }
                    style={ styles.input }
                />
                <TextInput
                    value={this.state.gender}
                    onChangeText={(gender) => this.setState({ gender })}
                    placeholder={ "Gender" }
                    style={ styles.input }
                />
                <Button
                    title={ "Report" }
                    style={ styles.input }
                    onPress={ this.handleQuickReportButtonPress.bind(this) }
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

export default QuickReport;