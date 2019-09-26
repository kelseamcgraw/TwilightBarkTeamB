import * as React from 'react';

import { 
    Button,
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';

class WelcomScreen extends React.Component {

    handleCreateAccountButtonPress = () => {

        console.log("show create account");

    }

    handleMakeQuickReport = () => {
        // todo show i found or lost a dog options"
        console.log("Quick Report");

    }


    render() {
      const { navigate } = this.props.navigation;
        return (
            <View style= { styles.container}>
                <Button
                title={'Login'}
                style={styles.input}
                onPress = {() => 
                  this.props.navigation.navigate('Login')
                }
                />
                <Button
                title={"I'm new here"}
                style={styles.input}
                onPress={this.handleCreateAccountButtonPress.bind(this)}
                />
                <Button
                title={'Make a report without account'}
                style={styles.input}
                onPress={this.handleMakeQuickReport.bind(this)}
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

export default WelcomScreen;