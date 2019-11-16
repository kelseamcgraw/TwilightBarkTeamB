import * as React from 'react';

import { 
    Button,
    View,
} from 'react-native';
import styles from '../Styles.js';

class WelcomScreen extends React.Component {

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
                onPress={() =>
                  this.props.navigation.navigate('CreateAccount')
                }
                />
                <Button
                title={'Make a report without account'}
                style={styles.input}
                onPress={() =>
                  this.props.navigation.navigate("QuickReport")
                }
                />
            </View>
        );
    }

}

export default WelcomScreen;