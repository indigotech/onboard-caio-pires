import {AsyncStorage} from 'react-native';

export async function storeData(key: string, data: any) {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log('Store Item problem');
    console.log(error);
  }
}

export async function retrieveData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error retrieving token.');
    console.log(error);
  }
}
