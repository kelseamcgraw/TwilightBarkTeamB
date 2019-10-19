import { AsyncStorage } from 'react-native';

const deviceStorage = {
  
    async saveItem(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },

    async getItem(key) {
        try {
          const token = await AsyncStorage.getItem(key);
          if (token !== null) {
            return token;
          } else {
            return false;
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async deleteItem(key) {
        try{
          await AsyncStorage.removeItem(key);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
    
};

export default deviceStorage;
