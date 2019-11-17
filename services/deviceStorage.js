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
          return token
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
        AsyncStorage.clear();
        AsyncStorage.getAllKeys()
        .then((keys) => {
          console.log(keys)
          AsyncStorage.multiRemove(keys)
        });
      }
};

export default deviceStorage;
