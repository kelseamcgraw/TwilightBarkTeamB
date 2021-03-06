import * as React from 'react';

import { 
    Button,
    Image,
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nextScreen: this.props.navigation.getParam("nextScreen", "default value")
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if(this.state.nextScreen === "default value") {
                this.state.nextScreen = "AuthLoading";
            }
            const { navigate } = this.props.navigation;
            this.props.navigation.navigate(this.state.nextScreen);
        }, 1 * 1000    
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image
                style={styles.images}
                source = { require('../images/St_Guinefort.jpg')}/>
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
    images: {
        width: 200,
        height: 400
    }
  });

export default SplashScreen;