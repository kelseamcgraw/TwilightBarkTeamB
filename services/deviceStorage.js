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
          return await AsyncStorage.getItem(key);
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
      },
      
      async removeAllKeys() {
        AsyncStorage.getAllKeys()
        .then((keys) => {
          try {
            AsyncStorage.multiRemove(keys);
          }catch (e) {
            console.log(e);
          }
        })
      }
  }


export default deviceStorage;
