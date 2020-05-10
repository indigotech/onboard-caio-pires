import { AsyncStorage } from 'react-native';


export const storeData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(
        key,
        data
      );
    } catch (error) {
      console.log('Error storing token.')
    }
  };

export const retrieveData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
        console.log('Error retrieving token.')
    }
  };