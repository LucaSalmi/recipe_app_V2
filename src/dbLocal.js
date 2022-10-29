import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../utils/Constants';

const CrudLocal = {

    performAutoLogin: async () => {

        let result = null;

        try {
            const uid = await AsyncStorage.getItem(Constants.UID_ASYNC_STORAGE)
            const username = await AsyncStorage.getItem(Constants.USERNAME_ASYNC_STORAGE)
            const password = await AsyncStorage.getItem(Constants.PASSWORD_ASYNC_STORAGE)
            if(uid !== null && username !== null && password !== null) {
                if(uid !== "" && username !== "" && password !== "") {
                    console.log("AsyncStorage found: " + uid + ": " + username + " / " + password);
                    result = {uid: uid, username: username, password: password};
                }
            }
            else {
                console.log("No username or password found in AsyncStorage.");
            }
        } catch(e) {
            console.log("Error: Could not read from AsyncStorage.");
        }

        return result;

      },

      setAutoLogin: async (uid, username, password) => {

        try {
            await AsyncStorage.setItem(Constants.UID_ASYNC_STORAGE, uid);
            await AsyncStorage.setItem(Constants.USERNAME_ASYNC_STORAGE, username);
            await AsyncStorage.setItem(Constants.PASSWORD_ASYNC_STORAGE, password);
            console.log("Auto-Login stored in AsyncStorage");
          } catch (e) {
            console.log("Error: Could not save auto-login to AsyncStorage");
          }

      },

      disableAutoLogin: async () => {

        try {
            await AsyncStorage.setItem(Constants.UID_ASYNC_STORAGE, "");
            await AsyncStorage.setItem(Constants.USERNAME_ASYNC_STORAGE, "");
            await AsyncStorage.setItem(Constants.PASSWORD_ASYNC_STORAGE, "");
            console.log("Auto-Login disabled (AsyncStorage)");
          } catch (e) {
            console.log("Error: Could not disable auto-login (AsyncStorage)");
          }

      },

};

export default CrudLocal;