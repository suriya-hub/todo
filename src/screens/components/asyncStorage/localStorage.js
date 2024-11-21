import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data to AsyncStorage
export const saveData = async (key, value) => {
    console.log(key, value)
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  // Get data from AsyncStorage
  export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  
  // Remove data from AsyncStorage
  export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully!');
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };
  