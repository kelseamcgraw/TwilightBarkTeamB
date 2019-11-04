import * as React from 'react';
import axios from '../../util/Axios';

import deviceStorage from '../../services/deviceStorage';


import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';

class VerifyAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            code : ""
        }
    }

    handleSubmitButton = (event) => {
        const code = "1234";
        var input = this.state.code;
        if (code == input) {
            console.log("CORRECT!");
        } else {
            console.log("INCORRECT!");
        }
    }

    render() {
      const { navigate } = this.props.navigation;
        return (
            <View style= { styles.container}>
                <Text></Text>
                <Text>Enter Verification Code</Text>

                <TextInput
                    id = 'codeInput'
                    autoCapitalize = 'none'
                    onChangeText={(code) => this.setState({ code })}
                    style={ styles.input }
                />
                <Button
                    title={'Submit'}
                    style={styles.input}
                    onPress = {this.handleSubmitButton}
                />
                <Button
                    title={'Resend Code'}
                    style={styles.input}
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

export default VerifyAccount;