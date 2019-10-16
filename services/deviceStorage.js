import { AsyncStorage } from 'react-native';

const deviceStorage = {
  
    async saveItem(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },

    async getJWT() {
        try {
          const token = await AsyncStorage.getItem('id_token');
          if (token !== null) {
            return token;
          } else {
            return false;
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async deleteJWT() {
        try{
          await AsyncStorage.removeItem('id_token');
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
    
};

export default deviceStorage;
