import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    input: {
      width: 250,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
    smallImage: {
      width: 100,
      height: 100,
      backgroundColor: 'transparent'
    },
    mediumImage: {
      width: 150,
      height: 150,
      backgroundColor: '#00000000'    
    },
    largeImage: {
      width: 200,
      height: 200,
      backgroundColor: 'transparent'
    },
    imageContainer: {
      width: 400,
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'transparent'
    }
  });

  export default styles;